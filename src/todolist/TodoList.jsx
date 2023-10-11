import axios from "axios";
import { useEffect, useState } from "react";
import Todo from "./Todo";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [itemInEdit, setItemInEdit] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    getTodos();
  }, []);

  function getTodos() {
    axios.get("http://localhost:3000/todos").then((res) => setTodos(res.data));
  }
  const handleChange = (e) => {
    // console.log(e.target.value);
    setInput(e.target.value);
  };

  const deleteTodo = (id) => {
    // const filterTodo = todos.filter((i) => i.deleteTodo !== id);
    axios.delete(`http://localhost:3000/todos/${id}`).then((res) => {
      console.log(res);
      getTodos();
    });
  };

  const editTodo = (todo) => {
    setIsEditing(true);
    setItemInEdit(todo);
    setInput(todo.title);
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
        getTodos();
      });
  }

  // function handleDeleteClick() {
  //   axios
  //     .delete("http://localhost:3000/todos/2")
  //     .then((res) => setTodos(res.data));
  // }

  function handleTodoSave() {
    axios
      .patch(`http://localhost:3000/todos/${itemInEdit.id}`, {
        title: input,
      })
      .then((res) => {
        console.log(res.data);
        setItemInEdit("");
        setInput("");
        setIsEditing(false);
        getTodos();
      });
  }

  return (
    <>
      <h1>Todo-List</h1>
      <hr />

      <div className="todolist">
        <form>
          <input
            type="text"
            placeholder="Add a new task...."
            onChange={handleChange}
            value={input}
            className="input-type"
          />
          {!isEditing && (
            <button type="button" className="add" onClick={handleTodoAdd}>
              add
            </button>
          )}
          {isEditing && (
            <>
              <button type="button" onClick={handleTodoSave} className="save">
                Save
              </button>
              <button type="button">Cancel</button>
            </>
          )}
        </form>
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
