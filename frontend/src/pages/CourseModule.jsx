import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams, } from "react-router-dom";
import { useUser } from "../context/UserContext";
import api from "../utils/api";
import './CourseModule.css';
import { IoIosArrowDown } from "react-icons/io";


function CourseModule() {

    const params = useParams();
    const courseId = params.courseId;
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const {user} = useUser();
    const [moduleTitle, setModuleTitle] = useState(""); 
    const [modules, setModules] = useState([]);
    const [showModulesList, setShowModulesList] = useState(false); 


    async function getModules() {
        const response = await api.get(`/modules/${courseId}`);
        // console.log("Get Modules: "+ response.data.data)
        if(response.data?.success) {
            setModules(response.data.data);
        }
    }
    useEffect(()=>{
        getModules();
    },[]);
    // console.log(modules);
    

    const handleSubmit = async (e) => {
        try{
            e.preventDefault();

            const response = await api.post('/modules', {title: moduleTitle, course: courseId}) ;
            console.log(response.data);
            console.log(response.data.data);
            
            if(response.data.success){
                toast.success("Module Created Successfully");

                const newModulesTitle = response.data?.data;
                setModules([...modules, newModulesTitle]);
            }
        }
        catch(err) {
            console.log(err);
            toast.error(err.response.data?.message || "Internal Server Error");
        }
        finally {
            setShowModal(false);
        }
    } 
    //  console.log(moduleData)

    function handleArrowClick(e) {
        if(!showModulesList){
            setShowModulesList(true);
        }
        setShowModulesList(false)
    }


    return (
        <div className="module-page">
            <div className="module-header">
                <div>
                    <div className="module-path">
                        <span onClick={
                            ()=>navigate(-1) // --> /teacher/courses
                        }>My Courses</span>
                        <span>{">"}</span>
                        <span>{courseId}</span>
                    </div>
                    <h1>My Course Modules</h1>
                    <p>Manage and create your courses</p>
                </div>

                <button className="add-module-btn" onClick={()=>{setShowModal(true) }} >
                    + Add Module
                </button>
                </div>

                {/* Modules Grid */}
                <div className="modules-grid">
                    {
                        modules.map((data,index)=>{
                            // console.log(data);
                            return <div 
                                className="module-card"
                                key={index}
                                onClick={()=>navigate(`/teacher/course-content/${data._id}`)} 
                                 >
                                        <h2>{data.title}</h2>
                                        <p>
                                            Manage chapters, lectures,
                                            quizzes and resources
                                        </p>
                                    </div>                            
                        })
                    }
                </div>

                {/* Modal */}
                {showModal && (
                    <div className="modal-overlay">
                        <div className="course-modal">
                        <div className="modal-header">
                            <h2>Add New Module</h2>

                            <button onClick={() => setShowModal(false)}>✕</button>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                            <label>Module Title</label>

                            <input
                                type="text"
                                name="title"
                                placeholder="Enter module title"
                                value={moduleTitle}
                                onChange={(e)=>{setModuleTitle(e.target.value)}}
                                required
                            />
                            </div>

                            <button type="submit" className="submit-btn">
                            Create Modules
                            </button>
                        </form>
                    </div>
                </div>
                )}
        </div>
        
    )
    
  
}

export default CourseModule