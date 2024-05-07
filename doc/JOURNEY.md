# REST API to perform WZT business logic

```js
npm install -g @nestjs/cli
nest --help
```

```js
nest g module users
nest g service users
nest g controller users
# or
nest g resource users
# Rest Api, yes, ...
```

**Can be quickly complex!**
/wzt/users/artists -> ALL artists
/wzt/users/artists/:id -> artist of id :id
/wzt/users/broadcasters
/wzt/users/partners
/wzt/users/providers
/wzt/users/publics

OR
**-->**
/wzt/artists -> ALL artists
/wzt/artists/:id -> artist of id :id
/wzt/broadcasters
/wzt/partners
/wzt/providers
/wzt/publics
...

## To remove unauthorized field from the incoming data

```js
app.useGlobalPipes(
    new ValidationPipe({
        whitelist: true,
        // forbidNonWhitelisted: true // to stop the request from processing in such case
    }),
    );
```

```js
POST
{
  "name": "Pierre Dupont",
  "stageName": "Pierro",
  "email": "pierro@gmail.com",
  "profile": "PARTNER",
  "city": "Lens"
}
WILL RETURN (no expected field 'city')
{
  "name": "Pierre Dupont",
  "stageName": "Pierro",
  "email": "pierro@gmail.com",
  "profile": "PARTNER"
}
```

## [Guards](https://docs.nestjs.com/guards)

Guards have a single responsibility. They determine whether a given request will be handled by the route handler or not, depending on certain conditions (like permissions, roles, ACLs, etc.) present at run-time.

**Use cases**: authorization, authentification

***They***

- could be
  - controller-scoped, method-scoped (`@UseGuards()`)
  - or global-scoped (`useGlobalGuards()`, `useClass`)
- are executed after all middleware, but before any interceptor or pipe.

**Why not middlewares instead**: For authentification, they are fine choice, since things like token validation and attaching properties to the request object are not strongly connected with a particular route context (and its metadata). But middlewares doesn't know which handler will be executed after calling the `next()` function. On the other hand, Guards have access to the `ExecutionContext` instance, and thus know exactly what's going to be executed next.

**To take advantage of the most important guard feature, the execution context (in order to determine what is allowed or not)**, we'll attach custom metadata to route handlers through either decorators created via Reflector#createDecorator static method, or the built-in @SetMetadata() decorator.

  ```ts
  import { Reflector } from '@nestjs/core';
  export const Roles = Reflector.createDecorator<string[]>();
  ```

  ```ts
  @Post()
  @Roles(['admin'])
  async create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }
  ```

quickstart: `nest g guard guard_name`

## Exceptions filters

***To process all unhandled exceptions accross the app.***

- The built-in global exception filter handles exceptions of type **HttpException** (and subclasses of it, and partially supports the http-errors). So when an exception is caught (not of that last one type), we'll get a default JSON response:

  ```json
  {
    "statusCode": 500,
    "message": "Internal server error"
  }
  ```

- Any thrown exception containing the statusCode and message properties will be properly populated and sent back as a response (instead of the default InternalServerErrorException for unrecognized exceptions):

  ```js
  @Get()
  async findAll() {
    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
  }
  ```

  Apart these two arguments (response message, response status code), there is a third constructor argument (optional and not serialized in the response but could be useful, for logging purposes, to provide valuable information about the inner error that caused the HttpException to be thrown):

  ```js
  @Get()
  async findAll() {
    try {
      await this.service.findAll()
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: 'This is a custom message',
      }, HttpStatus.FORBIDDEN, {
        cause: error
      });
    }
  }
  ```

