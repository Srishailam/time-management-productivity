import './App.css';
import StatusLine from './components/StatusLine/StatusLine';
import { useState, useEffect } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() =>{
    loadTasksFromLocalStorage();
  },[]);

  const addEmptyTask = (status) =>{
    const lastTask = tasks[tasks.length -1];
    let newTaskId = 1;

    if (lastTask !==undefined){
      newTaskId = lastTask.id +1;
    }
    setTasks( tasks => {
      return [...tasks, {
        id: newTaskId,
        title: "",
        description:"",
        priority:"",
        status: status
      }]
    })
  }

  const addTask = (taskToAdd) => {
    let filteredTasks = tasks.filter( task => {
      return task.id !== taskToAdd.id;
    })
    let newTaskList = [...filteredTasks, taskToAdd];
    setTasks(newTaskList);
    saveTasksToLocalStorage(newTaskList);
  }

  const deleteTask = (taskId) => {
    let filteredTasks = tasks.filter(task => task.id !== taskId);
    setTasks(filteredTasks);
    saveTasksToLocalStorage(filteredTasks);
  }
  const moveTask = (taskIdMove, newStatus) => {
    let task = tasks.filter(task => task.id === taskIdMove);
    let filteredTasks = tasks.filter(task => task.id !==taskIdMove);

    task.status = newStatus;
    let newTaskList = [...filteredTasks, task];
    setTasks(newTaskList);
    saveTasksToLocalStorage(newTaskList);
  }

  const saveTasksToLocalStorage = (tasks) => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  const loadTasksFromLocalStorage = () => {
    let loadedTasks = localStorage.getItem('tasks');
     let tasks =  JSON.parse(loadedTasks);

     if (tasks){
       setTasks(tasks)
     }
  }

  return (
    <div className="App">
      <h1>Task Management</h1>
      <main>
        <section>
          <StatusLine 
            tasks={tasks}
            addEmptyTask={addEmptyTask}
            addTask={addTask}
            deleteTask={deleteTask}
            moveTask={moveTask}
            status="Backlog"
          />
          <StatusLine 
            tasks={tasks}
            addEmptyTask={addEmptyTask}
            addTask={addTask}
            deleteTask={deleteTask}
            moveTask={moveTask}
            status="In Progress"
          />
          <StatusLine 
            tasks={tasks}
            addEmptyTask={addEmptyTask}
            addTask={addTask}
            deleteTask={deleteTask}
            moveTask={moveTask}
            status="Done"
          />
        </section>
      </main>
    </div>
  );
}

export default App;
