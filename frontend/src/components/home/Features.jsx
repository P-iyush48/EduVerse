import './Features.css';
import { FaUser } from "react-icons/fa";

function Features() {

    const colorArr = ['--orange', '--green','--primary','--yellow'];

  return (
    <div className='features-main'>
        <section className='features'>
            <p>Features</p>
            <div className="features-l-r-container">
                <div className="features-left">
                    <h1>Everything You Need <br />to Succeed</h1>
                </div>
                <div className="features-right">
                    <div className="features-card">
                        <FaUser className='features-icon'/>
                        <h2>Expert Teachers</h2>
                        <p>Student From Professional teachers and gain real world experiance</p>
                    </div>
                    <div className="features-card">
                        <FaUser className='features-icon'/>
                        <h2>Expert Teachers</h2>
                        <p>Student From Professional teachers and gain real world experiance</p>
                    </div>
                    <div className="features-card">
                        <FaUser className='features-icon'/>
                        <h2>Expert Teachers</h2>
                        <p>Student From Professional teachers and gain real world experiance</p>
                    </div>
                    <div className="features-card">
                        <FaUser className='features-icon'/>
                        <h2>Expert Teachers</h2>
                        <p>Student From Professional teachers and gain real world experiance</p>
                    </div>
                </div>
            </div>
        </section>
    </div>
  )
}

export default Features