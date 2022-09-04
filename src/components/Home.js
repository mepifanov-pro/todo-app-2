import React, { useState, useEffect } from "react";
import "./Home.css"

const TODOS_KEY = 'my-todos';

const Home = () => {
    const [note, setNote] = useState('');
    const [todos, setTodos] = useState([]);

    // sync local storage
    useEffect(() => {
        const savedTodos = JSON.parse(
            localStorage.getItem(TODOS_KEY)
        );

        if (savedTodos?.length) {
            setTodos(savedTodos);
        }
    }, []);

    // save todo list
    useEffect(() => {
        localStorage.setItem(
            TODOS_KEY,
            JSON.stringify(todos),
        );
    }, [todos]);

    const [editedTodoId, setEditedTodoId] = useState(null);
    const [newNote, setNewNote] = useState('');
    
    const addTodo = () => {
        const newTodo = {
            id: Date.now(),
            title: note,
            completed: false
        };

        const updatedTodos = [...todos, newTodo];
        setTodos(updatedTodos);
        setNote('');
    } 
    
    const deleteTodo = (todoId) => {
        const updatedTodos = todos.filter(todo => todo.id !== todoId);
        setTodos(updatedTodos);
    }

    const toggleTodo = (editedTodo) => {
        setTodos((prevTodos)=> {
            return prevTodos.map(todo => {
                if (todo.id === editedTodo.id){
                    return {...todo, completed: !todo.completed}
                } 
                return todo;
            })
        });
    }

    const changeTodo = (todo) => {
        setNewNote(todo.title)
        setEditedTodoId(todo.id)
    }

    const saveTodo = (todo) => {
        setTodos((prevTodos)=> {
            return prevTodos.map(el => {
                if (todo.id === el.id){
                    return {...todo, title: newNote}
                } 
                return el;
            })
        });
        setEditedTodoId('')
        setNewNote('')
    }

    return (
        <div className="todoApp">
            {/* TODO FORM */}
            <div className="todoForm">
                <input
                    className="todoFormInput"
                    type="text"
                    value={note}
                    onChange={event => setNote(event.target.value)}
                    onKeyDown={event => (event.key === 'Enter') ? addTodo() : null}
                />

                <button
                    className="todoFormButton"
                    onClick={() => addTodo()}
                >
                    add
                </button>
            </div>

            {/* TODO LIST */}
            <div className="todoList">
                {todos.map((todo) =>
                    <div key={todo.id} className={
                        "todoItem"
                        + (todo.completed ? " completed" : "")
                        + (editedTodoId === todo.id ? " edited" : "")
                    }>
                        <div className="todoItemText">
                            {editedTodoId !== todo.id && (
                                <span
                                    style={{ textDecoration: todo.completed ? 'line-through' : 'none'  }}
                                    onClick={()=>toggleTodo(todo)}
                                >
                                    {todo.title}
                                </span>
                            )}

                            {editedTodoId === todo.id && (
                                <input
                                    type="text"
                                    value={newNote}
                                    onChange={event => setNewNote(event.target.value)}
                                    onKeyDown={event => (event.key === 'Enter') ? saveTodo(todo) : null}
                                />
                            )}
                        </div>

                        <div className="todoItemActions">
                            {editedTodoId !== todo.id && (
                                <button
                                    className="actionButton"
                                    onClick={()=>changeTodo(todo)}
                                >
                                    edit
                                </button>
                            )}

                            {editedTodoId !== todo.id && (
                                <button
                                    className="actionButton"
                                    onClick={()=>deleteTodo(todo.id)}
                                >
                                    delete
                                </button>
                            )}

                            {editedTodoId === todo.id && (
                                <button
                                    className="actionButton"
                                    onClick={()=>saveTodo(todo)}
                                >
                                    save                            
                                </button>
                            )}

                            {editedTodoId === todo.id && (
                                <button
                                    className="actionButton"
                                    onClick={()=>setEditedTodoId(!editedTodoId)}
                                >
                                    cancel
                                </button>
                            )}
                        </div>
                    </div>
                )} 
            </div>
        </div>
    )
}

export default Home;
