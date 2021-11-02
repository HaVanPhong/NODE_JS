const mongoose= require('mongoose');

function newConnection (uri){
  const conn= mongoose.createConnection(uri, { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  conn.on('connected', function(){
    console.log("MongoDB::: connected:::", this.name);
  })
  conn.on('disconnected', function(){
    console.log("MongoDB::: disconnected:::", this.name);
  })
  conn.on('error', function(){
    console.log(`MongoDB::: connection ${this.name} ${JSON.stringify(error)}`);
  })
  return conn;
}

const testConnection= newConnection('....');
const userConnection= newConnection('....');

module.exports ={ 
  testConnection, userConnection
}