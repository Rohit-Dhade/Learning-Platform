const courseModel = require("../models/courses.model");

async function createCourseController(req, res) {
  const { title, level, lessons ,duration, students, rating, instructor, description, whatYouLearn, curriculum } = req.body;

  const isAlreadyExists = await courseModel.findOne({ title });

  if (isAlreadyExists) {
    return res.status(400).json({
      message: "This Course already exists",
      isAlreadyExists,
    });
  }

  const course = await courseModel.create({
    title,
    level,
    lessons,
    duration,
    students,
    rating,
    instructor,
    description,
    whatYouLearn,
    curriculum,
  });

  res.status(201).json({
    message: "Course created successfully",
    course,
  });
}

async function getAllCoursesController(req,res) {
  const courses = await courseModel.find();

  if (!courses) {
    return res.status(400).json({
      message: "No courses Found",
    });
  }

  res.status(200).json({
    message: "All courses",
    courses,
  });
}

async function getCourseController(req,res) {
  const {id} = req.params;
  const course = await courseModel.findById(id);

  if (!course) {
    return res.status(400).json({
      message: "No course Found",
    });
  }

  res.status(200).json({
    message: "Course found",
    course,
  });
}

module.exports = { createCourseController ,getAllCoursesController,getCourseController };
