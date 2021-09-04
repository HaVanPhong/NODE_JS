const Courses = require('../model/Course');
const { multipleMongooseToObject } = require('../../util/mongoose');

const express = require('express');
const router = express.Router();

class MeController {
  //GET /me/stored/courses
  stored(req, res, next) {
    Promise.all([Courses.find(), Courses.countDocumentsDeleted()])
      .then(([courses, deletedCount])=>{
        res.render('../../resource/views/me/stored', {
          deletedCount,
          courses: multipleMongooseToObject(courses),
        });
      })
      .catch(next);      
  }
  
  //GET /me/trash/courses
  trash(req, res, next) {
    Promise.all([Courses.findDeleted(), Courses.countDocuments()])
      .then(([courses, countDocuments])=>{
        res.render('../../resource/views/me/trash', {
          countDocuments,
          courses: multipleMongooseToObject(courses),
        });
      })
      .catch(next);
    }
}

module.exports = new MeController();
