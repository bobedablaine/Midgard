import React, { useState } from 'react';
import textbookData from './TextbookData.js';
import NavBar from '../../components/NavBar.js';
import './styles.css';

const Sidebar = ({ chapters, onSelectChapter, onSelectSubsection, selectedChapter, selectedSubsection }) => {
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
                    <div className="progress-fill" style={{ width: '60%' }}></div>
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
    const [selectedChapter, setSelectedChapter] = useState(0);
    const [selectedSubsection, setSelectedSubsection] = useState(null);

    const currentChapter = textbookData.chapters[selectedChapter];
    const currentContent = selectedSubsection !== null ? currentChapter.subsections[selectedSubsection].content : currentChapter.content;

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
                />
                <main className="main-content">
                    <h2>{textbookData.title}</h2>
                    <h3>by {textbookData.author}</h3>
                    <div className="chapter">
                        <h3>{currentChapter.title}</h3>
                        {selectedSubsection !== null && <h4>{currentChapter.subsections[selectedSubsection].title}</h4>}
                        <p>{currentContent}</p>
                        {currentContent.bulletPoints && (
                            <ul>
                                {currentContent.bulletPoints.map((bulletPoint, index) => (
                                    <li key={index}>{bulletPoint}</li>
                                ))}
                            </ul>
                        )}
                        {currentContent.extraContent && <p>{currentContent.extraContent}</p>}
                        {selectedSubsection === null && (
                            <div className="image-box">
                                <img src="https://engineering.tufts.edu/sites/g/files/lrezom421/files/styles/embedded_large/public/Programs_Dept-ComputerScience_lrg_0.jpg?itok=nKHOb7F2" alt="Chemistry illustration" />
                                <p>Yay computer science :D .</p>
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