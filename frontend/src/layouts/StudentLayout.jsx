import { useUser } from "../context/UserContext";
import { Navigate, Outlet } from "react-router-dom";
import './StudentLayout.css';
import StudentSidebar from "../components/home/StudentSlideBar";

function StudentLayout() {
    const {user, loading} = useUser();

    if(loading) {
        return <h1>Loading...</h1>
    }

    if(user && user.role == "student") {
        return <div className="teacher-layout">
            <StudentSidebar />
            <Outlet />  {/* nested route */}
        </div>
    }
    else {
        return <Navigate to={'/login'} />
    }

}

export default StudentLayout