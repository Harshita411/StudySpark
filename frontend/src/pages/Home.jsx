import React from 'react';
import "../styles/components.css";




const Home = () => {
  return (
    <div className="home-page">
      <div className="home-header">
        <h1 className="home-title">Welcome to StudySpark  🚀
</h1>
        <p className="home-tagline">Your AI-powered companion for smarter, stress-free studying.</p>
      </div>


      <section className="home-section">
        <h2>About the Project</h2>
        <p>
          <strong>StudySpark</strong> is a modern, AI-driven study assistant designed to help students
          organize and master their learning materials. By combining natural language processing with
          generative AI, it transforms your notes into actionable study aids — summaries, quizzes,
          and flashcards — all in one intuitive platform.
        </p>
        <p>
          Whether you’re preparing for exams, revising topics, or just trying to make sense of lengthy
          PDFs, StudySpark saves time and helps you retain information efficiently.
        </p>
      </section>


      <section className="home-section">
        <h2>Core Features</h2>
        <ul className="feature-list">
          <li><strong>🧠 Smart Summaries:</strong> Upload your study material and get AI-generated summaries.</li>
          <li><strong>🎯 Quiz Generation:</strong> Create quizzes automatically from your notes to test understanding.</li>
          <li><strong>📇 Flashcards:</strong> Convert key terms and facts into flashcards for quick review.</li>
         
        </ul>
      </section>


     
      <footer className="home-footer">
        <p>© {new Date().getFullYear()} StudySpark — Developed for smarter learning.</p>
      </footer>
    </div>
  );
};


export default Home;