const express= require('express');
const app = express();
const cors= require('cors');
const helmet = require('helmet')


app.use(express.json());
app.use(cors());
app.use(helmet.xssFilter());
app.use(helmet.hidePoweredBy());



const asyncMiddelware= require('./middlewares/async.middleware')
const authMiddelware = require('./middlewares/auth.middleware')
const userController = require('./controllers/user.controller')
const authController = require('./controllers/auth.controller')

app.post('/signup', asyncMiddelware(authController.signUp) )
app.post('/login', asyncMiddelware(authController.login) )
app.get('/users', asyncMiddelware(authMiddelware), asyncMiddelware(userController.getAll))

app.use((err, req, res, next) => {
  res.json({
    status: err.status || 500,
    message: err.message || "error server, please try again!"
  })
})
app.listen(8080, ()=>{
  console.log("server runed at port 8080");
})