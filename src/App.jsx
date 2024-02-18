import { useState, useRef, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Navbar from './components/Navbar';
import { MdModeEditOutline } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { IoMdCheckmark } from "react-icons/io";

function App() {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [btnTxt, setbtnTxt] = useState(<IoMdAdd />)
  const [todoid, setTodoid] = useState(null)
  const [loaded, setLoaded] = useState(false);
  const [showFinished, setShowFinished] = useState(true)
  const inputRef = useRef()

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos")
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos))
    }
    setLoaded(true);
  }, [])

  //! Save todos to Local Storage
  useEffect(() => {
    if (loaded) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos, loaded]);

  //! Add/Update todo
  const todoAdd = async () => {
    if (todoid) {
      // let currentTodo = todos.filter(item => item.id == todoid)
      // currentTodo[0].todo = todo
      const updatedTodos = todos.map(item =>
        item.id === todoid ? { ...item, todo } : item
      );
      setTodos(updatedTodos)
      setTodoid(null)
    }
    else {
      setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    }
    setTodo("")
    setbtnTxt(<IoMdAdd />)
  }

  //! Edit a todo
  const todoEdit = (id) => {
    let t = todos.filter(item => item.id == id)
    setTodo(t[0].todo)
    setTodoid(t[0].id)
    setbtnTxt(<IoMdCheckmark />)
    inputRef.current.focus()
  }

  //! Delete a todo
  const todoDelete = (id) => {
    let newTodos = todos.filter(item => {
      return item.id != id
    })
    setTodos(newTodos)
    setTodo("")
    setbtnTxt(<IoMdAdd />)
    setTodoid(null)
  }

  //! Input field Handling
  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  //! Checkbox Handling
  const handleCb = (e) => {
    let id = e.target.name
    let index = todos.findIndex(item => {
      return item.id == id;
    })
    let newTodos = [...todos]
    newTodos[index].isCompleted = !newTodos[index].isCompleted
    setTodos(newTodos)
  }

  //! Toggle finished todos
  const toggleFinished = () => {
    setShowFinished(!showFinished)
  }

  return (
    <>
      <Navbar />
      <div className="container relative mx-auto my-6 p-6 pb-10 bg-gradient-to-br from-[#ddd6fe6c] to-[#fbcfe86c] rounded-xl min-h-[88vh] md:w-[768px] backdrop-blur-md bg-opacity-45 hover:shadow-[0px_0px_30px_10px_#00000060] transition-shadow">
        <div id='addTodo' className="py-5">
          {/* <h1 className='text-4xl font-semibold pb-7 bg-gradient-to-r to-[#7c3aed] from-[#0c00db] bg-clip-text text-transparent'>iTask: Where Tasks Get Done</h1> */}
          <h1 className='mainHeading'>iTask: Where Tasks Get Done</h1>
          <div id='inputArea' className='flex flex-col sm:flex-row items-center gap-5'>
            <input onChange={handleChange} ref={inputRef} value={todo} type="text" placeholder='Add a TODO' className='input' id='add-todo' />
            <button onClick={todoAdd} disabled={todo.length < 3} className='btn text-xl max-sm:w-32'>{btnTxt}</button>
          </div>
        </div>
        <div id="todoList">
          <div className='flex justify-between gap-5 py-3 text-slate-800'>
            <h2 className='text-2xl font-bold'>Your TODOs</h2>
            <div className='flex items-center gap-3'>
              <input onChange={toggleFinished} type="checkbox" checked={showFinished} className='cb' id='show-finished' />
              <label htmlFor="show-finished" className='text-end font-bold'>Show Finished</label>
            </div>
          </div>

          {todos.length == 0 && <div className='text-center text-6xl font-bold py-32 place-items-center grid bg-gradient-to-bl from-slate-900 to-slate-700 bg-clip-text text-transparent'>
            <span className='max-w-48 text-center'>Create TODO.</span>
          </div>}

          <div className='overflow-y-auto max-h-[60vh] todoListCont flex flex-col gap-3 p-5'>
            {todos.map(item => {
              return (showFinished || !item.isCompleted) &&
                <div key={item.id} id="todo" className='flex gap-5 items-start justify-between p-3 rounded-xl bg-violet-200 hover:shadow-[0px_0px_8px_5px_#00000024] transition-all'>
                  <div id="todoText" className='flex gap-5 items-center overflow-hidden w-full font-medium'>
                    <input onChange={handleCb} type="checkbox" name={item.id} checked={item.isCompleted} id={item.id} className='cb' />
                    <label htmlFor={item.id} className={item.isCompleted ? "line-through decoration-violet-800 decoration-4 todoText" : "todoText"}>{item.todo}</label>
                  </div>
                  <div id="btnArea" className='flex gap-3 max-sm:flex-col'>
                    <button onClick={() => { todoEdit(item.id) }} className='btn'><MdModeEditOutline /></button>
                    <button onClick={() => { todoDelete(item.id) }} className='btn'><MdDelete /></button>
                  </div>
                </div>
            })}
          </div>

        </div>
        <footer className='absolute bottom-2 left-2/4 -translate-x-2/4 font-semibold text-neutral-900 whitespace-nowrap'>
          <span>By Tushar Vishwakarma</span>
        </footer>
      </div>
    </>
  )
}

export default App
