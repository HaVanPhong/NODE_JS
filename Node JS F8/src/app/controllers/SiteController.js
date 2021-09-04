const Courses = require('../model/Course');
const { multipleMongooseToObject } = require('../../util/mongoose');
class SiteContrller {
  //GET /
  home(req, res, next) {
    // Courses.find({}, (err, courses)=>{
    //   if (!err){
    //     res.json(courses);
    //     return;
    //   }
    //   res.status(400).json({
    //     status: 400,
    //     message: "error !!!!",
    //   });
    // })
    Courses.findWithDeleted({})
      .then((courses) => {
        // courses= courses.map(course=> course.toObject())
        // console.log(courses);
        return res.render('home', {
          courses: multipleMongooseToObject(courses),
        });
      })
      .catch(next);
  }

  //GET //search
  search(req, res) {
    res.render('search');
  }
  vovan(req, res) {
    res.send('Vớ vẩn thoi');
  }
}

module.exports = new SiteContrller();
