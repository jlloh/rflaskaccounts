import React from 'react';
import ReactDOM from 'react-dom';
import Reactable from 'reactable';
import FormElement from '../jsx_components/FormElement';
import DataTable from '../jsx_components/DataTable';
import Jumbotron from '../jsx_components/Jumbotron';
import NavBarHeader from '../jsx_components/NavBarHeader';
import NavBarItems from '../jsx_components/NavBarItems';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

function EditButton(props) {
  const buttonType = "btn btn-primary";
  let disabled = true;
  let text = "Add Transaction"
  let clickFunction = props.onClick
  if (props.locked != true) {
    disabled = false
  }
  if (props.date != '' && props.amount != '' && props.description != '') {
    text = "Submit Transaction"
    clickFunction = props.onClick2
  }
  return <div className="form-group">
           <button type="Button" 
                   className={buttonType} 
                   onClick={clickFunction} 
                   disabled={props.disabled}>{text}
           </button>
         </div>
}

class App extends React.Component {
  constructor() {
    super();
    this.state = {transaction_data: null
                , editMode: false 
                , date: '' 
                , account: 'ADVANCED' 
                , amount: ''
                , options: []
                , description: ''
                , navbaroptions: [
                  {text: 'Transactions' , link: '/transactions', function: null}
                , {text: 'Summary', link: '/summary', function: null}
                 ]
                 };
    this.ShowEdit = this.ShowEdit.bind(this);
    this.FieldChanged = this.FieldChanged.bind(this);
    this.AddTransaction = this.AddTransaction.bind(this);
    this.LogOut = this.LogOut.bind(this);
  }
  componentDidMount() {
    gapi.load("auth2", {
      callback: function() {
        gapi.auth2.init()
      }
    })
    var url = "/api/transactions"
    fetch(url, {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Cache': 'no-cache'
      },
      credentials: 'include'
      })
      .then(response => response.json())
      .then(json => {
         this.setState({transaction_data: json.data})
      })
      .catch(error => {
        alert(error)
      });
    var url = "/api/accounts"
    fetch(url, {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Cache': 'no-cache'
      },
      credentials: 'include'
      })
      .then(response => response.json())
      .then(json => {
         this.setState({options: json.account_array})
      })
      .catch(error => {
        alert(error)
      });
  }
  ShowEdit(event) {
    let editMode = this.state.editMode;
    this.setState({editMode: !editMode})
  }
  AddTransaction(event) {
    console.log('abc')
    fetch("/api/addtransaction", {
      method: "POST",
      body: JSON.stringify({
        date: this.state.date
      , account: this.state.account
      , amount: this.state.amount
      , description: this.state.description
      }),
      headers: {
      },
      credentials: 'include'
      })
      .then(response => response.json())
      .then(json => {
        console.log(json)
        this.setState({amount: '', description: '', editMode: false})
        fetch("/api/transactions", {
          method: "GET",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Cache': 'no-cache'
          },
          credentials: 'include'
          })
          .then(response => response.json())
          .then(json => {
             this.setState({transaction_data: json.data
                          })
           })
          .catch(error => {
            console.log(error);
            alert("Error. Please try again.")
           }); 
      })
      .catch(error => {
        alert(error);
        this.setState({locked: false})
      })
  }
  FieldChanged(event) {
    if (event.target.id === 'date') {
      this.setState({date: event.target.value})
    }
    if (event.target.id === 'account') {
      this.setState({account: event.target.value})
    }
    if (event.target.id === 'amount') {
      this.setState({amount: event.target.value})
    }
    if (event.target.id === 'description') {
      this.setState({description: event.target.value})
    }
  }
  LogOut(event) {
    var auth2 = gapi.auth2.getAuthInstance();
    var url = "/logout";
    console.log(event);
    fetch(url, {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Cache': 'no-cache'
      },
      credentials: 'include'
      })
      .then(auth2.signOut())
      .then(window.location.href = '/home')
  }
  render() {
    var logoutOption = [{text: "LogOut", link: "#", function: this.LogOut}]
    return(
      <div>
        <nav className="navbar navbar-inverse">
          <div className="container-fluid">
            <NavBarHeader link="/home" text="RFlaskAccounts"/>
            <NavBarItems inputArray={this.state.navbaroptions}
                         orientation="normal"
            />
            <NavBarItems inputArray={logoutOption}
                         orientation="right"
            />
         </div>
        </nav>
        <div className="container">
          <Jumbotron text="transactions"/>
          <FormElement displayed={this.state.editMode} 
                       DateChanged={this.DateChanged}
                       date={this.date}
                       options={this.state.options}
                       AccountChanged={this.AccountChanged}
                       FieldChanged={this.FieldChanged}
                       account={this.state.account}
                       amount={this.state.amount}
                       description={this.state.description}
          />
          <EditButton Name="Add Transaction" 
                      onClick={this.ShowEdit}
                      onClick2={this.AddTransaction}
                      date={this.state.date}
                      amount={this.state.amount}
                      description={this.state.description}
          />
          <DataTable data={this.state.transaction_data} displayed={true}/>
        </div>
      </div>
    )
  }
}


ReactDOM.render(
  <App />,
  document.getElementById('body')
)