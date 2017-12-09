import React from 'react';
import ReactDOM from 'react-dom';

function NavBarItems(props) {
  //array of objects, (text, link, function)
  if (props.orientation === "right") {
    var orientation = "nav navbar-nav navbar-right"
  }
  else {
    var orientation = "nav navbar-nav"
  }
  let listArray = [];
  for (let itemObject of props.inputArray) {
    let listItem = 
      <li onClick={itemObject.function}>
        <a href={itemObject.link}>
          {itemObject.text}
        </a>
      </li>
    listArray.push(listItem)
  }
  return (
    <ul className={orientation}>
      {listArray}
    </ul>
  )
}

export default NavBarItems;