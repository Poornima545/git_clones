import axios from "axios";
import { useEffect, useState } from "react";
import Todo from "./Todo";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3000/todos").then((res) => setTodos(res.data));
  }, []);

  const handleChange = (e) => {
    // console.log(e.target.value);
    setInput(e.target.value);
  };

  const deleteTodo = (deleteTodo) => {
    const filterTodo = todos.filter((i) => i.deleteTodo !== deleteTodo);
    setTodos(filterTodo);
  };

  const editTodo = () => {
    setInput(input)
  };

  function handleTodoAdd() {
    axios
      .post("http://localhost:3000/todos", {
        title: input,
        completed: true,
      })
      .then(function (res) {
        console.log(res);
        setInput("");
      });
  }

  function handleDeleteClick() {
    axios
      .delete("http://localhost:3000/todos/2")
      .then((res) => setTodos(res.data));
  }

  function handleTodoSave() {
    axios
      .patch("http://localhost:3000/todos/1", {
        title: "John Doe",
      })
      .then((res) => console.log(res.data));
  }

  return (
    <>
      <h1>Todo-List</h1>
      {todos.map((todo) => {
        return (
          <div key={todo.id}>
            {todo.title}
            {todo.completed}
          </div>
        );
      })}
      <form>
        <input
          type="text"
          placeholder="Add a new task...."
          onChange={handleChange}
          value={input}
          className="input-type"
        />
        {input}
        <button className="add" onClick={handleTodoAdd}>
          add
        </button>
        <button onClick={handleTodoSave} className="save">
          {" "}
          Save
        </button>
        <button onClick={handleDeleteClick} className="delete">
          Delet
        </button>
      </form>
      <div className="todolist">
        {todos.map((todo) => (
          <Todo
            todo={todo}
            key={todo.id}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
          />
        ))}
      </div>
    </>
  );
}

export default TodoList;
