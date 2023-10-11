function Todo({ todo, deleteTodo, editTodo }) {
  return (
    <div className="todo">
      <p>{todo["title"]}</p>
      <button onClick={() => editTodo(todo)}>Edit</button>
      <button onClick={() => deleteTodo(todo.id)}>Delete</button>
    </div>
  );
}

export default Todo;
