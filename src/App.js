// import logo from './logo.svg';
import { useState, useEffect } from 'react';
import Alert from "./Alert";
import './App.css';
import ToDo from "./ToDo";


//get local storage
const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return JSON.parse(localStorage.getItem("list"));
  } else {
    return [];
  }
};

function App() {
  const [complete, setcomplete] = useState(false);
  const [name, setName] = useState(""); // value that we'll use in our form / the empty value by default
  const [list, setList] = useState(getLocalStorage()); // empty array that we'll use for local storage // local storage list

  const [alert, setAlert] = useState({
    show: false,
    msg: "",
    type: "",
  });


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      showAlert(true, "danger", "please enter value"); // display alert
    }
    else {
      // show alert
      showAlert(true, "success", "new task added to the list");
      const newItem = {
        // create a new item is equil to the object with an unique ID and a title tht will be equil to the name value that is coming from the state
        id: new Date().getTime().toString(),
        title: name,
        status: false
      };
      setList([...list, newItem]); // ... get me the previous values from the state add add a new one
      setName("");
      
    }
  };

  const showAlert = (show = false, type = "", msg = "") => {
    // parameters by default
    setAlert({ show, type, msg }); // if the property name matches to the variable name that holds the value then show and type an message
  };



  const removeItem = (id) => {
    showAlert(true, "danger", "task removed");
    setList(list.filter((item) => item.id !== id)); // list filter always return a new array / if item Id matches to whatever idea passed into remove item, then don't return it from thos filter function. If item Id doesn't match, then it's going to be added to the new array
  };


  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  // const [filteredItems, setFilteredItems] = useState("");
  // const editItem = (id) => {
  //   // get a specific item whose Id matches
  //   const specificItem = list.find((item) => item.id === id); // if the item Id matches, then return that item
  //   setIsEditing(true);
  //   setEditID(id);
  //   setName(specificItem.title);
  // };


  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);


  return (
    <>
      <div>
        {/* <h1 className="title-center">To-do list</h1> */}
        <section className="section-center">
          <form className="todo-form" onSubmit={handleSubmit}>
            {alert.show && (
              <Alert {...alert} removeAlert={showAlert} list={list} />
            )}{" "}
            {/* inside of alert component pass all the properties from state alert value */}
            {/* show some checking for the proprety of show more specific for the value and if that is the case - display it // you can check it if you change useState for alert to show:true // The logical AND (&&) operator for a set of boolean operands will be true if and only if all the operands are true. Otherwise it will be false. */}
            <center><h2>THINGS TO DO</h2></center>
            <div className="form-control">

              <input
                type="text"
                className="todo"
                placeholder="Add New"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <button type="submit" className="submit-btn">
                submit
              </button>
            </div>
          </form>
          {list.length > 0 && (

            <div className="todo-container">

              <ToDo items={list} removeItem={removeItem} filter={filter} list={list} search={search}/>{" "}
              {/* list as a prop into Todo component named 'items' */}
              {/*  */}

            </div>
          )}
          <div className='bottom'>
            <input
              type="text"
              className="search"
              placeholder="Search tasks..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            

            {/* <p>{list.filter((item)=>item.active).length}</p> */}
            {/* <p>{`${list.length} items left`}</p> */}
            <button className={filter === "all" ? "active-btn" : ""}
              onClick={() => setFilter("all")}
            >
              All
            </button>
            <button
              className={filter === "active" ? "active-btn" : ""}
              onClick={() => setFilter("active")}
            >
              Active
            </button>
            <button
              className={filter === "completed" ? "active-btn" : ""}
              onClick={() => setFilter("completed")}
            >
              Completed
            </button>
            

          </div>
        </section>
      </div>
    </>
  );
}

export default App;
