const express = require("express");
const courseRouter = express.Router();
const {createCourseController ,getAllCoursesController,getCourseController} = require('../Controllers/course.controller')

courseRouter.post("/create", createCourseController);
courseRouter.get("/all-courses", getAllCoursesController);
// courseRouter.delete("/delete-course/:id", deleteCourseController);    
courseRouter.get("/get-course/:id", getCourseController);

module.exports = courseRouter