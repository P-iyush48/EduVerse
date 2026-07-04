import { createContext, useContext, useEffect, useState } from "react";
import api from "../utils/api";
import toast from "react-hot-toast";

const UserContextProvider = createContext(); 

function UserContext({children}) {
    
    const [user, setUser] = useState(""); //store login user data
    const [loading, setLoading] = useState(true);

    // console.log(loading, setLoading);
    
    useEffect(()=>{   
        async function getMe() {    //this function get user's details when user complete login authntication
           
            try {
                 const response = await api.get('/auth/me');
                if(response.data?.success) {
                    setUser(response.data?.data);
                }
            } 
            catch (err) {
                console.log(err);
                toast.error(err.response?.data?.message || "Internal Server Error");
            }
            finally {
                setLoading(false);
            }
        }
        getMe();

    },[]);

    async function logout() {
        try {
            const response = await api.post("/auth/logout");
            if(response.data?.success) {
                toast.success("Logout Successfully");
                setUser(null);
                nevigate('/')
            }
        } catch (err) {
            console.log(err);
            toast.error(err.response?.data?.message || "Internal Server Error");
        }
    }

    return <UserContextProvider.Provider value={{user, setUser, loading, setLoading, logout}}>
        {children}  
    </UserContextProvider.Provider>
    //component call and it wrap by UserContextProvider.Provider
}

const useUser = ()=>{
    const { user, setUser, loading, setLoading, logout } = useContext(UserContextProvider);
    return {user, setUser, loading, setLoading, logout };
}

export {UserContext, useUser};