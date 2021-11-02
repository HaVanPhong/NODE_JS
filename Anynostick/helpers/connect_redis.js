const redis= require('redis');
const client = redis.createClient({
  port: 6379, 
  host: '127.0.0.1', 
})
client.ping(()=>{
  console.log("pong");
})

client.on('error',(error)=>{
  console.log(error);
})
client.on('connect',(error)=>{
  console.log('connected');
})

client.on('ready',(error)=>{
  console.log('redis to ready');
})


module.exports= client;