- [Built in Exception](https://docs.nestjs.com/exception-filters#built-in-http-exceptions)

  ```js
  throw new BadRequestException('Something bad happened', { cause: new Error(), description: 'Some error description' })
  // -->
  {
    "message": "Something bad happened",
    "error": "Some error description",
    "statusCode": 400,
  }
  ```

- Custom exceptions
  When we have to create custom exceptions (not frequent), we could make them inherit from the base ***HttpException*** class. With this approach, Nest will recognize your exceptions, and automatically take care of the error responses:

  ```js
  export class ForbiddenException extends HttpException {
    constructor() {
      super('Forbidden', HttpStatus.FORBIDDEN);
    }
  }
  ```
  
  and, when needed, ex.:

  ```js
  @Get()
  async findAll() {
    throw new ForbiddenException();
  }
  ```

- [A proper way to achieve things](../src/http-exception.filter.ts)
  - Test by yourself: GET localhost:3000/wzt/artists/bad
  - That way, expect that, recognized exceptions will be thrown ([built-in exceptions](https://docs.nestjs.com/exception-filters#exception-filters-1) or customs exceptions which inherit from ***HttpException*** class)
  - Prefer applying filters by using classes (`@UseFilters(HttpExceptionFilter)`) instead of instances ( `@UseFilters(new HttpExceptionFilter()`) when possible. It reduces memory usage since Nest can easily reuse instances of the same class across your entire module.
  - The **useGlobalFilters() method** could be used to set up global-scoped filter (which not work for gateways or hybrid applications)
  - An alternative to that ***custom provider registration*** issue is **useClass method**

    ```js
    // app.module.ts
    import { Module } from '@nestjs/common';
    import { APP_FILTER } from '@nestjs/core';

    @Module({
      providers: [
        {
          provide: APP_FILTER,
          useClass: HttpExceptionFilter,
        },
      ],
    })
    export class AppModule {}
    ```

    The module to choose (here app one), should be the one in which the filter (HttpExceptionFilter in the example above) is defined.
  
  - We could also use [**dependency injection**](https://docs.nestjs.com/fundamentals/custom-providers) (Have to test!).

- [Catch everything](https://docs.nestjs.com/exception-filters#catch-everything)

  ***Use Cases***: full control over the exceptions layer, add logging or use a different JSON schema based on some dynamic factors, control the exact flow of control and the content of the response sent back to the client.

  To catch everything, we omit the target exception in `@Catch() decorator`.

  - While catching everything, **useClass method** is the one to preconize ([Learn More About it](https://docs.nestjs.com/exception-filters#binding-filters)).

- Nest Request / Response Pipeline
  - <https://github.com/mguay22/nestjs-request-response-pipeline>
  - <https://stackoverflow.com/questions/54863655/whats-the-difference-between-interceptor-vs-middleware-vs-filter-in-nest-js>
  ![Nest Request / Response Pipeline](request_response_pipeline.jpg)

- [Logger](https://docs.nestjs.com/techniques/logger)
  A filter exception could be use to add custom logger (which can be use in security, performance or debugging purposes...).

  When it's the case, we'll have to configure Nest as follow:

  ```ts
  const app = await NestFactory.create(AppModule, {
  bufferLogs: true,
  });
  app.useLogger(app.get(MyLogger));
  await app.listen(3000);
  ```

  ex.: We want to track all incoming requests of GET type

  ```ts
  // ...
  private readonly logger = new MyLoggerService(EmployeesController.name);
  @Get()
  findAll(@Ip() ip:string, @Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    this.logger.log(`Request for ALL Employees\t${ip}`, EmployeesController.name);
    return this.employeesService.findAll(role);
  }
  ```

- Auth using JWT

  ```bash
  nest g module auth
  nest g controller auth
  nest g service auth

  nest g module users
  nest g service users

  npm install --save @nestjs/jwt
  ```

  ```http
  POST localhost:3000/wzt/auth/login
  BODY 
  {
    "username": "maria",
    "password": "guess"
  }
  -->
  {
  "access_token": "..."
  }
  ```

  ```http
  GET localhost:3000/wzt/auth/profile
  Auth Bearer access_token_value
  -->
  {
    "sub": 2,
    "username": "maria",
    "iat": 1715079651,
    "exp": 1715079711
  }
  ```

  - <https://docs.nestjs.com/security/authentication>
  - <https://github.com/nestjs/nest/tree/master/sample/19-auth-jwt/src>
  - <https://jwt.io/>
  - <https://docs.nestjs.com/recipes/passport>

### TODO

- Set global-scoped auth; update...;
- [Prisma, Sqlite](https://docs.nestjs.com/recipes/prisma)
  - <https://www.prisma.io/docs/orm/prisma-schema/data-model/models>
  - <https://github.com/prisma/prisma-examples/tree/latest/typescript/rest-express>
  - <https://github.com/prisma/prisma-examples/tree/latest/typescript/rest-nestjs>
- [Testing](https://docs.nestjs.com/fundamentals/testing)

- Middleware
- Interceptors
- <https://docs.nestjs.com/recipes/swc>
- <https://github.com/trab-ml/nestjs>
- <https://docs.nestjs.com/>
