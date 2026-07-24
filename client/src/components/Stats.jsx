import { useEffect, useState } from "react";
import API from "../api/axios";

function Stats() {

  const [stats, setStats] = useState({
    totalTasks: 0,
    pendingTasks: 0,
    completedTasks: 0
  });


  const getStats = async () => {

    try {

      const res = await API.get("/stats");

      setStats(res.data);

    } catch(error) {

      console.log(error);

    }

  };


  useEffect(() => {

    getStats();

  }, []);


  return (

    <div className="stats">


      <div className="stat-card">
        <h3>Total</h3>
        <p>{stats.totalTasks}</p>
      </div>


      <div className="stat-card">
        <h3>Pending</h3>
        <p>{stats.pendingTasks}</p>
      </div>


      <div className="stat-card">
        <h3>Completed</h3>
        <p>{stats.completedTasks}</p>
      </div>


    </div>

  );
}


export default Stats;