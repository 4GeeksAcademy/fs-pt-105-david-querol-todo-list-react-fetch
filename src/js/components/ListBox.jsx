import React from 'react';
import { useState, useEffect } from "react";

//import font awesome x-mark icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

export const ListBox = () => {

    //input task state
    const [task, setTask] = useState('');
    //task list state array
    const [taskList, setTaskList] = useState([]);

    //Fetch tasks from API on component load
    useEffect(() => {
        getData();
    }, []);

    //get tasks from API
    const getData = async () => {
        try {
            const response = await fetch(`https://playground.4geeks.com/todo/users/david`);
            const data = await response.json();

            setTaskList(data.todos);


        } catch (error) {
            console.log("Error al cargar la base de datos");
        }
    }

    //create new task in API
    const createTask = async () => {
        try {
            const response = await fetch('https://playground.4geeks.com/todo/todos/david', {
                method: 'POST',
                body: JSON.stringify({ label: task, is_done: false }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`Error al escribir los datos`);
            }

        } catch (error) {
            console.error("Error al crear la tarea:");
        }
        getData();
    };

    //delete data from api
    const deleteTask = async (id) => {
        try {
            const response = await fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error('Error al eliminar la tarea')
            }

            getData();

        } catch (error) {
            console.log("Error al borrar la tarea");
        }
    }

    //event capture value input on changes.
    const onChangeInput = (e) => {
        setTask(e.target.value);
    }

    //event capture key down enter on keyCode 13
    const onKeyDownInput = (e) => {

        if (e.keyCode === 13 && task) {
            createTask();
            setTask('');
        }
    }

    return (

        <div className="card shadow mt-2 rounded-0" style={{ width: `30rem` }}>

            <ul className="list-group list-group-flush">

                <input
                    className="list-group-item fw-light"
                    type="text"
                    value={task}
                    onChange={onChangeInput}
                    onKeyDown={onKeyDownInput}
                    placeholder="Añade una nueva tarea"
                />

                {taskList.map((item) =>
                    <li key={item.id}
                        className="list-group-item bg-light d-flex 
                            justify-content-between father-btn fw-light"
                    >
                        <div>{item.label}</div>
                        <div
                            className="show-it"
                            onClick={() => deleteTask(item.id)}
                        ><FontAwesomeIcon icon={faXmark} />
                        </div>
                    </li>
                )}
            </ul>

            <div className="card-footer fw-light textfooter">
                <b className="fw-normal">
                    {taskList.length ? taskList.length : ""}
                </b>
                {!taskList.length ? 'No hay tareas, añadir tareas.' : ' tareas Pendientes'}
            </div>
        </div>
    )
}
