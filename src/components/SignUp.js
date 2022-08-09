import { faEnvelope,  faHotel, faLock, faUser} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from "react";
import AuthService from '../services/AuthService';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import {isEmail} from "validator";
import { faAddressCard } from '@fortawesome/free-solid-svg-icons';

const required = value => {
    if (!value) {
      return (
        <div className="alert alert-danger"    role="alert">
          Ovo polje je obavezno!
        </div>
      );
    }
  };
  const vusername = value => {
    if (value.length < 3 || value.length > 20) {
      return (
        <div className="alert alert-danger" role="alert">
         Email treba da ima od 3 do 40 karaktera!
        </div>
      );
    }
    if (!isEmail(value)) {
      return (
        <div className="alert alert-danger" role="alert">
           Email nije validan!
        </div>
      );
    }
  };

     const vpassword = value => {
      if (value.length < 6 || value.length > 40) {
        return (
          <div className="alert alert-danger" role="alert">
            Lozinka mora da ima od 6 do 40 karaktera!
          </div>
        );
      }
    };

export default class SignUp extends Component {

    constructor(props) {
        super(props);
        
        this.handleRegister =this.handleRegister.bind(this);
        this.handleUsername =this.handleUsername.bind(this);
        this.handlePassword =this.handlePassword.bind(this);
        this.handleAdresa =this.handleAdresa.bind(this);
        this.handleIme =this.handleIme.bind(this);
        this.handlePrezime =this.handlePrezime.bind(this);
        this.handleJMBG =this.handleJMBG.bind(this);
        this.handleBrkreditnekartice =this.handleBrkreditnekartice.bind(this);


        this.state = {
            username:"",
            password: "",
            adresa: "",
            ime: "",
            prezime: "",
            jmbg: "",
            brkreditnekartice: "",
            successful: false,
            message: ""
        };
    }
    handleUsername(e) {
        this.setState({
            username: e.target.value
        });
    }
    handlePassword(e) {
        this.setState({
            password: e.target.value
        });
    }
    handleAdresa(e) {
        this.setState({
            adresa: e.target.value
        });
    }
    handleIme(e) {
        this.setState({
            ime: e.target.value
        });
    }
    handlePrezime(e) {
        this.setState({
            prezime: e.target.value
        });
    }
    handleJMBG(e) {
        this.setState({
            jmbg: e.target.value
        });
    }
    handleBrkreditnekartice(e) {
        this.setState({
            brkreditnekartice: e.target.value
        });
    }
    go(){
      console.log('user => ' + JSON.stringify(this.state));

    }
    handleRegister(e) {
        e.preventDefault();
    
        this.setState({
          message: "",
          successful: false
        });
    
        this.form.validateAll();
    
        if (this.checkBtn.context._errors.length === 0) {
          AuthService.register(
                this.state.username,
                this.state.password,
                this.state.adresa,
                this.state.ime,
                this.state.prezime,
                this.state.brkreditnekartice,
                this.state.jmbg

                ).then(
                    response => {
                      this.setState({
                        message: response.data.message,
                        successful: true
                      });
                    },
                    error => {
                      const resMessage =
                        (error.response &&
                          error.response.data &&
                          error.response.data.message) ||
                        error.message ||
                        error.toString();
            
                      this.setState({
                        successful: false,
                        message: resMessage
                      });
                    }
                  );
                }
               this.go();
              }

