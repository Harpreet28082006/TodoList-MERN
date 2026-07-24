import TaskList from "./components/TaskList";
import AddTask from "./components/AddTask";
import Stats from "./components/Stats";

function App() {
  return (
    <div className="app">

      <h1>📝 My Todo List</h1>

      <Stats />

      <AddTask />

      <TaskList />

    </div>
  );
}

export default App;