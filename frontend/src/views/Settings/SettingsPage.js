import axios from "axios";
import NavBar from "../../components/NavBar.js";

const SettingsPage = () => {
    const username = localStorage.getItem('username')
    const email = localStorage.getItem('email')

    return (
        <>
            <NavBar />
            <div className="container">
                <main className="main-content">
                    <img src="/defaultProfile.png" className="profile" alt="Profile" />
                    <h1>Profile</h1>
                    <br />
                    <div>
                        <p>{username}</p>
                        <p>{email}</p>
                    </div>
                </main>
                <section className="right-panel">
                    <div className="tools">
                        <button>Test me</button>
                        <button>Practical exercise</button>
                        <button>Further reading</button>
                    </div>
                    <div className="chat-box">
                        <div className="chat-message">Hi, any questions for me?</div>
                        <input type="text" placeholder="Type your message..." />
                    </div>
                </section>
            </div>
        </>
        
    );
}

export default SettingsPage;