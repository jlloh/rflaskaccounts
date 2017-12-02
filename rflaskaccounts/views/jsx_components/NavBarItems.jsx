import React from 'react';
import ReactDOM from 'react-dom';

function NavBarItems(props) {
  //array of objects, (text, link)
  let listArray = [];
  for (let itemObject of props.inputArray) {
    let listItem = 
      <li>
        <a href={itemObject.link}>
          {itemObject.text}
        </a>
      </li>
    listArray.push(listItem)
  }
  return (
    <ul className="nav navbar-nav">
      {listArray}
    </ul>
  )
}

export default NavBarItems;