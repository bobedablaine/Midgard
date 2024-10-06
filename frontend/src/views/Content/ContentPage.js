import React, { useState } from 'react';
import textbookData from './TextbookData.js';


const Sidebar = ({ chapters, onSelect, selectedChapter }) => {
    return (
      <div style={styles.sidebar}>
        <h3>Table of Contents</h3>
        <ul style={styles.sidebarList}>
          {chapters.map((chapter, index) => (
            <li
              key={index}
              style={{
                ...styles.sidebarItem,
                fontWeight: selectedChapter === index ? 'bold' : 'normal',
                cursor: 'pointer',
              }}
              onClick={() => onSelect(index)}
            >
              {chapter.title}
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  const ContentPage = () => {
    const [selectedChapter, setSelectedChapter] = useState(0);
  
    return (
      <div style={styles.container}>
        <Sidebar 
          chapters={textbookData.chapters} 
          onSelect={setSelectedChapter} 
          selectedChapter={selectedChapter}
        />
        <div style={styles.content}>
          <h1>{textbookData.title}</h1>
          <h2>by {textbookData.author}</h2>
          <div style={styles.chapter}>
            <h3>{textbookData.chapters[selectedChapter].title}</h3>
            <p>{textbookData.chapters[selectedChapter].summary}</p>
            <p>{textbookData.chapters[selectedChapter].content}</p>
          </div>
        </div>
      </div>
    );
  };
  
  const styles = {
    container: {
      display: 'flex',
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
    },
    sidebar: {
      width: '200px',
      borderRight: '1px solid #ccc',
      padding: '10px',
    },
    sidebarList: {
      listStyleType: 'none',
      padding: 0,
    },
    sidebarItem: {
      marginBottom: '10px',
    },
    content: {
      flex: 1,
      paddingLeft: '20px',
    },
    chapter: {
      marginTop: '20px',
    },
  };
  
  export default ContentPage;