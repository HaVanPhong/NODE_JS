const Courses = require('../model/Course');
const {
  mongooseToObject,
  multipleMongooseToObject,
} = require('../../util/mongoose');

const express = require('express');

const router = express.Router();

class CourseController {
  //GET courses
  show(req, res, next) {
    Courses.findOne({ slug: req.params.slug })
      .then((course) => {
        // res.json(mongooseToObject(course));

        res.render('courses/show', { course: mongooseToObject(course) });
      })
      .catch((next) => {
        console.log('đm lỗi vl');
      });
  }

  //GET /courses/create
  create(req, res, next) {
    res.render('courses/create');
  }

  //POST /courses/store
  store(req, res, next) {
    const formDate = req.body;
    formDate.img = `http://img.youtube.com/vi/${formDate.videoId}/default.jpg`;
    const courses = new Courses(formDate);
    courses
      .save()
      .then(() => res.redirect('/'))
      .catch((error) => {});
  }

  //GET   /courses/:id/edit

  edit(req, res, next) {
    Courses.findById(req.params.id)
      .then((course) => {
        res.render('courses/edit', {
          course: mongooseToObject(course),
        });
      })
      .catch(() => {
        console.log('lỗi edit');
      });
  }

  //PUT /courses/:id
  update(req, res, next) {
    Courses.updateOne({ _id: req.params.id }, req.body)
      .then(() => res.redirect('/me/stored/courses'))
      .catch(next);
  }

  //DELETE /courses/:id
  destroy(req, res, next){
    Courses.delete({ _id: req.params.id})
      .then(()=> res.redirect('back'))
      .catch(next);
  }

  //DELETE /courses/:id/force
  destroyForce(req, res, next){
    Courses.deleteOne({ _id: req.params.id})
      .then(()=> res.redirect('back'))
      .catch(next);
  }

  //PATCH /courses/:id/restore
  restore(req, res, next){
    Courses.restore({ _id: req.params.id})
      .then(()=>{
        res.redirect('back');
      })
      .catch(next);
  }
}

module.exports = new CourseController();
