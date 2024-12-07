import React, { useState, useEffect } from 'react';
import textbookData from './TextbookData.js';
import NavBar from '../../components/NavBar.js';
import PhishingSimulationPage from '../../components/phishingSimulation/phishingEmails.js';
import PasswordStrengthTester from "../../components/PasswordStrengthTester/PasswordStrengthTester.js";
import axios from 'axios';


import './styles.css';

const Sidebar = ({ chapters, onSelectChapter, onSelectSubsection, selectedChapter, selectedSubsection, progress }) => {
    return (
        <aside className="sidebar">
            <div className="subscribe-box">
                <input type="email" placeholder="Enter your email" />
                <button>Subscribe</button>
                <p>Receive a weekly email containing the next unit.</p>
            </div>
            <div className="progress">
                <label>Your progress</label>
                <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${progress}%` }}></div>
                </div>
            </div>
            <nav className="course-navigation">
                <h3>Table of Contents</h3>
                <ul className="chapter-list">
                    {chapters.map((chapter, chapterIndex) => (
                        <li key={chapterIndex} className="chapter-item">
                            <a
                                onClick={() => onSelectChapter(chapterIndex)}
                                className={selectedChapter === chapterIndex ? 'selected' : ''}
                            >
                                {chapter.title}
                            </a>
                            {selectedChapter === chapterIndex && chapter.subsections && (
                                <ul className="subsection-list">
                                    {chapter.subsections.map((subsection, subsectionIndex) => (
                                        <li key={subsectionIndex} className="subsection-item">
                                            <a
                                                onClick={() => onSelectSubsection(subsectionIndex)}
                                                className={selectedSubsection === subsectionIndex ? 'selected' : ''}
                                            >
                                                {subsection.title}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
};

const ContentPage = () => {
    // Group all state declarations together
    const [selectedChapter, setSelectedChapter] = useState(0);
    const [selectedSubsection, setSelectedSubsection] = useState(null);
    const [progress, setProgress] = useState(0);
    const [userId, setUserId] = useState(localStorage.getItem('userId')); // Initialize from localStorage

    const currentChapter = textbookData.chapters[selectedChapter];
    const currentContent = selectedSubsection !== null
        ? currentChapter.subsections[selectedSubsection].content
        : currentChapter.content;


    useEffect(() => {
        // Get userId from localStorage or your auth system
        const storedUserId = localStorage.getItem('userId');
        if (storedUserId) {
            setUserId(storedUserId);
            // Update fetchProgress call to use storedUserId directly
            const fetchInitialProgress = async () => {
                try {
                    const response = await axios.get(`/api/users/progress/${storedUserId}`);
                    if (response.data.success) {
                        setProgress(response.data.progress);
                    }
                } catch (error) {
                    console.error('Error fetching progress:', error);
                }
            };
            fetchInitialProgress();
        }
    }, []);

    const fetchProgress = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('/progress', {
                headers: {
                    Authorization: token
                }
            });
            if (response.data.success) {
                setProgress(response.data.progress);
            }
        } catch (error) {
            console.error('Error fetching progress:', error);
        }
    };

    const updateUserProgress = async (type, score) => {
        try {
            const payload = {
                userId,
                ...(type === 'chapter'
                    ? { chapterIndex: selectedChapter, subsectionIndex: selectedSubsection }
                    : { activityType: type, score })
            };

            const response = await axios.post('/api/users/progress', payload);
            console.log(response)
            if (response.data.success) {
                setProgress(response.data.progress);
                console.log(response)
            }
        } catch (error) {
            console.error('Error updating progress:', error);
        }
    };

    return (
        <>
            <NavBar />
            <div className="container">
                <Sidebar
                    chapters={textbookData.chapters}
                    onSelectChapter={(index) => {
                        setSelectedChapter(index);
                        setSelectedSubsection(null);
                    }}
                    onSelectSubsection={setSelectedSubsection}
                    selectedChapter={selectedChapter}
                    selectedSubsection={selectedSubsection}
                    progress={progress}  // Add this prop
                />
                <main className="main-content">
                    <h2>{textbookData.title}</h2>
                    <h3>by {textbookData.author}</h3>
                    <div className="chapter">
                        <h3>{currentChapter.title}</h3>
                        {selectedSubsection !== null && (
                            <h4>{currentChapter.subsections[selectedSubsection].title}</h4>
                        )}
                        <p dangerouslySetInnerHTML={{ __html: currentContent }} />
                        {currentContent.bulletPoints && (
                            <ul className="bullet-points">
                                {currentContent.bulletPoints.map((bulletPoint, index) => (
                                    <li key={index}>{bulletPoint}</li>
                                ))}
                            </ul>
                        )}
                        {/* Add the Phishing Simulation for Chapter 2.1 */}
                        {selectedChapter === 1 && selectedSubsection === 0 && (
                            <PhishingSimulationPage
                                onComplete={(score) => updateUserProgress('phishingSimulation', score)}
                            />
                        )}
                        {selectedChapter === 2 && selectedSubsection === 0 && (
                            <PasswordStrengthTester
                                onComplete={(score) => updateUserProgress('passwordTester', score)}
                            />
                        )}

                        {selectedSubsection === null && (
                            <div className="image-box">
                                <img
                                    src="https://engineering.tufts.edu/sites/g/files/lrezom421/files/styles/embedded_large/public/Programs_Dept-ComputerScience_lrg_0.jpg?itok=nKHOb7F2"
                                    alt="Chemistry illustration"
                                />
                                <p>Computer Security!</p>
                            </div>
                        )}
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
};

export default ContentPage;

