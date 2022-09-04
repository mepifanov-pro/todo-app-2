import React, { useState } from "react";
import './App.css'

const Home = () => {
    const [note, setNote] = useState('');
    const [todos, setTodos] = useState([]);

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


    const completedTodo = (editedTodo) => {
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
        <div style={{textAlign:"center"}}>
            <input 
                type="text"
                value={note}
                onChange={event => setNote(event.target.value)}
                onKeyDown={event => (event.key === 'Enter') ? addTodo() : null}
            />

            <button onClick={() => addTodo()}>add</button>
            
            <ul>
                {todos.map((todo) =>
                    <li key={todo.id}>
                        {editedTodoId === todo.id && <input type="text" value={newNote} onChange={event => setNewNote(event.target.value)}/>}
                        {editedTodoId !== todo.id && <span className="elems" style={{ textDecoration: todo.completed ? 'line-through' : 'none'  }} onClick={()=>completedTodo(todo)}>{todo.title}</span>}

                        {editedTodoId !== todo.id && <button onClick={()=>changeTodo(todo)}>
                            Редактировать
                        </button>}

                        {editedTodoId === todo.id && <button onClick={()=>saveTodo(todo)}>
                            Сохранить
                        </button> }
                        {editedTodoId === todo.id && <button onClick={()=>setEditedTodoId(!editedTodoId)}>
                            Отменить
                        </button> }


                        <button onClick={()=>deleteTodo(todo.id)}>
                            Удалить
                        </button>
                    </li>
                )} 
            </ul>
        </div>
    )
}

export default Home;
