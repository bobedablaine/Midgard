import NavBar from "../../components/NavBar.js";
import { NavLink } from "react-router-dom";

const HomePage = () => {

    return (
        <>
            <NavBar />
            <div className="logo-wrap">
                <div className="tint"></div>
                <video autoPlay muted loop id="backgroundHomeVideo">
                    <source
                        src="https://res.cloudinary.com/hcv8opupx/video/upload/v1723243584/AdobeStock_570132261_s39xqq.mp4"
                        type="video/mp4"
                    />
                    Your browser does not support the video tag.
                </video>
                <img src="/image_2024-10-06_115327155-removebg-preview.png" className="homelogo" alt="Logo" />
            </div>
            <div className="container-Boxes">
                <div className="content-Box">
                    <NavLink to="/content">
                        <img src="/cyberBook2.jpg" className="homePicture" alt="Textbook" />
                    </NavLink>
                    <h1>Learn</h1>
                </div>
                <div className="content-Box">
                    <NavLink to="/tools">
                        <img src="/cyberTools2.jpg" className="homePicture" alt="Tools" />
                    </NavLink>
                    <h1>Tools</h1>
                </div>
                <div className="content-Box">
                    <NavLink to="/settings">
                        <img src="/cyberGear2.jpg" className="homePicture" alt="Textbook" />
                    </NavLink>
                    <h1>Settings</h1>
                </div>
            </div>
        </>
        
    );
}

export default HomePage;