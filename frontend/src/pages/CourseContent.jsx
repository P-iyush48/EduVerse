import React, { useState } from "react";
import './CourseContent.css';
import { FaChevronDown, FaChevronRight, FaPlus } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import api from "../utils/api";
import toast from "react-hot-toast";
import { useEffect } from "react";

function CourseContent() {
  const [expandedChapter, setExpandedChapter] = useState(null);

  // Modals
  const [showChapterModal, setShowChapterModal] = useState(false);
  const navigate = useNavigate();
  const params = useParams();
  const moduleId = params.moduleId;
  const [chapterTitle, setChapterTitle] = useState(""); 

  // Demo Data
  const [chapters, setChapters] = useState([
    {
      id: 1,
      title: "Introduction to MERN Stack",
      lectures: [
        {
          title: "What is MERN Stack?",
        },
        {
          title: "Project Overview",
        },
      ],
    },
    {
      id: 2,
      title: "React Basics",
      lectures: [
        {
          title: "React Components",
        },
        {
          title: "React Hooks",
        },
      ],
    },
  ]);

  function toggleChapter(id) {
    if (expandedChapter === id) {
      setExpandedChapter(null);
    } else {
      setExpandedChapter(id);
    }
  }

  // Get All Chapters
  async function getAllChapters() {
    try {
        const response = await api.get(`/chapter/${moduleId}`);
        // console.log(response.data.data)
        if (response.data?.success) {
          // console.log(response.data);
          
            setChapters(response.data?.data);
        }
    } catch (err) {
        console.log(err);
        
        toast.error(err.response?.data?.message || "Internal Server Error");
    }
  }
  useEffect(()=>{
    getAllChapters();
  },[]);

//   console.log(chapters);
  

  // Add Chapter
  async function handleAddChapter(e) {
    try {
        e.preventDefault();

        const newChapter = {
            title: chapterTitle,
            module: moduleId
        };
        const response = await api.post('/chapter/', newChapter);
        if(response.data?.success) {
            toast.success("Chapter Created Successfully");
            setChapters([...chapters, response?.data?.data]);
        }

    } 
    catch (err) {
        console.log(err);
        toast.error(err.response?.data?.message || "Internal Server Error");
    }

    setChapterTitle("");
    setShowChapterModal(false);
  }

  return (
    <div className="course-content-page">
      {/* Header */}
      <div className="content-header">
        <div>
          <div className="module-path">
            <span
              onClick={() => {
                navigate(-2);
              }}>
              My Courses
            </span>{" "}
            <span>{">"}</span>
            <span
              onClick={() => {
                navigate(-1);
              }}>
              Course
            </span>{" "}
            <span>{">"}</span>
            <span>{moduleId}</span>
          </div>

          <h1>Course Content</h1>
          <p>Manage Chapters and Lectures</p>
        </div>

        <button
          className="add-chapter-btn"
          onClick={() => setShowChapterModal(true)}
        >
          <FaPlus />
          Add Chapter
        </button>
      </div>

      {/* Chapters */}
      <div className="chapters-container">
        {
          chapters.map((chapter, index) => {
          const isOpen = expandedChapter === chapter._id;
          // console.log(chapter);
          
          return (
            <div className="chapter-card" key={index}>
              {/* Header */}
              <div
                className="chapter-header"
                onClick={() => toggleChapter(chapter._id)}
              >
                <div className="chapter-left">
                  {isOpen ? (
                    <FaChevronDown className="arrow-icon" />
                  ) : (
                    <FaChevronRight className="arrow-icon" />
                  )}

                  <div>
                    <h2>{chapter.title}</h2>
                    <p>{chapter.lectures.length} Lecture</p>
                  </div>
                </div>

                <button
                  className="add-lecture-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    // console.log(chapter.id);
                    
                    navigate(`/teacher/create-lecture/${chapter._id}`);
                  }}
                >
                  <FaPlus />
                  Add Lecture
                </button>
              </div>

              {/* Lectures */}
              {isOpen && (
                <div className="lectures-container">
                  {chapter.lectures.map((lecture, index) => {
                    // console.log(chapter);
                        
                    return (
                      <div className="lecture-card" key={index} onClick={()=>navigate(`/teacher/lecture-detail/${lecture._id}`)}>
                        <span className="lecture-number">{index + 1}</span>
                        
                        <div>
                          <h3>{lecture.title} </h3>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Add Chapter Modal */}
      {showChapterModal && (
        <div className="modal-overlay">
          <div className="custom-modal">
            <div className="modal-top">
              <h2>Add Chapter</h2>

              <button onClick={() => setShowChapterModal(false)}>✕</button>
            </div>

            <form onSubmit={handleAddChapter}>
              <div className="form-group">
                <label>Chapter Title</label>

                <input
                  type="text"
                  placeholder="Enter chapter title"
                  value={chapterTitle}
                  onChange={(e) => setChapterTitle(e.target.value)}
                  required
                />
              </div>

              <button className="submit-btn">Create Chapter</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default CourseContent;
