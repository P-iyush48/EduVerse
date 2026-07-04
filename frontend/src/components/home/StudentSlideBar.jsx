import React from "react";
import "./StudentSlideBar.css";

import {
  LayoutDashboard,
  BookOpen,
  Users,
  ClipboardCheck,
  FileText,
  MessageSquare,
  CalendarDays,
  Settings,
  LogOut,
  GraduationCap,
} from "lucide-react";
import { useUser } from "../../context/UserContext";

// function :
const StudentSidebar = () => {

  const {user, logout} = useUser(); //get all the information of teacher, infor. taken form filling on registration form
  const IMAGE_URL = `http://localhost:4000/uploads/${user?.profileImage}`;  //get teacher profileImage in backend stored on uploads dir. 
  
  return (
    <div className="teacher-sidebar">

      {/* Logo Section */}
      <div>
        <div className="sidebar-logo-section">
          <div className="sidebar-logo">
            <GraduationCap size={28} />
          </div>

          <div>
            <h2>EduVerse</h2>
            <p>Student Panel</p>
          </div>
        </div>

        {/* Menu */}
        <div className="sidebar-menu">

          <button className="sidebar-item active">
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </button>

          <button className="sidebar-item">
            <BookOpen size={20} />
            <span>My Courses</span>
          </button>

          <button className="sidebar-item">
            <Users size={20} />
            <span>Students</span>
          </button>
        </div>
      </div>

      {/* Bottom */}
      <div className="sidebar-bottom">

        <button className="sidebar-item logout-btn">
          <LogOut size={20} />
          <span onClick={logout}>Logout</span>
        </button>

        {/* Teacher Profile */}
        <div className="teacher-profile">

          <img
            src={IMAGE_URL}
            alt="student"
          />

          <div>
            <h4>{user?.fullname}</h4>
            <p>{user?.bio}</p>
          </div>

        </div>
      </div>

    </div>
  );
};

export default StudentSidebar;