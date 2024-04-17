# NestJS

- Able to work with any Node HTTP framework (out of the box: Express (by default), Fastify...)
- Contrary to express, nest is opinionated
- Well-structured architecture
- Preconfigured with [Jest](https://jestjs.io/fr/) for testing;
- Respectively eslint and prettier as linter and formatter
- Fundamental building block:
  - Controller: handling http requests and return back responses to the client;
- Provider is a class that contains shared logic throughout the entire app and can be injected as a dependency (by implementing a guard, a pipe...) where needed
- Any class with @Injectable decorator can be injected to a constructor
- @Module to organize in small chunck that could be lazy loaded to run faster in serverless environment.

## [By Fireship](https://www.youtube.com/watch?v=0M8AYU_hPas)

```bash
# nest require a Node.js binary built with internationalization support
node -p process.versions.icu
# undefined -> not authorized by nest

npm i -g @nestjs/cli # or each time `npx @nestjs/cli@latest`
nest new project-name

# for a typescript project
nest new project-name --strict 

npm test # to run jest units test

npm start # --> nest start
npm start:dev # --> nest start --watch

# to generate a dog controller
nest g controller dog

nest --help
nest cmd --help
```

```js
@Controller()
export class CatController() {
    // By default create a http witch lead to the root url <https://example.com>
    @Get() // @Post()...
    getCat() {}

    // We could change the route
    @Get('cat')
    getCat() {}
    
    // Make it dynamic
    @Get('cat/:id') // to get smg like <https://example.com/cat/24>
    getCat() {}

    // Request parameters or body
    @Get()
    getCat(@Body() body, @Param('id') id) {
        return 'OK 👌';
    }

    // others decorators: @Header, @HttpCode...
}
```

## [By NestJS](https://docs.nestjs.com/)

- Controllers
  - Controllers are responsible for handling incoming requests and returning responses to the client.
- Providers
  - The main idea of a provider is that it can be injected as a dependency; this means objects can create various relationships with each other, and the function of "wiring up" these objects can largely be delegated to the Nest runtime system.
- Modules
  - A module is a class annotated with a @Module() decorator. The @Module() decorator provides metadata that Nest makes use of to organize the application structure.
- Middleware
  - Middleware is a function which is called before the route handler. Middleware functions have access to the request and response objects, and the next() middleware function in the application’s request-response cycle. The next middleware function is commonly denoted by a variable named next.
  - Client Side --http request--> Middleware --> Route Handler (@RequestMapping)...
- Exception filters
  - Nest comes with a built-in exceptions layer which is responsible for processing all unhandled exceptions across an application. When an exception is not handled by your application code, it is caught by this layer, which then automatically sends an appropriate user-friendly response.
- Pipes
  - A pipe is a class annotated with the @Injectable() decorator, which implements the PipeTransform interface.
- CORS
  - Cross-origin resource sharing (CORS) is a mechanism that allows resources to be requested from another domain. Under the hood, Nest makes use of the Express cors or Fastify @fastify/cors packages depending on the underlying platform. These packages provide various options that you can customize based on your requirements.
  - To enable CORS

    ```js
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    await app.listen(3000);
    ```

  - [What happens without CORS?](https://node-cors-client.netlify.app/)
    - [Client](https://github.com/troygoode/node-cors-client)
    - [Server](https://github.com/troygoode/node-cors-server)
  - <https://github.com/expressjs/cors?tab=readme-ov-file#configuration-options>
- [Rate Limit](https://docs.nestjs.com/security/rate-limiting)
  - A common technique to protect applications from brute-force attacks is rate-limiting. To get started, you'll need to install the @nestjs/throttler package.
  - `npm i @nestjs/throttler`
  - And then (for a maximal of 3 requests in 60000 ms (1 mn) request)

  ```js
  // app.module.ts
  @Module({
  imports: [
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 3,
    }]),
  ],
  })
  export class AppModule {}
  ```

- [Logger](https://docs.nestjs.com/techniques/logger)
  - Nest comes with a built-in text-based logger which is used during application bootstrapping and several other circumstances such as displaying caught exceptions (i.e., system logging).
  - To use globally a customized logger 'MyLoggerService'

    ```js
    import { NestFactory } from '@nestjs/core';
    import { AppModule } from './app.module';
    import { MyLoggerService } from './my-logger/my-logger.service';

    async function bootstrap() {
      const app = await NestFactory.create(AppModule, {
        bufferLogs: true,
      });
      app.useLogger(app.get(MyLoggerService));
      app.enableCors();
      app.setGlobalPrefix('thebox');
      await app.listen(3000);
    }
    bootstrap();
    ```

## [By Dave Gray](https://www.youtube.com/watch?v=juNVinepwKA&list=PL0Zuz27SZ-6MexSAh5x1R3rU6Mg2zYBVr&index=2)

- nest g module users
- nest g controller users
- nest g service users
- Controllers
  - Routes Order Matters!
    Assume we have two similar get requests (dynamic and static), the dynamic one should go after the static.
  - Parameters are given througth the url of the request, body througth the body.
  - Query parameters are like this:  `/users?role=value&age=22` they are different of url parameters (`/users/2`...)
- Providers...
  - For providing services...
  - Dependency Injection consists to inject the needed service in the controller, in order to serve the client (ex.:constructor(private clientsService: ClientsService) {}
).
- DTO Schemas, validation & pipes
  - DTO (Data Transfer Object defines how he data will be sent over the network (defines its format throught static (strong) typing))
  - We could determine the DTO schema using TypeScript interfaces or simple classes (recommended)
  - Pipes used for transformation (ex.: from a numeric string to a number) and validation...
    - To not allow requests made up of unexpected format
    - To make the needed transformation / conversion to make the sended data compatible
    - To return appropriate error message when meeted unexpected data
      - Such requests will fail
        - GET localhost:3000/clients/a (numeric string instead of pure string)...
  
  - After create DTO for sended data, we still havent't use them until we use them in our controller to explicitly say validate this against that DTO, get the appropriate error message... ; ex (validate the given param createClientDto by using ValidationPipe with CreateClientDto):

  ```js
  @Post()
  create(@Body(ValidationPipe) createClientDto: CreateClientDto) {
    return this.clientsService.create(createClientDto);
  }
  ```

  - [Several pipes](https://docs.nestjs.com/techniques/validation) available to validate the correctness (is this an email?...) of any data sent into our web app.
  - Others dependencies needed for validation `npm i class-validator class-transformer`
  - By default, we don't have partial types installed, so `npm i @nestjs/mapped-types -D`
  - ... To preconize error detection, reusability, clarity, maintenability ...
  - Error handling is not about the correcteness or the syntax of the incoming requests data (at this point that has been already checked). It's more about the bottom of things, precisely to avoid such issues:
  
  ```js
  GET localhost:3000/clients/1000 // -> Status: 200 OK
  GET localhost:3000/clients?role=MANAGER // -> Status: 200 OK, []
  ```

  given that we have any client with id=1000, either role=MANAGER. To fix that kind of issues we can use [built-in http exceptions](https://docs.nestjs.com/exception-filters#built-in-http-exceptions)
- Prisma ORM, Neon Postgres Serverless Postgres.
  - To add prisma dependencie to your project `npm i prisma -D` and then `npx prisma init`
  - Quickstart with Prisma (a database toolkit and ORM for TypeScript and Node.js to simplify database access...) and Neon (A Postgres serverless)
    - [Neon](https://neon.tech/docs/guides/prisma-migrations)
    - [Prisma By Fireship](https://www.youtube.com/watch?v=rLRIB6AF2Dg)
    - [Prisma](https://www.prisma.io/docs/getting-started/quickstart)
  - Run a Prisma migration `npx prisma migrate dev --name init` (`init` when it's about the first one)
    - Instead of `dev` and depending on what you're doing, we also have:
      - push (it won't save the sql for you to reference later)
      - deploy (when you're working on a local database first and then want to send thoses changes online later)
  
  ```bash
  # .env
  DATABASE_URL=NEON_DATABASE_CONNECTION_STRING # findable on Neon database / Connection details
  ```

  ```bash
  npm i prisma -D
  npx prisma init
  npx prisma migrate dev --name init

  # To run foreach changes in the model
  # npx prisma generate 
  # npx prisma migrate dev --name name_change 
  ```

  - Very quick way to create APIs ```nest g resource employees```
    - We can remove files we don't need (ex.: when we want to use Prisma models instead of typeScript DTOs and entities...)
- [REST API with CORS, Rate limits, Server logs, Exceptions filters...](#by-nestjs)

## Hands on it

- **TODO**
  - <https://docs.nestjs.com/recipes/prisma>
  - <https://docs.nestjs.com/security/authentication>
  
  - <https://jwt.io/>
  - Microservices
    - <https://www.youtube.com/watch?v=lL_j7ilk7rc&t=2s>
    - <https://www.youtube.com/watch?v=lTAcCNbJ7KE>
  - [Next-Auth Login Authentication](https://www.youtube.com/watch?v=w2h54xz6Ndw)
