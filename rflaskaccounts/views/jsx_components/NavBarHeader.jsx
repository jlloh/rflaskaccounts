import React from 'react';
import ReactDOM from 'react-dom';

function NavBarHeader(props) {
  //link, text
  return (
    <div className="navbar-header">
      <a className="navbar-brand" href="{props.link}">
        {props.text}
      </a>
    </div>
  )
}

export default NavBarHeader;