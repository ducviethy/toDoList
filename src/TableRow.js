import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

export default function TableRow(props) {
    let [show, setShow] = useState({
        status: true
    })
    let [taskName, setTaskName] = useState({
        name: ""
    })
    let dispatch = useDispatch();
    const handleSubmit = (e) => {
        e.preventDefault();
        setShow({
            status: true
        })
        dispatch({
            type: "UPDATE_TASK",
            taskEdit: taskName.name,
            index: props.index
        })
    }
    const handleChange = (e) => {
        setTaskName({
            name: e.target.value
        })
    }
    const handleCheck = (e) => {
        dispatch({
            type: "SET_CHECK",
            check:e.target.checked,
            index: props.index
        })
    }
    useEffect(() => {
        setTaskName({
            name: props.name
        })
    }, [])
    if (show.status) {
        return (
            <li className="ng-scope">
                <div className='view'>
                    <input className="toggle" type="checkbox" onChange={handleCheck} />
                    <label className="ng-binding" onClick={() => {
                        setShow({
                            status: false
                        })
                    }}>{props.name}</label>
                    <button className="destroy" onClick={() => {
                        dispatch({
                            type: "DELETE_TASK",
                            id: props.id
                        })
                    }} />
                </div>
            </li>
        )
    } else {
        return <li className="ng-scope">
            <form className="ng-pristine ng-valid" onSubmit={handleSubmit}>
                <input className='edit'
                    onChange={handleChange}
                    value={taskName.name}
                />
            </form>
        </li>
    }
}
