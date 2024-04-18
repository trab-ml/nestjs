# REST API to perform WZT business logic

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

TODO

- Use DTO and Pipes for incoming data validation and verification
- Better control over exceptions, error handling, operations authorized, number of requests
- Prisma ORM instead of DTO
- Prisma and Neon serverless database
- Logs
- Auth (jwt...)

<https://docs.nestjs.com/>
<https://github.com/trab-ml/nestjs>
