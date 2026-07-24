import { useEffect, useState } from "react";
import API from "../api/axios";
import TaskCard from "./TaskCard";

function TaskList() {

  const [tasks, setTasks] = useState([]);

  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState("All");

  const [sort, setSort] = useState("newest");


  const fetchTasks = async () => {

    try {

      const res = await API.get("/");

      setTasks(res.data);

    } catch(error){

      console.log(error);

    }

  };


  useEffect(() => {

    fetchTasks();

  }, []);


  const filteredTasks = tasks

    .filter((task)=>{

      return task.title
      .toLowerCase()
      .includes(search.toLowerCase());

    })


    .filter((task)=>{

      if(filter==="All")
        return true;

      return task.status===filter;

    })


    .sort((a,b)=>{

      if(sort==="newest")
      {
        return new Date(b.createdAt)
        -
        new Date(a.createdAt);
      }

      else
      {
        return new Date(a.createdAt)
        -
        new Date(b.createdAt);
      }

    });



  return (

    <div className="task-list">


      <h2>All Tasks</h2>


      <input

        type="text"

        placeholder="Search tasks..."

        value={search}

        onChange={(e)=>setSearch(e.target.value)}

      />


      <select
        onChange={(e)=>setFilter(e.target.value)}
      >

        <option value="All">
          All
        </option>

        <option value="Pending">
          Pending
        </option>

        <option value="Completed">
          Completed
        </option>


      </select>



      <select
        onChange={(e)=>setSort(e.target.value)}
      >

        <option value="newest">
          Newest
        </option>


        <option value="oldest">
          Oldest
        </option>


      </select>



      {
        filteredTasks.length===0 ?

        (
          <p>
            No tasks available
          </p>
        )

        :

        filteredTasks.map((task)=>(

          <TaskCard

          key={task._id}

          task={task}

          />

        ))

      }


    </div>

  );

}


export default TaskList;