import { useUser } from "../context/UserContext";
import { Navigate, Outlet } from "react-router-dom";
import TeacherSideBar from "../components/home/TeacherSideBar";
import './TeacherLayout.css';

function TeacherLayout() {
    const {user, loading} = useUser();

    if(loading) {
        return <h1>Loading...</h1>
    }

    if(user && user.role == "teacher") {
        return <div className="teacher-layout">
            <TeacherSideBar />
            <Outlet />  {/* nested route (Outlet Component contains Courses component*/}
        </div>
    }
    else {
        return <Navigate to={'/login'} />
    }

}

export default TeacherLayout