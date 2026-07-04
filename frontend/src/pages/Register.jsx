import { useState } from "react";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../utils/api";

function Register() {
    const [data, setData] = useState({fullname:"", email:"",password:"",role:"student",bio:"",profileImage:null});
    const navigate = useNavigate();

    function handleChange(e) {
        const {name, value} = e.target;
        setData({...data, [name] : value});
    }

    function handleRoleChange(role) {
        setData({...data, role : role})
    }

    function handleImageChange(e) {
        const image = e.target.files[0];
        // console.log(image);
        
        setData({...data, profileImage : image})
    }

    // send data throw this async function :
    async function handleSubmit(e) {
        try {
            e.preventDefault();  //it block the events like refresh, etc.
            
            for(let field in data) {
                // console.log(data[field]);

                if(data.role=="student" && field=="bio" ){ //if role is student then skip bio input. Bio only for teachers
                    continue;
                }

                if(!data[field]){
                    toast.error(`${field} is required`);
                    return;
                }
            }

            const formData = new FormData();
            for(let field in data) {
                formData.append(field, data[field]);
            }
            // console.log(formData);

            const response  = await api.post('/auth/register', formData);
            // console.log(response.data);
            if (response.data?.success) {
                toast.success(response.data.message);
                navigate('/login');
            }
            else {
                toast.error(response.data.message);
            }

            setData({fullname:"", email:"",password:"",role:"student",bio:"",profileImage:null});
            // clean state after completed the registration.
        }
        catch(err) {
            console.log("Error:",err);
            
            toast.error(err?.response.data.message);
        }
    }

    

    return (
        <div className="register-page">

            <div className="register-container">

                {/* LEFT SIDE */}
                <div className="register-left">

                    <div className="register-left-content">

                        <h1>EduVerse</h1>

                        <p>
                            Create your account and unlock
                            AI-powered learning, live classes,
                            and performance tracking.
                        </p>

                        <div className="register-quote-card">

                            <p>
                                “EduVerse made teaching and
                                learning smarter than ever.”
                            </p>

                            <span>— Teacher</span>

                        </div>

                    </div>

                </div>

                {/* RIGHT SIDE */}
                <div className="register-right">

                    <div className="register-form-container">

                        <h1>
                            Create Account ✨
                        </h1>

                        <form className="register-form" onSubmit={handleSubmit}>

                            <input
                                type="text"
                                placeholder="Full Name"
                                name="fullname"
                                value={data.fullname}
                                onChange={handleChange}
                            />

                            <input
                                type="email"
                                placeholder="Email"
                                name="email"
                                value={data.email}
                                onChange={handleChange}
                            />

                            <input
                                type="password"
                                placeholder="Password"
                                name="password"
                                value={data.password}
                                onChange={handleChange}
                            />

                            {/* ROLE SELECT */}
                            <div className="role-section">

                                <label>
                                    Register as:
                                </label>

                                <div className="role-options">

                                    <button
                                        type="button"
                                        className={`role-btn ${data.role == 'student' && "active-role" }` }
                                        onClick={()=>handleRoleChange('student')}
                                    >
                                        🎓 Student
                                    </button>

                                    <button
                                        type="button"
                                        className={`role-btn ${data.role == 'teacher' && "active-role" }` }
                                        onClick={()=>handleRoleChange('teacher')}
                                    >
                                        👨‍🏫 Teacher
                                    </button>

                                </div>

                            </div>
                        {/* Profile Image */}
                            <div className="profile-img">
                                <label htmlFor="profileImage">Upload Profile Image</label>
                                <input type="file" name="profileImage" id="profileImage"
                                onChange={handleImageChange}/>
                            </div>

                        {/* Bio (only for teacher) */}
                            {
                                data.role == 'teacher' && <div className="bio-container">
                                    <label htmlFor="bio">Bio</label>
                                    <textarea name="bio" id="bio" value={data.bio} placeholder="Enter Something About Yourself..." onChange={handleChange}></textarea>
                                </div>
                            }

                            <button
                                type="submit"
                                className="register-btn"
                            >
                                Create Account
                            </button>

                        </form>

                        <div className="login-link">
                            Already have an account?
                            <Link to="/login">
                                Login
                            </Link>
                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Register;