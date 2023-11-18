import React, { useState, useEffect } from "react";
import { Todo } from "./Todo";
import { TodoForm } from "./TodoForm";
import { v4 as uuidv4 } from "uuid";
import { EditTodoForm } from "./EditTodoForm";

export const TodoWrapper = () => {
  const [todos, setTodos] = useState([]);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarTimeout, setSnackbarTimeout] = useState(null);
  const [showDone, setShowDone] = useState(false);
  const [showNotDone, setShowNotDone] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [todoIdToDelete, setTodoIdToDelete] = useState(null);
  const [isBulkDeletion, setBulkDeletion] = useState(false);

  const filteredTodos = todos.filter(todo => {
    if (showDone && showNotDone) {
      return true; // Show all todos
    } else if (showDone) {
      return todo.completed;
    } else if (showNotDone) {
      return !todo.completed;
    }
    return true;
  });

  const addTodo = (todo) => {
    setTodos([
      ...todos,
      { id: uuidv4(), task: todo, completed: false, isEditing: false },
    ]);
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
    notifyDeletionSucess();
  };

  const deleteToDoBulk = () => {
    setTodos(todos.filter((todo) => !todo.completed));
    notifyDeletionSucess();
  }

  const notifyDeletionSucess = () => {
    setShowSnackbar(true);

    // Clear the existing timeout if there is one
    clearTimeout(snackbarTimeout);

    // Set a new timeout for hiding the snackbar after 3000 milliseconds
    const timeout = setTimeout(() => {
      setShowSnackbar(false);
    }, 3000);

    // Save the timeout ID for cleanup
    setSnackbarTimeout(timeout);
  }

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  const editTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  }

  const editTask = (task, id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo
      )
    );
  };

  const handleToggleShowDone = () => {
    setShowDone(!showDone);
    setShowNotDone(false);
  };

  const handleToggleShowNotDone = () => {
    setShowNotDone(!showNotDone);
    setShowDone(false);
  };


  const handleDeleteClick = (id) => {
    setTodoIdToDelete(id);
    setShowConfirmation(true);
  };

  const handleDeleteConfirmed = () => {
    console.log('isBulkDeletion', isBulkDeletion);
    if (isBulkDeletion) {
      deleteToDoBulk();
    } else {
      deleteTodo(todoIdToDelete);
    }
    setShowConfirmation(false);
  };

  const handleCancelDelete = () => {
    setShowConfirmation(false);
  };

  const handleDeleteDone = () => {
    setBulkDeletion(true);
    setShowConfirmation(true);
  };

  // Clear the Snackbar timeout if the component unmounts
  useEffect(() => {
    return () => {
      clearTimeout(snackbarTimeout);
      setBulkDeletion(false);
    };
  }, [snackbarTimeout]);

  return (
    <div className="TodoWrapper">
      <h1>Get Things Done !</h1>
      <TodoForm addTodo={addTodo} />
      {/* display todos */}
      {filteredTodos.map((todo) =>
        todo.isEditing ? (
          <EditTodoForm editTodo={editTask} task={todo} />
        ) : (
          <Todo
            key={todo.id}
            task={todo}
            editTodo={editTodo}
            toggleComplete={toggleComplete}
            handleDeleteClick={handleDeleteClick}
          />
        )
      )}

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


      {showSnackbar && (
        <div className="snackbar"
          style={{
            display: 'inline-block',
            padding: '10px 20px',
            backgroundColor: '#4caf50',
            color: '#fff',
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            borderRadius: '4px',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)'
          }}
        >
          Element deleted successfully!
        </div>
      )}
      <button
        style={{
          backgroundColor: 'green',
          color: '#fff',
          padding: '6px 13px',
          borderRadius: '4px',
          cursor: 'pointer',
          marginRight: '10px',
          border: 'none',
        }}
        onClick={handleToggleShowDone}>
        {showDone ? 'Show All' : 'Show Done Only'}
      </button>
      <button
        style={{
          backgroundColor: 'purple',
          color: '#fff',
          padding: '6px 13px',
          borderRadius: '4px',
          cursor: 'pointer',
          marginRight: '10px',
          border: 'none',
        }}
        onClick={handleToggleShowNotDone}>
        {showNotDone ? 'Show All' : 'Show Not Done Only'}
      </button>

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
        onClick={handleDeleteDone}
      >
        Delete Done
      </button>
    </div>
  );
};
