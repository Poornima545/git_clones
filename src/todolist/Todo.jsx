function Todo({ todo, deleteTodo, editTodo}) {
  return (
    <div className="todo">
      <h3>{todo["title"]}</h3>
      <div className="update">
      <button onClick={() => editTodo(todo.id)} className="edit-todo">Edit</button>
      <button onClick={() => deleteTodo(todo.id)} className="delete-todo">Delete</button>
      </div>
    </div>
  );
}

export default Todo;
