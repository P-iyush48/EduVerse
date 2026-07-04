import '../home/PopularCourses.css';
//import icons
import { GrWifiLow } from "react-icons/gr"; //low leve
import { GrWifiMedium } from "react-icons/gr";  //medium level
import { GrWifi } from "react-icons/gr";    //high level
import CourseCard from '../CourseCard';
import api from '../../utils/api';


function PopularCourses() {
  
  return (
    <section className='popular-courses'>
        <p>Popular Courses</p>
        <div className="popular-courses-container">
            {/* <CourseCard /> */}
        </div>
    </section>
  )
}

export default PopularCourses