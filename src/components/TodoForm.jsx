import React, { useState } from "react";
import { createTodo } from "../api/todo.api";
import { PlusCircle, Sparkles } from "lucide-react";

const TodoForm = ({ refresh }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsLoading(true);
    try {
      await createTodo({ title, description });
      setTitle("");
      setDescription("");
      refresh();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{
      background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.05), rgba(240, 147, 251, 0.05))',
      padding: '28px',
      borderRadius: '16px',
      marginBottom: '30px',
      border: '2px solid rgba(102, 126, 234, 0.1)',
      transition: 'all 0.3s ease'
    }}>
      <div style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Sparkles size={18} style={{ color: '#667eea' }} />
        <label style={{ fontSize: '14px', fontWeight: '600', color: '#1a202c' }}>Create New Task</label>
      </div>
      <input
        placeholder="✨ What's your next task?"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        disabled={isLoading}
      />
      <textarea
        placeholder="📝 Add more details (optional)..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        disabled={isLoading}
      />
      <button className="btn-primary" type="submit" disabled={isLoading} style={{
        width: '100%',
        justifyContent: 'center',
        opacity: isLoading ? 0.7 : 1
      }}>
        <PlusCircle size={18} />
        {isLoading ? 'Adding...' : 'Add Task'}
      </button>
    </form>
  );
};

export default TodoForm;
