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

## To remove unauthorized field from the incoming data

```js
app.useGlobalPipes(
    new ValidationPipe({
        whitelist: true,
        // forbidNonWhitelisted: true, to stop the request from processing in such case
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

### TODO

- Operations authorized (Exceptions Filter)
- Auth (jwt...)
- Prisma ORM instead of DTO
- Prisma and Neon serverless database
- Logs

<https://docs.nestjs.com/>
<https://github.com/trab-ml/nestjs>
