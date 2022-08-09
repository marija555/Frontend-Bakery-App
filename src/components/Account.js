import React, { Component } from 'react';
import AuthService from '../services/AuthService';
import { Redirect } from "react-router-dom";

export default class Account extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: null,
      userReady: false,
      currentUser: { username: "" },
      user: {}
    };
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();


    if (!currentUser) this.setState({ redirect: "/" });

    this.setState({ currentUser: currentUser, userReady: true })


    AuthService.getUserByID(currentUser.id).then((res)=>{
      let user1 = res.data;
      this.setState({user: user1})

    })
  }
go(){
  console.log('user => ' + JSON.stringify(this.state.currentUser));

}

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }
    const { user } = this.state;
    this.go();

    return (
      <div className="container border-dark bg-dark text-white border border-white" style={{fontFamily:"Quicksand,cursive", fontSize:"20px", textAlign:"center",marginTop:"50px", maxWidth:"700px"}}>
        {(this.state.userReady) ?
        <div>
        <header className="jumbotron" style={{"backgroundColor":"wheat",color:"darkgrey", marginLeft:"-15px", marginRight:"-15px", maxHeight:"100px"}}>
          <h3 style={{"fontSize":"50px", marginTop:"-40px"}}>
            <strong> Moj profil</strong> 
          </h3>
        </header>
        <p>
          <strong>Email: </strong>{" "}
          {user.username}
        </p>
        <p>
          <strong>Id:</strong>{" "}
          {user.id}
        </p>
        <p>
          <strong>Ime i prezime:</strong>{" "}
          {user.ime + " " + user.prezime}
        </p>
        <p>
          <strong>Adresa:</strong>{" "}
          {user.adresa}
        </p>
        <p>
          <strong>Broj kreditne kartice:</strong>{" "}
          {user.brkreditnekartice}
        </p>
        <p>
          <strong>JMBG:</strong>{" "}
          {user.jmbg}
        </p>
        <p></p>
      
      </div>: null}
      </div>
     
    );
  }

}