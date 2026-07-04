import React from "react";
import "./TeacherSidebar.css";

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
import toast from "react-hot-toast";
import api from "../../utils/api";
import { useNavigate } from "react-router-dom";


const Sidebar = () => {
  const {user} = useUser(); //get all the information of teacher, infor. taken form filling on registration form
  const IMAGE_URL = `http://localhost:4000/uploads/${user?.profileImage}`;  //get teacher profileImage in backend stored on uploads dir. 
  const navigate = useNavigate();
  
  const handleLogout = async (e) => {
    try {
      const response = await api.post('/auth/logout');
      if(response.data?.success) {
        toast.success(response.data?.message);
        navigate('/login');
      }
    } catch (err) {
      console.log(err);
      
      toast.error(err.response?.data?.message || "Internal Server Error");
    }
  }


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
            <p>Teacher Panel</p>
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

        <button className="sidebar-item logout-btn" onClick={handleLogout}>
          <LogOut size={20} />
          <span>Logout</span>
        </button>

        {/* Teacher Profile */}
        <div className="teacher-profile">

          <img
            src={IMAGE_URL}
            alt="teacher"
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

export default Sidebar;