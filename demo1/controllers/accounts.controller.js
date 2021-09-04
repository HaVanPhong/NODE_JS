module.exports.getAllAccounts = (req, res) => {
  res.render("index");
};

module.exports.createNewAccount = (req, res) => {
  console.log(req.body);
};
