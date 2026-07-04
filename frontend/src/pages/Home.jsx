import Features from "../components/home/features";
import Hero from "../components/home/Hero";
import PopularCourses from "../components/home/PopularCourses";
import { useUser } from "../context/UserContext";

function Home(){

    const {user} = useUser(); 
    // console.log(user);
    

   return(
    <>
        <Hero />
        <Features />
        <PopularCourses />
    </>
   ) 
}

export default Home;