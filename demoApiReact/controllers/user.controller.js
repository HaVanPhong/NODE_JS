const User = require('../configs/db');


module.exports = {
  getAll: async (req, res, next) => {
    res.status(200).json({
      status: 200,
      data: User
    })
  }
}