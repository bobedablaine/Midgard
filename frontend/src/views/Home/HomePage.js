import NavBar from "../../components/NavBar.js";

const HomePage = () => {

    return (
        <>
            <section className="right-panel">
                <NavBar />
            </section>
            <div className="container">
                <main className="main-content">
                    <h1>Home</h1>
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

export default HomePage;