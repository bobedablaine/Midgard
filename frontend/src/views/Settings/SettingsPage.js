import axios from "axios";
import NavBar from "../../components/NavBar.js";
import AuthService from '../../services/auth.service.js';

const SettingsPage = () => {
    const username = localStorage.getItem('username')
    const email = localStorage.getItem('email')

    const handleLogout = async () => {
        try {
            await AuthService.logout();
            // Force a page reload to clear any remaining state
            window.location.href = '/login';
            // Or alternatively:
            // navigate('/login', { replace: true });
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    return (
        <>
            <NavBar />
            <h1 className="settings-title">Settings</h1>
            <div className="settings-container">
                
                <aside className="sidebar-settings">
                    <ul>
                        <li><a href="#account">Account</a></li>
                        <li><a href="#privacy">Privacy</a></li>
                        <li><a href="#support">Support</a></li>
                        <li><a href="#logout">Logout</a></li>
                    </ul>
                </aside>
                <main class="settings-content">
                    <section id="account">
                        <h2>Account Settings</h2>
                        <div>
                        <p>Username: {username}</p>
                        <p>Email: {email}</p>
                        </div>
                    </section>
                    <section id="privacy">
                        <h2>Privacy</h2>
                        <h3>Our Policy</h3>
                        <p>At MIDGARD, safeguarding your privacy is at the heart of everything we do. We arec ommitted to protecting your personal information with the utmost care and transparency,</p>
                        
                        <p>ensuring you stay in control of your data.</p>
                    </section>
                    <section id="support">
                        <h2>Support</h2>
                        <h3>Having issues with our product? Let us know!</h3>
                        <p>Support Email: midgardsecurity@gmail.com</p>
                        <p>Support Line: 1-800-332-5873</p>
                    </section>
                    <section id="logout">
                        <h2>Logout</h2>
                        <button onClick={handleLogout} className="logout-button">
                            Logout
                        </button>
                    </section>
                </main>
                {/* <div className="settings-content">
                    <h2>Profile</h2>
                    <br />
                    <div>
                        <p>Username: {username}</p>
                        <p>Email: {email}</p>
                    </div>
                </div>
                <div className="settings-content">
                    <h2>Profile</h2>
                    <br />
                    <div>
                        <p>Username: {username}</p>
                        <p>{email}</p>
                    </div>
                </div>
                <div className="settings-content">
                    <h2>Profile</h2>
                    <br />
                    <div>
                        <p>Username: {username}</p>
                        <p>{email}</p>
                    </div>
                </div> */}
                
            </div>
        </>
        
    );
}

export default SettingsPage;