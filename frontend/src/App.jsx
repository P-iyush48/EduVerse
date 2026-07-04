import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Header from "../src/components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Footer from "./components/Footer";
import TeacherCourses from "./pages/TeacherCourses";
import TeacherLayout from "./layouts/TeacherLayout";
import StudentLayout from "./layouts/StudentLayout";
import CourseModule from "./pages/CourseModule";
import CourseContent from "./pages/CourseContent";
import LectureDetails from "./pages/LectureDetails";
import CreateLecture from "./pages/CreateLecture";
import QuizBuilder from "./components/QuizBuilder";
import StudentCourses from "./pages/StudentCourses";
import Courses from "./pages/Courses";
import { useEffect } from "react";
import CourseDetailedPage from "./pages/CourseDetailedPage";

function App() {
  
  const pathName = document.location.pathname; //same as useLocation();
  useEffect(() => {
    const isShowHeader = !pathName.includes("/teacher") && !pathName.includes("/student");
  }, [pathName]);

  return (
    <BrowserRouter>
      {/* {isShowHeader && <Header />}   */}
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/course/:courseId" element={<CourseDetailedPage />} />

        {/*Teacher Routes */}
        <Route path="/teacher" element={<TeacherLayout />}>
          <Route path="courses" element={<TeacherCourses />} />
          <Route path="course-module/:courseId" element={<CourseModule />} />
          <Route path="course-content/:moduleId" element={<CourseContent />} />
          <Route path="create-lecture/:chapterId" element={<CreateLecture />} />
          <Route
            path="lecture-detail/:lectureId"
            element={<LectureDetails />}
          />
          <Route path="quiz-builder/:lectureId" element={<QuizBuilder />} />
        </Route>

        {/* Student Routes */}
        <Route path="/student" element={<StudentLayout />}>
          <Route path="courses" element={<StudentCourses />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
