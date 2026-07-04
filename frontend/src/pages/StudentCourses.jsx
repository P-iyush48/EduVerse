import React, { useEffect, useState } from "react";
import "./TeacherCourses.css";
import { useUser } from "../context/UserContext";
import toast from "react-hot-toast";
import api from "../utils/api";
import CourseCard from "../components/CourseCard";
import { useNavigate } from "react-router-dom";


const StudentCourses = () => {
  const [courses, setCourses] = useState([]);

  const {user} = useUser();
  const navigate = useNavigate();
  
  useEffect(()=>{},[]);

  const handleCourseClick = (data) =>{
    const courseId = data._id;
    navigate(`/teacher/course-module/${courseId}`);
  }


  return (
    <>
      <div className="courses-page">
        {/* Header */}
        <div className="courses-header">
          <div>
            <h1>My Courses</h1>
            <p>Look the courses you joined</p>
          </div>
        </div>

        {/* Courses Grid */}
        <div className="courses-grid">
          {
            courses.map((data, index)=>{
              // console.log(data)
              return <CourseCard key={index} data={data} mode={user.role} onClick={ ()=>handleCourseClick(data)} />
            })
          }
        </div>

       
      </div>
    </>
  );
};

export default StudentCourses;
