//import icons
import { GrWifiLow } from "react-icons/gr"; //low leve
import { GrWifiMedium } from "react-icons/gr";  //medium level
import { GrWifi } from "react-icons/gr";    //high level

function CourseCard({data, mode, onClick}) {
    console.log("Data:" + data);
    
    function leveIcons(level) {
        if(level == 'beginner') {
            return <GrWifiLow className='level-icon'/>
        }
        if(level == 'intermediate') {
            return <GrWifiMedium className='level-icon'/>
        }
        return <GrWifi className='level-icon'/>
    }

    const IMAGE_URL = `http://localhost:4000/uploads/`; 
    // console.log(data);
    

  return (
    <div className="course-card">
                <div className="course-img">
                    <img src={IMAGE_URL + data.thumbnail} alt={data.title} />
                </div>
                <div className="course-category">
                   {data.category}
                </div>
                <div className="course-body">
                    <h1 className="course-title">
                        {data.title}
                    </h1>
                    <div className="course-level">
                        {
                            leveIcons(data.level)
                        }
                        <p className="level-text">
                            {data.level} Level
                        </p>
                    </div>
                    {mode == 'normal' && <div className="course-teacher">
                        <img src="https://img.freepik.com/premium-photo/beautiful-indian-teacher_981168-2922.jpg?semt=ais_hybrid&w=740&q=80" alt="" />
                        <span className="teacher-name">{data.teacher}</span>
                    </div>}
                </div>
                <button className="view-course" onClick={onClick} >
                    View Course
                </button>
            </div>
  )
}

export default CourseCard;