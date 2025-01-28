
import {Component} from "react";

import {Route, Switch,Link} from "react-router-dom";


import AddUserData from "./components/addingUserData";

import Home from "./components/homePage";

import EditDeleteUserData from "./components/modifyUserData";

import "./App.css";

class App extends Component {

  

  render(){

    return(

      <div className="App">
       <header><Link to="/">Home</Link></header>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/add" component={AddUserData}/>
          <Route path="/user/:id" component={EditDeleteUserData}/>

        </Switch>
      <footer>Developer Daveed Gangi</footer>
      </div>
    )
  }

}


export default App;
