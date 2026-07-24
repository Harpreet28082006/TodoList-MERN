 import { useState } from "react";
import API from "../api/axios";
import { toast } from "react-toastify";

function TaskCard({ task }) {

  const [editMode, setEditMode] = useState(false);

  const [updatedTask, setUpdatedTask] = useState({
    title: task.title,
    description: task.description,
    priority: task.priority
  });


  const handleChange = (e) => {

    setUpdatedTask({
      ...updatedTask,
      [e.target.name]: e.target.value
    });

  };


  const updateTask = async () => {

    try {

      await API.put(`/${task._id}`, updatedTask);

      toast.success("Task updated successfully");

      window.location.reload();

    } catch(error) {

      toast.error("Update failed");

    }

  };

const deleteTask = async () => {

  const confirmDelete = window.confirm(
    "Are you sure you want to delete this task?"
  );


  if (!confirmDelete) {
    return;
  }


  try {

    await API.delete(`/${task._id}`);

    toast.success("Task deleted successfully");

    window.location.reload();

  } catch(error){

    toast.error("Delete failed");

  }

};

 


  const toggleStatus = async () => {

    await API.put(`/status/${task._id}`);

    toast.success("Status updated");

    window.location.reload();

  };


  return (

    <div className="task-card">


      {
        editMode ? (

          <>

          <input
            name="title"
            value={updatedTask.title}
            onChange={handleChange}
          />


          <textarea
            name="description"
            value={updatedTask.description}
            onChange={handleChange}
          />


          <select
            name="priority"
            value={updatedTask.priority}
            onChange={handleChange}
          >

            <option>Low</option>
            <option>Medium</option>
            <option>High</option>

          </select>


          <button onClick={updateTask}>
            Save
          </button>


          </>


        ) : (

          <>


          <h3>{task.title}</h3>

          <p>{task.description}</p>


          <p>
            Status:
            <b> {task.status}</b>
          </p>


          <p>
            Priority:
            <b> {task.priority}</b>
          </p>


          <small>
          {new Date(task.createdAt).toDateString()}
          </small>


          <div className="buttons">


          <button onClick={toggleStatus}>
            {
              task.status === "Pending"
              ? "Complete"
              : "Mark Pending"
            }
          </button>


          <button onClick={() => setEditMode(true)}>
            Edit
          </button>


          <button 
          onClick={deleteTask}
          className="delete">
            Delete
          </button>


          </div>


          </>

        )

      }


    </div>

  );

}


export default TaskCard;