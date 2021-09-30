# LẦN ĐẦU TIÊN LÀM CHUYỆN ẤY, ĐÓ LÀ CHUYỆN VIẾT FILE README
![Học chán quá thì ngắm zai đẹp nè :))](https://scontent.fhan3-2.fna.fbcdn.net/v/t1.6435-9/101223023_955830404837000_3592113876742701056_n.jpg?_nc_cat=107&ccb=1-5&_nc_sid=0debeb&_nc_ohc=G_zpf-WtBREAX_nFt-B&tn=K2VGfhEAzNpYm1eg&_nc_ht=scontent.fhan3-2.fna&oh=7928da646f0eb26278c6c10b324d4a4e&oe=617A0F06)

## TÀI LIỆU HƯỚNG DẪN
[link video](https://youtu.be/J0qp9rTSQOk)

## VIẾT THÊM CHO OAI THÔI CHỨ CÓ GÌ ĐÂU
> note cho oai chứ chả có gì mà note
> oai 2

## CODE CONFIG
### REQUIRE
```
const redis = require("redis");
const redisClient = redis.createClient();
const redisStore = require("connect-redis")(session);
```
### MIDDLEWARE SESSION
```js
app.use(
  session({
    secret: "secret session",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      maxAge: 115000, // hạn của session id được lưu trong cookie
    },
    store: new redisStore({
      host: "localhost",
      port: 6379,
      client: redisClient,
      ttl: 8640,
    }),
  })
);
```
### MUỐN LẤY RA SESSION THÌ: 
```js
req.session.(tên attribute)
```
