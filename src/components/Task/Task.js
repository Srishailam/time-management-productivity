import React, { useState } from 'react'
import './Task.scss'

function Task(props) {
  const {
    addTask,
    deleteTask,
    moveTask,
    task
  }  = props;
  const [priority, setPriority] = useState(task.priority);
  const [collapsed, setCollapsed] = useState(task.isCollapsed);
  const [formAction, setFormAction] = useState('');

  const handlePriority = (e) => {
    setPriority(e.target.attributes.priority.value)
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formAction === "save"){
      if(collapsed){
        setCollapsed(false);
      } else{

        let newTask = {
          id: task.id,
          title: e.target.elements.title.value,
          discription: e.target.elements.description.value,
          priority: priority,
          status: task.status,
          isCollapsed: true
        }
        addTask(newTask);
        setCollapsed(true)
      }
    }
    if (formAction ==="delete"){
      deleteTask(task.id)
    }
  }
  const handleMoveLeft = () => {
    let newStatus ="";
    if(task.status==="In Progress"){
      newStatus = "Backlog";
    } else if(task.status === "Done"){
      newStatus = "In Progress"
    }
    if(newStatus !== ""){
      moveTask(task.id, newStatus);
    }
  }
  const handleMoveRight = () => {
    let newStatus ="";
    if(task.status==="Backlog"){
      newStatus = "In Progess";
    } else if(task.status === "In Progess"){
      newStatus = "Done"
    }
    if(newStatus !== ""){
      moveTask(task.id, newStatus);
    }
  }

  return (
    <div className={`Task ${collapsed}? "collapsedTask ": ""`}>
      <button onClick={handleMoveLeft} className="button moveTaskLeft">&#171;</button>
      <form onSubmit={handleSubmit} className={collapsed ? "collapsed":""}>
        <div className="inputFields"><input 
          type="text" 
          className="title input" 
          name="title" 
          placeholder="Enter Title"
          disabled={collapsed}
          defaultValue={task.title}
          autoComplete="off"
          />
          <textarea 
            rows="2"
            className="description input"
            name="description"
            placeholder="Enter Description"
            defaultValue={task.description}
          />
          </div>
          <div className="priorityLabels">
            <label className={`low ${priority}==="low" ? "selected":""`}>
              <input type="radio" priority="low" onChange={handlePriority} name="priority"/>
              Low
            </label>

            <label className={`medium ${priority}==="medium" ? "selected":""`}>
              <input type="radio" priority="medium" onChange={handlePriority} name="priority"/>
              Medium
            </label>

            <label className={`high ${priority}==="high" ? "selected":""`}>
              <input type="radio" priority="high" onChange={handlePriority} name="priority"/>
              High
            </label>
          </div>
          <button className="button" onClick={ () => {
            setFormAction("save")
          }}>{collapsed ? "Edit" : "Save"}</button>
         { collapsed && 
          <button className="button delete" onClick={ () => {
            setFormAction("delete")
          }}>X</button>
        }
      </form>
      <button onClick={handleMoveRight} className="button moveTaskRight">&#187;</button>
    </div>
  )
}

export default Task
