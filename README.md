# NestJS

- Able to work with any Node HTTP framework (out of the box: Express (by default), Fastify)
- Contrary to express, nest is opinionated
- Well-structured architecture
- Preconfigured with [Jest](https://jestjs.io/fr/) for testing;
- Respectively eslint and prettier as linter and formatter
- Fundamental building block:
  - Controller: handling http requests and return back responses to the client;
- Provider is a class that contains shared logic throughout the entire app and can be injected as a dependency (by implementing a guard, a pipe...) where needed
- Any class with @Injectable decorator can be injected to a constructor
- @Module to organize in small chunck that could be lazy loaded to run faster in serverless environment.

## [By NestJS](https://docs.nestjs.com/)

- Controllers
  - Controllers are responsible for handling incoming requests and returning responses to the client.
- Providers
  - The main idea of a provider is that it can be injected as a dependency; this means objects can create various relationships with each other, and the function of "wiring up" these objects can largely be delegated to the Nest runtime system.

- **TODO**
  - Providers

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
  - Dependency Injection consists to inject the needed service in the controller, in order to serve the client.

- **TODO**
  - Providers
  - Schemas, validation & pipes
  - Prisma ORM, Neon Postgres
  - REST API with CORS, Rate limits, Server logs, Exceptions filters

## Hands on it

- **TODO**
  - <https://docs.nestjs.com/recipes/prisma>
  - <https://docs.nestjs.com/security/authentication>

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

    // others decorators
    @Header, @HttpCode
}
```

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

- by Fireship <https://www.youtube.com/watch?v=0M8AYU_hPas>
<https://docs.nestjs.com/>
