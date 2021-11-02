const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  try {
    var token= req.headers['authorization'];
    var decode = jwt.verify(token, '123');
    if (decode){
      next();
    }
  } catch (error) {
    res.json({"error": error.message});
  }
}