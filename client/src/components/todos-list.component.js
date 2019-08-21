import React, { Component, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Todo(props) {
  return (
    <tr>
      <td className={props.todo.todo_completed ? "completed" : ""}>
        {props.todo.todo_description}
      </td>
      <td className={props.todo.todo_completed ? "completed" : ""}>
        {props.todo.todo_responsible}
      </td>
      <td className={props.todo.todo_completed ? "completed" : ""}>
        {props.todo.todo_priority}
      </td>
      <td>
        <Link to={"/edit/" + props.todo._id}>Edit</Link>
      </td>
    </tr>
  );
}

function TodosList() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    let mounted = true;
    axios
      .get("http://localhost:4000/todos/")
      .then(response => {
        if (mounted) {
          setTodos(response.data);
        }
      })
      .catch(function(error) {
        console.log(error);
      });
    return function() {
      mounted = false;
    };
  }, []);

  function todoList() {
    return todos.map((currentTodo, i) => {
      return <Todo todo={currentTodo} key={i} />;
    });
  }
  return (
    <div>
      <h3>Todos List</h3>
      <table className="table table-striped" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>Description</th>
            <th>Responsible</th>
            <th>Priority</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{todoList()}</tbody>
      </table>
    </div>
  );
}

export default TodosList;
