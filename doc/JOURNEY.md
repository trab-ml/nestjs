# REST API to perform WZT business logic

```js
nest g module users
nest g service users
nest g controller users
# or
nest g resource users
# Rest Api, yes, ...
```

/wzt/users/artists -> ALL artists
/wzt/users/artists/:id -> artist of id :id
/wzt/users/broadcasters
/wzt/users/partners
/wzt/users/providers
/wzt/users/publics
OR
/wzt/artists -> ALL artists
/wzt/artists/:id -> artist of id :id
/wzt/broadcasters
/wzt/partners
/wzt/providers
/wzt/publics
...

<https://docs.nestjs.com/>
<https://github.com/trab-ml/nestjs>
