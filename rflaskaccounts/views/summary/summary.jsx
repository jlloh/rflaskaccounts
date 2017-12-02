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
  
class App extends React.Component {
  constructor() {
    super();
    this.state = {summary_data: null
                , navbaroptions: [
                     {text: 'Transactions' , link: '/transactions'}
                   , {text: 'Summary', link: '/summary'}
                  ]
                 };
  }
  componentDidMount() {
    gapi.load("auth2", {
      callback: function() {
        gapi.auth2.init()  
      }
    })
    //gauth = gapi.auth2.init();
    var url = "/api/summary"
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
         this.setState({summary_data: json.data})
      })
      .catch(error => {
      alert(error)
      });
  }
  render() {
    return(
      <div>
        <nav className="navbar navbar-inverse">
          <div className="container-fluid">
            <NavBarHeader link="/home" text="RFlaskAccounts"/>
            <NavBarItems inputArray={this.state.navbaroptions}/>
          </div>
        </nav>
        <div className="container">
          <Jumbotron text="summary"/>
          <DataTable data={this.state.summary_data} displayed={true}/>
        </div>
      </div>
    )
  }
}


ReactDOM.render(
  <App />,
  document.getElementById('body')
)