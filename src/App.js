/* eslint-disable no-unused-vars */
import logo from './logo.svg';
import './App.css';
import React from 'react';
import Proizvod from './components/Proizvod';
import Pekara from './components/Pekara';
import Menubar from './components/Menubar';
import Home from './components/Home';
import Korpa from './components/Korpa';
import CreateProizvod from './components/CreateProizvod';
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom'
import CreatePekara from './components/CreatePekara';
import UpdatePekara from './components/UpdatePekara';
import SignUp from './components/SignUp';
import LogIn from './components/LogIn';
import UpdateProizvod from './components/UpdateProizvod';
import Account from './components/Account';
import 'bootstrap/dist/css/bootstrap.min.css';
import Porudzbina from './components/Porudzbina';
import User from './components/User';


function App() {
  return (
    <div>
      <Router>
          <div className="Container">
             <Menubar/>
             <div className="Container">
               <Switch>
                  <Route path ="/" exact component={Home}/>
                  <Route path ="/proizvodi" component={Proizvod}/>
                  <Route path ="/register" component={SignUp}/>
                  <Route path ="/login" component={LogIn}/>
                  <Route path ="/korpa" component={Korpa}/>
                  <Route path ="/pekare" component={Pekara}/>
                  <Route path ="/add-pekara" component={CreatePekara}/>
                  <Route path ="/profil" component={Account}/>
                  <Route path ="/add-proizvod" component={CreateProizvod}/>
                  <Route path = "/update-pekara/:id" component={UpdatePekara}/>
                  <Route path = "/update-proizvod/:id" component={UpdateProizvod}/>
                  <Route path ="/porudzbine" component={Porudzbina}/>
                  <Route path ="/users" component={User}/>

              </Switch>
               </div> 
               </div>
      </Router>
    </div>
  );
}

export default App;
