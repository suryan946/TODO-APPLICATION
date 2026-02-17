import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:8080/api/todos";

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");

  const fetchTodos = async () => {
    const res = await axios.get(API);
    setTodos(res.data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async () => {
    if (!title) return;
    await axios.post(API, {
      title: title,
      description: "",
      completed: false,
    });
    setTitle("");
    fetchTodos();
  };

  const toggleTodo = async (todo) => {
    await axios.put(`${API}/${todo.id}`, {
      ...todo,
      completed: !todo.completed,
    });
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await axios.delete(`${API}/${id}`);
    fetchTodos();
  };

  const startEdit = (todo) => {
    setEditId(todo.id);
    setEditTitle(todo.title);
  };

  const saveEdit = async (todo) => {
    await axios.put(`${API}/${todo.id}`, {
      ...todo,
      title: editTitle,
    });
    setEditId(null);
    setEditTitle("");
    fetchTodos();
  };

 return (
  <div
    style={{
      minHeight: "100vh",
      backgroundColor: "#f0f2f5",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <div
      style={{
        background: "#ffffff",
        padding: "30px",
        borderRadius: "12px",
        width: "420px",
        boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Todo Application
      </h2>

      <div style={{ display: "flex", marginBottom: "20px" }}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter todo"
          style={{
            flex: 1,
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            outline: "none",
          }}
        />
        <button
          onClick={addTodo}
          style={{
            marginLeft: "8px",
            padding: "10px 14px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Add
        </button>
      </div>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {todos.map((todo) => (
          <li
            key={todo.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "10px",
              marginBottom: "10px",
              backgroundColor: "#f9f9f9",
              borderRadius: "6px",
            }}
          >
            {editId === todo.id ? (
              <>
                <input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  style={{
                    flex: 1,
                    padding: "6px",
                    marginRight: "6px",
                    borderRadius: "4px",
                    border: "1px solid #ccc",
                  }}
                />
                <button
                  onClick={() => saveEdit(todo)}
                  style={{
                    padding: "6px 10px",
                    backgroundColor: "green",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <span
                  onClick={() => toggleTodo(todo)}
                  style={{
                    flex: 1,
                    cursor: "pointer",
                    textDecoration: todo.completed
                      ? "line-through"
                      : "none",
                    color: todo.completed ? "gray" : "black",
                  }}
                >
                  {todo.title}
                </span>

                <button
                  onClick={() => startEdit(todo)}
                  style={{
                    marginRight: "6px",
                    padding: "6px 10px",
                    backgroundColor: "#ffc107",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Edit
                </button>
              </>
            )}

            <button
              onClick={() => deleteTodo(todo.id)}
              style={{
                padding: "6px 10px",
                backgroundColor: "#dc3545",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

}

export default App;
