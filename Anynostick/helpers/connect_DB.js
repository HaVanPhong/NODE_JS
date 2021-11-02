// const mongoose = require('mongoose')
// const conn= mongoose.createConnection('mongodb://localhost:27017/Demo', { 
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useFindAndModify: false,
//   useCreateIndex: true,
// })
// conn.on('connected', function(){
//   console.log("MongoDB::: connected:::", this.name);
// })
// conn.on('disconnected', function(){
//   console.log("MongoDB::: disconnected:::", this.name);
// })
// conn.on('error', function(error){
//   console.log(`MongoDB::: connection ${this.name} ${JSON.stringify(error)}`);
// })

// process.on('SIGINT', async ()=>{
//   await conn.close();
//   process.exit(0);
// })


// module.exports = conn;

const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect('mongodb://localhost:27017/Demo', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (e) {
    console.log(e);
  }
};

module.exports = connectDB;