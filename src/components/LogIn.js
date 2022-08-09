import React, { Component } from 'react';
import AuthService from '../services/AuthService';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';
import IsEmail from "validator";

const required = value => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          Ovo polje je obavezno!
        </div>
      );
    }
  };
  
  export default class Login extends Component {
    constructor(props) {
      super(props);
      this.handleLogin = this.handleLogin.bind(this);
      this.onChangeUsername = this.onChangeUsername.bind(this);
      this.onChangePassword = this.onChangePassword.bind(this);
  
      this.state = {
        username: "",
        password: "",
        loading: false,
        message: ""
      };
    }
   
    onChangeUsername(e) {
      this.setState({
        username: e.target.value

      });
     /* console.log('username => ' + JSON.stringify(e.target.value));
      console.log('usernameafter => ' + JSON.stringify(this.state.username));
*/
    }
  
    onChangePassword(e) {
      this.setState({
        password: e.target.value
      });
     

    }
  
    handleLogin(e) {
      e.preventDefault();
  
      this.setState({
        message: "",
        loading: true
        
      });
  
      this.form.validateAll();
    
      if (this.checkBtn.context._errors.length === 0) {
        AuthService.login(this.state.username, this.state.password).then(
          () => {
            this.props.history.push("/profil");
            window.location.reload();
          },
          error => {
            const resMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
  
            this.setState({
              loading: false,
              message: resMessage
            });
        

          }
        );
      } else {
        this.setState({
          loading: false
        });
      }
    }
  
    render() {
      return (
        <div className="col-md-12" >
          <div className={"card card-container border-dark bg-dark text-white border border-white"} style={{fontFamily:"Quicksand, cursive",marginTop:"150px"}} >
          <div className="card-header " style={{marginTop:"-40px", textAlign:"center",fontSize:"30px", marginBottom:"30px"}}>
                        Prijava
                    </div>
            <Form 
              onSubmit={this.handleLogin}
              ref={c => {
                this.form = c;
              }}
            >
              <div className="form-group">
                <label htmlFor="username"> E-mail adresa</label>
                <Input
                  type="text"
                  className="form-control"
                  name="username"
                  value={this.state.username}
                  onChange={this.onChangeUsername}
                  placeholder="Unesite email" 
                  validations={[required]}
                />
              </div>
  
              <div className="form-group">
                <label htmlFor="password">Lozinka</label>
                <Input
                  type="password"
                  className="form-control"
                  name="password"
                  value={this.state.password}
                  onChange={this.onChangePassword}
                  placeholder="Unesite adresu" 
                  validations={[required]}
                />
              </div>
  
              <div className="form-group">
                <button
                  className="btn btn-primary btn-block"
                  disabled={this.state.loading}
                >
                  {this.state.loading && (
                    <span className="spinner-border spinner-border-sm"></span>
                  )}
                  <span>Login</span>
                </button>
              </div>
  
              {this.state.message && (
                <div className="form-group">
                  <div className="alert alert-danger" role="alert">
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
                <a href="/register" style={{fontStyle: "italic"}}>Nemate nalog? Registrujte se</a>

            </Form>
          </div>
        </div>
      );
    } 
  }