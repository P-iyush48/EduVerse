import './Hero.css'
import HeroImg from '../../assets/HeroImg.jpeg'; 

function Hero() {

    const imageArr = ["data:image/jpeg;base64,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",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6_1v9BHUenboGM-5dGAdk-fgIrCBEnXsbCw&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5iB1zY-OM0aoh3RIhLR_j94LlzNEBtXynTA&s",
    "https://img.magnific.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?semt=ais_hybrid&w=740&q=80"
    ];

  return (
    <section className="hero">
        <div className="circle circle-1"></div>
        <div className="circle circle-2"></div>
        <div className="circle circle-3"></div>
        <div className="hero-left">
            <div className="hero-tag">
                <span>#1</span><span>Learning Platform</span>
            </div>
            <div className="hero-heading">
                <h1>
                    Learn the skills <br />
                    of <span>tomorrow.</span>
                </h1>
            </div>
            <p className="hero-para">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos, veritatis ullam eum unde sint. 
            </p>
            <div className="hero-btn">
                <div className="browser-course">
                    <button>Browser Courses</button>
                </div>
                <div className="explore">
                    <button>Explore</button>
                </div>
            </div>
            <div className="students-info">
                {
                    imageArr.map((img,index)=>{
                        return <img src={img} alt="" key={index}/>
                    })
                }
                
                <p>50k+<br/><span>Active Students</span></p>
            </div>
        </div>
        <div className="hero-right">
            <img src={HeroImg} alt="" />
        </div>
    </section>
  )
}

export default Hero;