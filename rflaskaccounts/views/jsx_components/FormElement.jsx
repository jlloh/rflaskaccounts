import React from 'react';
import ReactDOM from 'react-dom';

function FormElement(props) {
    let formStyle = {display: 'none',}
    if (props.displayed === true) {
      formStyle = {display: ''}
    }
    let optionArray = []
    for (let i of props.options) {
      optionArray.push(<option>{i}</option>)
    }
    return (
      <form style={formStyle}>
        <div className="form-group">
          <label>Date</label>
          <input type="date" 
                 className="form-control" 
                 onChange={props.FieldChanged}
                 value={props.date}
                 id="date"
          ></input>
        </div>
        <div className="form-group">
          <label>Account</label>
          <select className="form-control" 
                  onChange={props.FieldChanged}
                  id="account">
            {optionArray}
          </select>
        </div>
        <div className="form-group">
          <label>Amount</label>
          <input type="number" 
                 className="form-control"
                 id="amount"
                 value={props.amount}
                 onChange={props.FieldChanged}>
          </input>
        </div>
         <div className="form-group">
          <label>Description</label>
          <input type="text" 
                 className="form-control"
                 id="description"
                 onChange={props.FieldChanged}
                 value={props.description}>
          </input>
        </div>
      </form>
    )
  }

export default FormElement;