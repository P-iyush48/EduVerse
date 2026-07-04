const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();

const connectToDB = require("./config/db");
const errorMiddleware = require("./middlewares/errorMiddleware");
const cookieParser = require("cookie-parser");
const path = require('path');

// import routes :
const authRoutes = require("./routes/authRoutes");
const courseRoutes = require('./routes/courseRoutes');
const moduleRoutes = require("./routes/moduleRoutes");
const chapterRoutes = require('./routes/chapterRoutes');
const lectureRoutes = require('./routes/lectureRouter');
const quizeRoutes = require('./routes/quizeRoutes');
const enrollmentRoutes = require('./routes/enrollmentRoutes');

dotenv.config();
connectToDB();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(
  cors({
    origin: process.env.MODE == "production" ? process.env.FRONTEND_URL : true,
    credentials: true,
  }),
); // Middleware to accept request from other server


app.use(cookieParser()); // Middleware to parse client cokkies
app.use(errorMiddleware); // Using errorMiddleware globally
app.use("/uploads",express.static(path.join(__dirname, '../uploads')));  // It helps to share the images from uploads folder to frontend.

app.get("/health", (req, res) => {
  res.send("<h1>Server Is Running Perfectly</h1>");
});


app.use("/api/v1/auth", authRoutes);  // Using routes defined in authRoutes file
app.use('/api/v1/course', courseRoutes);
app.use('/api/v1/modules', moduleRoutes);
app.use('/api/v1/chapter', chapterRoutes);
app.use('/api/v1/lecture', lectureRoutes);
app.use('/api/v1/enrollment', enrollmentRoutes )
app.use('/api/v1/quizes', quizeRoutes);


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server Is Running At:\nhttp://localhost:${PORT}/health`);
  console.log("");
});