    render() {
        return (
            <div className="col-md-12" style={{marginTop:"-20px", fontFamily:"Quicksand, cursive",marginBottom:"0px"}}> 
                <div className={"card card-container border-white bg-dark text-white"}>
                    <div className="card-header " style={{marginTop:"-40px", textAlign:"center",fontSize:"30px", marginBottom:"30px"}}>
                        Registracija
                    </div>
                        <Form
                            onSubmit = {this.handleRegister}
                            ref={c => {
                                this.form = c;
                              }}
                            >
                          {!this.state.successful && (
                        <div>
                        <div className="card-row" style={{marginTop:"-10px"}}>
                        <div className="form-group" >
                          <div className="input-group" >
                          < div className="input-group-text" style={{maxWidth:"38px"}} >   
                            <FontAwesomeIcon icon={faUser}/></div>
                                    <Input className={"form-control bg-dark text-white"}  
                                        type="text" name="ime" value={this.state.ime} 
                                        onChange={this.handleIme}  
                                        placeholder="Unesite ime" 
                                        aria-label="Unesite ime" aria-describedby="basic-addon1"/>
                                </div>
                            </div>
                        </div>
                        <div className="card-row">
                        <div className="form-group" >
                          <div className="input-group" >
                          < div className="input-group-text" style={{maxWidth:"38px"}} >   
                            <FontAwesomeIcon icon={faUser}/></div>
                                    <Input className={"form-control bg-dark text-white"} type="text" name="prezime" value={this.state.prezime} 
                                        onChange={this.handlePrezime} 
                                        placeholder="Unesite prezime" aria-describedby="basic-addon1"/>
                                </div>
                            </div>
                        </div>
                        <div className="card-row">
                        <div className="form-group" >
                          <div className="input-group" >
                                        <div className="input-group-text" style={{maxWidth:"38px"}} ><FontAwesomeIcon icon={faHotel}/></div>
                                       <Input className={"form-control bg-dark text-white"}  type="text" name="adresa" value={this.state.adresa} 
                                        onChange={this.handleAdresa} 
                                        placeholder="Unesite adresu"  aria-describedby="basic-addon1"/>
                                </div>
                            </div>
                        </div>
                        <div className="card-row">
                        <div className="form-group" >
                          <div className="input-group" >
                                        <div className="input-group-text" style={{maxWidth:"38px"}} ><FontAwesomeIcon icon={faAddressCard}/></div>
                                        <Input className="form-control bg-dark text-white"  type="text" name="brkreditnekartice" value={this.state.brkreditnekartice} 
                                        onChange={this.handleBrkreditnekartice} 
                                        placeholder="Unesite broj kartice" aria-label="Unesite br kreditne kartice" aria-describedby="basic-addon1"/>
                                </div>
                            </div>
                        </div>
                        <div className="card-row">
                        <div className="form-group" >
                          <div className="input-group" >
                          < div className="input-group-text" style={{maxWidth:"38px"}} >   
                            <FontAwesomeIcon icon={faUser}/></div>
                                    <Input className={"form-control bg-dark text-white"}  
                                        type="text" name="jmbg" value={this.state.jmbg} 
                                        onChange={this.handleJMBG}  
                                        placeholder="Unesite JMBG" 
                                        aria-label="Unesite JMBG" aria-describedby="basic-addon1"/>
                                </div>
                            </div>
                        </div>
                        <div className="card-row">
                            <div className="form-group">
                                <div className="input-group" style={{maxHeight:"80px"}}>
                                        <div className="input-group-text" style={{maxWidth:"38px",maxHeight:"40px"}} ><FontAwesomeIcon icon={faEnvelope}  /></div>
                                        <Input 
                                        className="form-control bg-dark text-white"  autoComplete="off" type="text" name="username"  value={this.state.username}
                                        onChange={this.handleUsername} validations ={[required,vusername]}
                                         placeholder="Unesite username"/>
                                </div>
                            </div>
                        </div>
                        <div className="card-row" >
                         <div className="form-group " >
                         <div className="input-group" >
                             <div className="input-group-text" style={{maxWidth:"38px",maxHeight:"40px"}}  ><FontAwesomeIcon icon={faLock} /></div>
                                    <Input 
                                      type="password"
                                      className="form-control bg-dark text-white"
                                      name="password"
                                      value={this.state.password}
                                      onChange={this.handlePassword}
                                      placeholder="Unesite lozinku"
                                      validations={[required, vpassword]}
                                    />
                               </div>
                           </div>
                         </div>

                  <div className="form-group">
                  <button className="btn btn-primary btn-block">Registrujte se</button>
                </div>
                </div>
            )}

            {this.state.message && (
              <div className="form-group"  >
                <div
                  className={
                    this.state.successful
                      ? "alert alert-success"
                      : "alert alert-danger"
                  }
                  role="alert"
                >
                  {this.state.message}
                </div>
              </div>
            )}
            <CheckButton
              style={{ display: "none" }}
              ref={c => {
                this.checkBtn = c;
              }}
            />
          </Form>
        </div>
      </div>
       
    );
   
  }
 
}

