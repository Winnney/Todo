import { useState, useEffect } from 'react';
import { FaTrash } from "react-icons/fa";

function ToDo({ items, removeItem, filter, list, search }) {
  // structure props from App.js in a function parameters

  const filteredItems = () => {
    if (!value) {
      setfind(items.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase()))
      );
    }
  }

  const completed = (id) => {
    localStorage.setItem("items", JSON.stringify(filterItem));
    console.log(`clicked`)
    const specificItem = list.find((item) => item.id === id);
    if (specificItem.status === true)
      specificItem.status = false;
    else specificItem.status = true;
  }
  //get local storage
  const getLocalStorage = () => {
    let items = localStorage.getItem("items");
    if (items) {
      console.log(`getlocalstorage`, JSON.parse(localStorage.getItem("items")))
      return JSON.parse(localStorage.getItem("items"));
    } else {
      return [];
    }
  };

  useEffect(() => {
    controller()
  }, [filter ]);
  useEffect(() => {
    controller()
  }, [items ]);

  const [value, setvalue] = useState(false);
  const [find, setfind] = useState(items);
  const [filterItem, setfilterItem] = useState(getLocalStorage());
  const controller = () => {
    console.log(`controller`)
    setfind(items)
    if (filter === 'active') {

      setfilterItem(items.filter(object =>
        object.status === false))
      console.log(filterItem)
    }
    else {
      let filterItem =
        setfilterItem(items.filter(object =>
          object.status === true))
      console.log(filterItem)
    };
  }
  console.log(filter)
  return (
    <div className="todo-task">
      <button className="search-btn" onClick={filteredItems}>
        search
      </button>

      {filter === "all" ? (find.map((item) => {
        const { id, title } = item;
        return (
          <article key={id} className="todo-item">
            <div>
              {item.status === true ? (<><input type='checkbox' checked onClick={() => completed(id)} /></>) : (<><input type='checkbox' onClick={() => completed(id)} /></>)}
            </div>
            <p className="title">{title}</p>

            <div className="btn-container">
              <button
                type="button"
                className="delete-btn"
                onClick={() => removeItem(id)}
              >
                <FaTrash className="icons" />
              </button>
            </div>
          </article>
        );
      })) : (filterItem.map((item) => {
        const { id, title } = item;
        return (
          <article key={id} className="todo-item">
            <div>
              {item.status === true ? (<><input type='checkbox' checked onClick={() => completed(id)} /></>) : (<><input type='checkbox' onClick={() => completed(id)} /></>)}

            </div>
            <p className="title">{title}</p>

            <div className="btn-container">
              <button
                type="button"
                className="delete-btn"
                onClick={() => removeItem(id)}
              >
                <FaTrash className="icons" />
              </button>
            </div>
          </article>
        );
      }))}
    </div>
  );
}

export default ToDo;
