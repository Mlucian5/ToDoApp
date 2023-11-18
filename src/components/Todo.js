import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

export const Todo = ({task, deleteTodo, editTodo, toggleComplete}) => {

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [todoIdToDelete, setTodoIdToDelete] = useState(null);

  const handleDeleteClick = (id) => {
    setTodoIdToDelete(id);
    setShowConfirmation(true);
  };

  const handleDeleteConfirmed = () => {
    deleteTodo(todoIdToDelete);
  };
  
  const handleCancelDelete = () => {
    setShowConfirmation(false);
  };


  return (
    <div className="Todo">
        <p className={`${task.completed ? "completed" : "incompleted"}`} onClick={() => toggleComplete(task.id)}>{task.task}</p>
        <div>
        <FontAwesomeIcon className="edit-icon" icon={faPenToSquare} onClick={() => editTodo(task.id)} />
        <FontAwesomeIcon className="delete-icon" icon={faTrash} onClick={() => handleDeleteClick(task.id)} />
        </div>
        {showConfirmation && (
        <div className="modal"
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'green',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
            zIndex: 1000,
            textAlign: 'center',
          }}
        >
          <p>Are you sure you want to perform this action?</p>
          <button 
            style={{
            backgroundColor: '#e74c3c',
            color: '#fff',
            padding: '6px 13px',
            borderRadius: '4px',
            cursor: 'pointer',
            marginRight: '10px',
            border: 'none',
          }}
           onClick={handleDeleteConfirmed}>Yes</button>
          <button
            style={{
              backgroundColor: '#e74c3c',
              color: '#fff',
              padding: '6px 13px',
              borderRadius: '4px',
              cursor: 'pointer',
              marginRight: '10px',
              border: 'none',
            }}
           onClick={handleCancelDelete}>No</button>
        </div>
      )}
    </div>
  )
}
