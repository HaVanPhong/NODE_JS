class NewController {
  //GET news
  index(req, res) {
    res.render('news');
  }
  tintuc(req, res) {
    res.render('tintuc');
  }
}

module.exports = new NewController();
