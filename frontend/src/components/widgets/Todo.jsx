import React, { useState, useEffect } from "react";
import axios from "axios";

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("UNCOMPLETED");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:4000/todo/all")
      .then((res) => {
        console.log(res.data);
        setTodos(res.data);
      })
      .catch((err) => console.error("Erreur lors du chargement :", err));
  }, []);

  const addTodo = () => {
    if (!name || !description) {
      alert("Fill in all fields !");
      return;
    }

    axios
      .post("http://localhost:4000/todo/create", { name, description, status })
      .then((res) => {
        setTodos([...todos, res.data]);
        setName("");
        setDescription("");
        setStatus("UNCOMPLETED");
      })
      .catch((err) => console.error("Error on add :", err));
  };

  const deleteTodo = (id) => {
    axios
      .delete(`http://localhost:4000/todo/${id}`)
      .then(() => {
        setTodos(todos.filter((t) => t.id !== id));
      })
      .catch((err) => console.error("Erreur de suppression :", err));
  };

  const preEdit = (todo) => {
    setEditId(todo.id);
    setName(todo.name);
    setDescription(todo.description);
    setStatus(todo.status);
  };

  const updateTodo = () => {
    axios
      .put(`http://localhost:4000/todo/${editId}`, { name, description, status })
      .then((res) => {
        setTodos(todos.map((t) => (t.id === editId ? res.data : t)));
        setEditId(null);
        setName("");
        setDescription("");
        setStatus("UNCOMPLETED");
      })
      .catch((err) => console.error("Erreur de mise à jour :", err));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">To-Do List</h1>

      <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-md mb-6">
        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="UNCOMPLETED">Not finished</option>
            <option value="INPROGRESS">In progress</option>
            <option value="COMPLETED">Finished</option>
          </select>

          {editId ? (
            <button
              onClick={updateTodo}
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 rounded transition"
            >
              Update
            </button>
          ) : (
            <button
              onClick={addTodo}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded transition"
            >
              Add
            </button>
          )}
        </div>
      </div>

      <ul className="w-full max-w-md space-y-3">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="bg-white p-4 rounded-lg shadow flex flex-col sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <h2 className="font-semibold text-lg text-gray-800">{todo.name}</h2>
              <p className="text-gray-600">{todo.description}</p>
              <p
                className={`text-sm mt-1 ${
                  todo.status === "COMPLETED"
                    ? "text-green-600"
                    : todo.status === "INPROGRESS"
                    ? "text-yellow-600"
                    : "text-red-500"
                }`}
              >
                {todo.status === "COMPLETED"
                  ? "Finished"
                  : todo.status === "INPROGRESS"
                  ? "In progress"
                  : "Not finished"}
              </p>
            </div>

            <div className="flex gap-2 mt-3 sm:mt-0">
              <button
                onClick={() => preEdit(todo)}
                className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Update
              </button>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todo;
