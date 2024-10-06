// src/App.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import './index.css';


const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({ title: "", description: "",date:"" });
  const [editTodo, setEditTodo] = useState(null);

  // Fetch all todos
  const fetchTodos = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/todos");
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching todos", error);
    }
  };

  // Create a new todo
  const createTodo = async () => {
    try {
      const response = await axios.post("http://localhost:8080/api/todos", newTodo);
      setTodos([...todos, response.data]);
      setNewTodo({ title: "", description: "",date:"" });
    } catch (error) {
      console.error("Error creating todo", error);
    }
  };

  // Update an existing todo
  const updateTodo = async (id) => {
    try {
      const response = await axios.put(`http://localhost:8080/api/todos/${id}`, editTodo);
      setTodos(todos.map((todo) => (todo.id === id ? response.data : todo)));
      setEditTodo(null);
    } catch (error) {
      console.error("Error updating todo", error);
    }
  };

  // Delete a todo
  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/todos/${id}`);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error deleting todo", error);
    }
  };

  // Mark todo as complete
  const markComplete = async (id) => {
    try {
      const response = await axios.put(`http://localhost:8080/api/todos/${id}/complete`);
      setTodos(todos.map((todo) => (todo.id === id ? response.data : todo)));
    } catch (error) {
      console.error("Error marking todo complete", error);
    }
  };

  // Mark todo as incomplete
  const markIncomplete = async (id) => {
    try {
      const response = await axios.put(`http://localhost:8080/api/todos/${id}/incomplete`);
      setTodos(todos.map((todo) => (todo.id === id ? response.data : todo)));
    } catch (error) {
      console.error("Error marking todo incomplete", error);
    }
  };

  // Fetch todos on component mount
  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">Todo App</h1>

      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Create New Todo</h2>
        <input
          type="text"
          placeholder="Title"
          value={newTodo.title}
          onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
          className="w-full px-4 py-2 mb-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Description"
          value={newTodo.description}
          onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
          className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Date"
          value={newTodo.date}
          onChange={(e) => setNewTodo({ ...newTodo, date: e.target.value })}
          className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={createTodo}
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Create Todo
        </button>
      </div>

      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Today's work</h2>
        <div className="space-y-4">
          {todos.map((todo) => (
            <div key={todo.id} className="bg-white p-6 rounded-lg shadow-lg">
              {editTodo && editTodo.id === todo.id ? (
                <div>
                  <input
                    type="text"
                    value={editTodo.title}
                    onChange={(e) => setEditTodo({ ...editTodo, title: e.target.value })}
                    className="w-full px-4 py-2 mb-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    value={editTodo.description}
                    onChange={(e) => setEditTodo({ ...editTodo, description: e.target.value })}
                    className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    value={editTodo.date}
                    onChange={(e) => setEditTodo({ ...editTodo, date: e.target.value })}
                    className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  
                  <button
                    onClick={() => updateTodo(todo.id)}
                    className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-300"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">{todo.title}</h3>
                  <p className="text-gray-600 mb-2">{todo.description}</p>
                  <p className="text-gray-600 mb-2">{todo.date}</p>
                  <p className="text-sm text-gray-500 mb-4">Status: {todo.completed ? "Completed" : "Incomplete"}</p>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => markComplete(todo.id)}
                      className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300"
                    >
                      Mark Complete
                    </button>
                    <button
                      onClick={() => markIncomplete(todo.id)}
                      className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition duration-300"
                    >
                      Mark Incomplete
                    </button>
                    <button
                      onClick={() => deleteTodo(todo.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => setEditTodo(todo)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
