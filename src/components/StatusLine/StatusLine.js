import React from 'react'
import Task from '../Task/Task';

import './StatusLine.scss'

function StatusLine(props) {
const {
  status,
  tasks,
  addEmptyTask,
  addTask,
  deleteTask,
  moveTask
} = props;
let taskList, tasksForStatus;
const handleEmpty = () => {
  addEmptyTask(status);
}

if(tasks){
  tasksForStatus = tasks.filter( task => task.status === status)
}

if(tasksForStatus){
  taskList = tasksForStatus.map(task => {
    return (
      <Task 
        addTask={ (task) => addTask(task)}
        deleteTask={(id) => deleteTask(id)}
        moveTask={(id, status) => moveTask(id, status)}
        key={task.id}
        task={task}
      />
    )
  })
}
  return (
    <div className="StatusLine">
      <h3>{status}</h3>
      {taskList}
      <button onClick={handleEmpty}className="button addTask">+</button>
    </div>
  )
}

export default StatusLine
