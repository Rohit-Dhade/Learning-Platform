const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    required: true,
  },
  lessons: {
    type: Number,
    required: true,
  },
  duration:{
    type:String,
    required:true, 
  },
  students:{
    type:String,
    required:true,
  },
  rating:{
    type:Number,
    required:true,
  },
  instructor:{
    name: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
    },
  },
  description:{ 
    type: String,
    required: true,
  },
  whatYouLearn:[
    {
      type: String,
      required: true,
    },
  ],
  curriculum:[
    {
      week: {
        type: String,
        required: true,
      },
      topic: {
        type: String,
        required: true,
      },
      lessons: {
        type: Number,
        required: true,
      },
    },
  ],
});

const CourseModel = mongoose.model("Course", courseSchema);
module.exports = CourseModel;


// const course = {
//   title: "React Mastery",
//   level: "Intermediate",
//   lessons: 42,
//   duration: "18h 30m",
//   students: "12,400",
//   rating: 4.9,
//   instructor: { name: "Alex Carter", role: "Senior Frontend Engineer", avatar: "AC" },
//   description:
//     "Deep-dive into React's ecosystem — hooks, context, performance optimisation, and building scalable component architectures used in production apps.",
//   whatYouLearn: [
//     "Master React Hooks (useState, useEffect, useRef, useMemo)",
//     "Build reusable component libraries",
//     "State management with Context API & Zustand",
//     "Performance optimisation and lazy loading",
//     "Testing with React Testing Library",
//     "Deploy production-ready apps",
//   ],
//   curriculum: [
//     { week: "Week 1", topic: "Foundations & JSX Deep Dive", lessons: 8 },
//     { week: "Week 2", topic: "Hooks & State Management", lessons: 10 },
//     { week: "Week 3", topic: "Routing & Data Fetching", lessons: 9 },
//     { week: "Week 4", topic: "Performance & Testing", lessons: 8 },
//     { week: "Week 5", topic: "Real-world Project", lessons: 7 },
//   ],
// };
