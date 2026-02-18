import React, { useState } from "react";
import { updateTodo, deleteTodo } from "../api/todo.api";
import { Check, Trash2, RotateCcw, AlertCircle } from "lucide-react";

const TodoItem = ({ todo, refresh }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const toggleComplete = async () => {
    try {
      await updateTodo(todo._id, { completed: !todo.completed });
      refresh();
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const remove = async () => {
    if (!showDeleteConfirm) {
      setShowDeleteConfirm(true);
      return;
    }

    try {
      setIsDeleting(true);
      await deleteTodo(todo._id);
      refresh();
    } catch (error) {
      console.error('Error deleting todo:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <div className="todo-content">
        <h3 className={todo.completed ? "completed" : ""}>
          {todo.completed ? '✅' : '📌'} {todo.title}
        </h3>
        {todo.description && <p>{todo.description}</p>}
        <span className={`badge ${todo.completed ? "" : "pending"}`}>
          {todo.completed ? "✓ Completed" : "⏳ Pending"}
        </span>
      </div>

      <div className="task-buttons">
        <button 
          className="btn-success" 
          onClick={toggleComplete}
          title={todo.completed ? "Mark as pending" : "Mark as completed"}
        >
          {todo.completed ? <RotateCcw size={16}/> : <Check size={16}/>}
        </button>

        <button 
          className="btn-danger" 
          onClick={remove}
          disabled={isDeleting}
          title="Delete task"
          style={{
            background: showDeleteConfirm 
              ? 'linear-gradient(135deg, #ff6b6b, #ee5a6f)' 
              : 'linear-gradient(135deg, #f093fb, #f5576c)',
            opacity: isDeleting ? 0.7 : 1,
            transition: 'all 0.2s ease'
          }}
        >
          {showDeleteConfirm ? <AlertCircle size={16}/> : <Trash2 size={16}/>}
        </button>

        {showDeleteConfirm && (
          <button
            style={{
              background: '#cbd5e0',
              color: '#1a202c',
              padding: '8px 16px',
              fontSize: '12px',
              marginRight: '0'
            }}
            onClick={() => setShowDeleteConfirm(false)}
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
};

export default TodoItem;
