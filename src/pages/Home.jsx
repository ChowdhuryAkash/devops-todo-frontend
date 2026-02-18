import React from "react";
import TodoList from "../components/TodoList";
import { CheckCircle2, Zap } from "lucide-react";
import "../styles/global.css";

const Home = () => {
  return (
    <div className="container">
      <div className="header">
        <div>
          <h1>
            <CheckCircle2 size={32} />
            TaskMaster Pro
          </h1>
          <p style={{ 
            margin: '8px 0 0 0', 
            fontSize: '13px', 
            color: '#718096',
            fontWeight: '500',
            letterSpacing: '0.5px',
            lineHeight: '1.6'
          }}>
            Fullstack Todo Demo App • <span style={{
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontWeight: '700',
              marginRight: '2px'
            }}>DevOps</span> Industry Grade Project Implementation
          </p>
        </div>
        <div className="stats">
          <Zap size={14} style={{ display: 'inline', marginRight: 5 }} />
          Productivity Dashboard
        </div>
      </div>
      <div className="main-content">
        <TodoList />
      </div>
    </div>
  );
};

export default Home;
