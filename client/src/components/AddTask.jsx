import { useState } from "react";
import API from "../api/axios";
import { toast } from "react-toastify";

function AddTask() {

  const [task, setTask] = useState({
    title: "",
    description: "",
    priority: "Medium",
  });


  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!task.title.trim()) {
      toast.error("Task title is required");
      return;
    }

    try {

      await API.post("/", task);

      toast.success("Task added successfully");

      setTask({
        title: "",
        description: "",
        priority: "Medium",
      });

    } catch (error) {

      toast.error("Failed to add task");

    }

  };


  return (
    <div className="add-task">

      <h2>Add New Task</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="title"
          placeholder="Task title"
          value={task.title}
          onChange={handleChange}
        />


        <textarea
          name="description"
          placeholder="Task description"
          value={task.description}
          onChange={handleChange}
        />


        <select
          name="priority"
          value={task.priority}
          onChange={handleChange}
        >

          <option value="Low">
            Low
          </option>

          <option value="Medium">
            Medium
          </option>

          <option value="High">
            High
          </option>

        </select>


        <button type="submit">
          Add Task
        </button>


      </form>

    </div>
  );
}

export default AddTask;