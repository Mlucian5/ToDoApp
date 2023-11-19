import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

export const Todo = ({ task, editTodo, toggleComplete, handleDeleteClick, handleEditClick }) => {

  return (
    <div className="Todo">
      <p className={`${task.completed ? "completed" : "incompleted"}`} onClick={() => toggleComplete(task.id)}>{task.task}</p>
      <div>
        <FontAwesomeIcon className="edit-icon" icon={faPenToSquare} onClick={() => handleEditClick(task.id, task)} />
        <FontAwesomeIcon className="delete-icon" icon={faTrash} onClick={() => handleDeleteClick(task.id)} />
      </div>
    </div>
  )
}
