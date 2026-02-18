import React, { useEffect, useState } from "react";
import { getTodos } from "../api/todo.api";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";
import { CheckCircle2, Zap } from "lucide-react";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const { data } = await getTodos();
      setTodos(data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const completedCount = todos.filter(t => t.completed).length;
  const pendingCount = todos.length - completedCount;
  const completionPercentage = todos.length === 0 ? 0 : Math.round((completedCount / todos.length) * 100);

  return (
    <>
      <div className="form-section">
        <TodoForm refresh={fetchTodos} />
      </div>

      <div className="list-section">
        {todos.length > 0 && (
          <>
            <div className="stats-container">
              <div className="stat-card">
                <div className="stat-card-number">{todos.length}</div>
                <div className="stat-card-label">Total Tasks</div>
              </div>
              <div className="stat-card">
                <div className="stat-card-number">{completedCount}</div>
                <div className="stat-card-label">Completed</div>
              </div>
              <div className="stat-card">
                <div className="stat-card-number">{pendingCount}</div>
                <div className="stat-card-label">Pending</div>
              </div>
              <div className="stat-card">
                <div className="stat-card-number">{completionPercentage}%</div>
                <div className="stat-card-label">Progress</div>
              </div>
            </div>

            <div className="progress-bar">
              <div 
                className="progress-bar-fill" 
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
          </>
        )}

        {loading ? (
          <div style={{
            textAlign: 'center',
            padding: '40px',
            color: '#718096'
          }}>
            <Zap size={40} style={{
              color: '#667eea',
              marginBottom: '15px',
              animation: 'float 2s ease-in-out infinite'
            }} />
            <p style={{ fontSize: '16px' }}>Loading your awesome tasks...</p>
          </div>
        ) : todos.length === 0 ? (
          <div className="empty-state">
            <CheckCircle2 size={60} style={{ color: '#667eea' }} />
            <h2 style={{ color: '#1a202c', marginTop: '20px', fontSize: '24px', fontWeight: '600' }}>
              🎉 All Clear!
            </h2>
            <p style={{ marginTop: '10px', fontSize: '16px' }}>
              No tasks yet. Create one and start your productivity journey!
            </p>
          </div>
        ) : (
          <div>
            {todos.map((todo) => (
              <TodoItem key={todo._id} todo={todo} refresh={fetchTodos} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default TodoList;
