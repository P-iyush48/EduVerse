import React, { useEffect, useState, useRef } from "react";
import "./LectureDetails.css";
import {
  FaVideo,
  FaQuestionCircle,
  FaFileAlt,
  FaUpload,
  FaPlus,
} from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../utils/api";

function LectureDetails() {
  const navigate = useNavigate();
  const params = useParams();
  const lectureId = params.lectureId;

  const [activeTab, setActiveTab] = useState("overview");
  // Demo States
  const [lectureThumbnail, setLectureThumbnail] = useState(null); //lecture thumbnail and videoFile these store new thumbnail and video
  const [videoFile, setVideoFile] = useState(null); //this state store user's uploaded video/files
  const [lectureTitle, setLectureTitle] = useState("");
  const [lectureDuration, setLectureDuration] = useState("");
  const [lectureDescription, setLectureDescription] = useState("");
  const [oldThumbmail, setOldThumbnail] = useState(null);
  const [oldVideoUrl, setOldVideoUrl] = useState(null);
  const thumbnailRef = useRef();
  const videoRef = useRef();
  const [quizTitle, setQuizTitle] = useState("");
  const [quizzes, setQuizzes] = useState([]);
  const [resourceType, setResourceType] = useState("text");
  const [resourceText, setResourceText] = useState("");
  const [resourceTitle, setResourceTitle] = useState("");
  const [resourceFile, setResourceFile] = useState(null);
  const [resources, setResources] = useState([]);
  const [fileResources, setFileResources] = useState([]);
  const [textResouces, setTextResouces] = useState([]);

  const getLectureDetails = async () => {
    try {
      const responce = await api.get(`/lecture/${lectureId}`);
      if (responce.data?.success) {
        const { data } = responce.data;
        // console.log(data);

        setLectureTitle(data.title);
        setLectureDescription(data.description);
        setOldThumbnail(data.thumbnail);
        setOldVideoUrl(data.videoFile);
        setLectureDuration(data.duration);
        thumbnailRef.current = data.thumbnail;
      }
    } catch (err) {
      console.log(err);
      toast.error(err.responce?.data?.message || "Interval Serve Error");
    }
  };

  const getResouces = async () => {
    try {
      
    } catch (err) {
      console.log(err);
      toast.error(err?.responce?.data?.message || "Internal Server Error");
    }
  }
  useEffect(() => {
    getLectureDetails();
    getResouces();
  }, []);

  function handleImageChange(e) {
    if (oldThumbmail) {
      //if user change thumbnail then oldThumbnail set empty string and store new thumbnail image in Lecture Thumbnail.
      setOldThumbnail("");
    }
    setLectureThumbnail(e.target.files[0]);
  }

  function handleVideoChange(e) {
    if (oldvisetOldVideoUrl) {
      setOldVideoUrl("");
    }
    setVideoFile(e.target.files[0]);
  }

  // Add Quiz
  function handleAddQuiz(e) {
    e.preventDefault();

    const newQuiz = {
      title: quizTitle,
    };

    setQuizzes([...quizzes, newQuiz]);

    setQuizTitle("");
  }

  // Add Resource
  function handleAddResource(e) {
    e.preventDefault();

    const newResource = {
      title: resourceTitle,
      type: resourceType,
      text: resourceText,
      file: resourceFile,
    };
    // console.log(newResource);
    

    if(resourceType == "file") {
      setFileResources([...fileResources, newResource]);
    }
    else {
      setTextResouces([...textResouces, newResource]);
    }

    setResourceTitle("");
    setResourceText("");
    setResourceFile(null);
    setResourceType("text");
  }

  async function handleSubmit() {
    try {
      const formData = new FormData();
      formData.append("lectureId", lectureId);
      formData.append("title", lectureTitle);
      formData.append("description", lectureDescription);
      formData.append("duration", lectureDuration);
      if (oldThumbmail) {
        formData.append("oldThumbnail", oldThumbmail);
      } else {
        formData.append("thumbnail", lectureThumbnail);
      }

      if (oldVideoUrl) {
        formData.append("oldVideoUrl", oldVideoUrl);
      } else {
        formData.append("videoUrl", videoFile);
      }

      // console.log(formData);
      const responce = await api.put("/lecture/", formData);
      if (responce.data?.success) {
        toast.success("Lecture Updated Successfully");
      }


      // * For uploading Materials:
      const materials = fileResources.map((resource) => resource.file); 
      const materialData = fileResources;
      const textMaterial = textResouces;

      const materialsFormData = new FormData();
      materialsFormData.append("lectureId", lectureId);
      materialsFormData.append("materials", materials);
      materialsFormData.append("materialsData", JSON.stringify(materialData));
      materialsFormData.append("textMaterials",JSON.stringify(textMaterial));      
    
      const materialResponse = await api.post('/lecture/materials', materialsFormData);
  

    } catch (err) {
      console.log(err);
      toast.error(err.responce?.data?.message || "Internal Server Error");
    }

    setLectureTitle("");
    setLectureDescription("");
    setLectureThumbnail(null);
    setVideoFile(null);
    setLectureDuration("");

    navigate(-1);
  }

  return (
    <div className="lecture-details-page">
      {/* Top Header */}
      <div className="lecture-top">
        <div>
          <div className="module-path">
            <span
              onClick={() => {
                navigate(-2);
              }}
            >
              My Courses
            </span>{" "}
            <span>{">"}</span>
            <span
              onClick={() => {
                navigate(-1);
              }}
            >
              Course
            </span>{" "}
            <span>{">"}</span>
            <span>{lectureId}</span>
          </div>

          <h1>Lecture Management</h1>
          <p>Manage video, quizzes and resources</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="lecture-tabs">
        <button
          className={activeTab === "overview" ? "active-tab" : ""}
          onClick={() => setActiveTab("overview")}
        >
          <FaVideo />
          Overview
        </button>
        <button
          className={activeTab === "video" ? "active-tab" : ""}
          onClick={() => setActiveTab("video")}
        >
          <FaVideo />
          Video
        </button>

        <button
          className={activeTab === "quiz" ? "active-tab" : ""}
          onClick={() => setActiveTab("quiz")}
        >
          <FaQuestionCircle />
          Quiz
        </button>

        <button
          className={activeTab === "resources" ? "active-tab" : ""}
          onClick={() => setActiveTab("resources")}
        >
          <FaFileAlt />
          Resources
        </button>
      </div>

      {/* Overview TAB */}
      {activeTab === "overview" && (
        <div className="tab-content">
          <div className="content-card">
            <h2>Lecture Overview</h2>
            <div className="form-group">
              <label>Lecture Title</label>

              <input
                type="text"
                placeholder="Enter lecture title"
                value={lectureTitle}
                onChange={(e) => setLectureTitle(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Lecture Description</label>

              <textarea
                type="text"
                placeholder="Enter lecture description"
                value={lectureDescription}
                onChange={(e) => setLectureDescription(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Lecture Thumbnail</label>

              <input
                type="file"
                accept="image/*"
                ref={thumbnailRef}
                onChange={handleImageChange}
              />
            </div>

            <div className="form-group">
              <label>Lecture Duration</label>

              <input
                type="text"
                placeholder="Enter lecture duration"
                value={lectureDuration}
                onChange={(e) => setLectureDuration(e.target.value)}
              />
            </div>

            <button className="primary-btn" onClick={handleSubmit}>
              Save Lecture
            </button>
          </div>
        </div>
      )}

      {/* VIDEO TAB */}
      {activeTab === "video" && (
        <div className="tab-content">
          <div className="content-card">
            <h2>Upload Lecture Video</h2>

            <div className="upload-box">
              <FaUpload className="upload-icon" />

              <p>Upload your lecture video</p>

              <input
                type="file"
                accept="video/*"
                ref={videoRef}
                onChange={handleVideoChange}
              />
            </div>

            {videoFile && <div className="uploaded-item">{videoFile.name}</div>}
          </div>
        </div>
      )}

      {/* QUIZ TAB */}
      {activeTab === "quiz" && (
        <div className="tab-content">
          <div className="content-card">
            <div className="section-header">
              <h2>Create Quiz</h2>
            </div>

            <button
              className="primary-btn"
              onClick={() => navigate(`/teacher/quiz-builder/${lectureId}`)}
            >
              <FaPlus />
              Open Quiz Builder
            </button>
          </div>

          {/* Quiz List */}
          <div className="items-list">
            {quizzes.map((quiz, index) => {
              return (
                <div className="list-card" key={index}>
                  <div>
                    <h3>{quiz.title}</h3>
                    <p>Quiz #{index + 1}</p>
                  </div>

                  <button
                    className="primary-btn"
                    onClick={() =>
                      navigate(`/teacher/quiz-builder/${lectureId}`)
                    }
                  >
                    <FaPlus />
                    Open Quiz Builder
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* RESOURCES TAB */}
      {activeTab === "resources" && (
        <div className="tab-content">
          <div className="content-card">
            <h2>Upload Resource</h2>

            <form onSubmit={handleAddResource}>
              <div className="form-group">
                <label>Resource Title</label>

                <input
                  type="text"
                  placeholder="Enter resource title"
                  value={resourceTitle}
                  onChange={(e) => setResourceTitle(e.target.value)}
                  required
                />
              </div>

              {/* Resource Type */}
              <div className="form-group">
                <label>Resource Type</label>

                <select
                  value={resourceType}
                  onChange={(e) => setResourceType(e.target.value)}
                >
                  <option value="text">Text Content</option>

                  <option value="file">Upload File</option>
                </select>
              </div>

              {/* TEXT RESOURCE */}
              {resourceType === "text" && (
                <div className="form-group">
                  <label>Text Content</label>

                  <textarea
                    placeholder="Write your resource content..."
                    value={resourceText}
                    onChange={(e) => setResourceText(e.target.value)}
                    rows={6}
                  />
                </div>
              )}

              {/* FILE RESOURCE */}
              {resourceType === "file" && (
                <div className="form-group">
                  <label>Upload File</label>

                  <input
                    type="file"
                    onChange={(e) => setResourceFile(e.target.files[0])}
                  />
                </div>
              )}

              <button className="primary-btn">
                <FaUpload />
                Upload Resource
              </button>
            </form>
          </div>

          {/* Resources List */}
          <div className="items-list">
            {[...textResouces,...fileResources].map((resource, index) => {
              // console.log(textResouces);
              
              return (
                <div className="list-card" key={index}>
                  <div>
                    <h3>{resource.title}</h3>
                    <p>Resource #{index + 1}</p>
                    {resource.type === "text" ? (
                      <p className="resource-preview">{resource.text}</p>
                    ) : (
                      <p className="resource-preview">{resource.file?.name}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default LectureDetails;
