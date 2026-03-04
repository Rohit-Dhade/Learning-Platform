const express = require("express");
const app = express();
app.use(express.json());
const authRouter = require("./routes/auth.route");
const courseRouter = require("./routes/course.route");
const cookieparser = require("cookie-parser");
app.use(cookieparser());

const cors = require("cors");
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  }),
);

app.get("/", (req, res) => {
  return res.status(200).json({
    message: "this is home end point",
  });
});

app.use("/api/user", authRouter);
app.use("/api/course", courseRouter);

module.exports = app;
