import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import TableRow from './TableRow';
export default function App() {
  let [state, setState] = useState({
    taskName: ''
  });
  let dispatch = useDispatch()
  const handleChange = (e) => {
    setState({
      taskName: e.target.value
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({
      type: "ADD_TASK",
      taskName: state.taskName
    })
    setState({
      taskName: ""
    })
  }
  useEffect(() => {
    dispatch({
      type: "SET_ALL",
    })
  }, [])
  let listToDo = useSelector((state) => {
    return state.toDoListReducer.listToDo
  })
  let statusFilter = useSelector((state) => {
    return state.toDoListReducer.statusFilter
  })
  let itemsLeft = 0
  for (const iterator of listToDo) {
    if (iterator.check!==true) {
      itemsLeft++
    }
  }
  console.log(listToDo);
  const renderTask = () => {
    switch (statusFilter) {
      case 'SET_ALL':
        return listToDo.map((item, index) => {
          return <TableRow key={index} name={item.name} index={index} id={item.id} check={item.check}/>
        })
      case 'SET_ACTIVE':
        return listToDo.filter((item, index) => item.check !== true).map((item, index) => {
          return <TableRow key={index} name={item.name} index={index} id={item.id} check={item.check}/>
        })
      case 'SET_COMPLETED':
        return listToDo.filter((item, index) => item.check === true).map((item, index) => {
          return <TableRow key={index} name={item.name} index={index} id={item.id} check={item.check}/>
        })
      default:
        break;
    }
  }
  return (
    <section className="todoapp">
      <header className="header">
        <h1 className='mt-3'>todos</h1>
        <form className="todo-form" onSubmit={handleSubmit}>
          <input className="new-todo"
            placeholder="What needs to be done?"
            onChange={handleChange}
            value={state.taskName}
            required
          />
        </form>
      </header>
      <section className="main">
        <input id="toggle-all"
          className="toggle-all"
          type="checkbox"
        />
        <label htmlFor="toggle-all">Mark all as complete</label>
        <ul className="todo-list">
          {renderTask()}
        </ul>
      </section>
      <footer className="footer">
        <span className="todo-count">
          <strong className="ng-binding">{itemsLeft} items left</strong>
        </span>
        <ul className="filters">
          <li>
            <span
              className={(statusFilter === 'SET_ALL') ? 'selected' : ''}
              onClick={() => {
                dispatch({
                  type: "SET_ALL"
                })
              }}
            >All</span>
          </li>
          <li>
            <span
              className={(statusFilter === 'SET_ACTIVE') ? 'selected' : ''}
              onClick={() => {
                dispatch({
                  type: "SET_ACTIVE"
                })
              }}
            >Active</span>
          </li>
          <li>
            <span
              className={(statusFilter === 'SET_COMPLETED') ? 'selected' : ''}
              onClick={() => {
                dispatch({
                  type: "SET_COMPLETED"
                })
              }}
            >Completed</span>
          </li>
        </ul>
        <span className="clear-completed ng-hide"
          onClick={() => {
            dispatch({
              type: "CLEAR_COMPLETED"
            })
          }}
        >Clear completed</span>
      </footer>
    </section>
  )
}

