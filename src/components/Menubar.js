import { faBook, faShoppingCart, faSignInAlt, faSignOutAlt, faUser, faUserFriends, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import AuthService from '../services/AuthService';

class Menubar extends React.Component{
  
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state= {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
   
  }

  componentDidMount(){
    const user = AuthService.getCurrentUser();
    if(user) {
      this.setState({
        currentUser: AuthService.getCurrentUser(),
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN")
      }
        );
    }
  
  }
  location(){
    
  }
  logOut(){
    AuthService.logout();
  }

  render () {
    const{currentUser,showModeratorBoard,showAdminBoard} = this.state;
        return(
         <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{fontFamily:"Quicksand, cursive", fontSize:"20px"}}>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <a className="navbar-brand" href="/" >
             <img src={require("../img/b2.jpg").default} alt="pic" width="60" height="50"/>
              </a>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
              <li className="nav-item active">
                <a className="nav-link" href="/">Početna <span className="sr-only">(current)</span></a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/proizvodi">Proizvodi</a>
              </li>

              <li className="nav-item">
                <a className="nav-link " href="/pekare">Lokacije</a>
              </li>
               
               
            </ul>
          </div>

              {currentUser ? (
               <div className="navbar-nav ml-auto">
                  <div className="nav-item">
                     {!showModeratorBoard && !showAdminBoard && (
                    <a className="nav-link" style={{color:"lightyellow"}} href="/korpa">
                    <FontAwesomeIcon icon={faShoppingCart} width="20" height="20" /> 
                    </a>
                    )}
                   </div>
                    {showAdminBoard && (
                       <div className="navbar-nav ml-auto">
                         <div className="navbar-right">
                            <a className="nav-link"style={{color:"pink"}} href="/users">
                            <FontAwesomeIcon icon={faUserFriends} width="20" height="20" /> 
                            </a>
                         </div>
                         <div className="navbar-right">
                            <a className="nav-link" style={{color:"burlywood"}} href="/porudzbine">
                            <FontAwesomeIcon icon={faBook} width="20" height="20" /> 
                            </a>
                            </div>
                         </div>
                      
                    )}
                
                  <div className="nav-item">
                    <a className="nav-link" href="/profil">
                    <FontAwesomeIcon icon={faUser} style={{color:"skyblue"}} width="20" height="20" /> {currentUser.username}
                    </a>
                  </div>
                  <li className="nav-item">
                  <a href="/login" className="nav-link" onClick={this.logOut}>
                  <FontAwesomeIcon icon={faSignOutAlt} style={{color:"blue"}} width="20" height="20" /> </a>
              </li>
              
              </div>
              ):(
                <div className="navbar-nav ml-auto">
                  <div className="navbar-right">
                   <a className="nav-link" href="/login"> <FontAwesomeIcon icon={faSignInAlt}/> Prijava
                   </a>
                 </div>
                 <div className="navbar-right">
                <a className="nav-link" href="/register"><FontAwesomeIcon icon={faUserPlus}/>Registracija</a>
                 </div>
               </div>
              
              )}


            </nav>
      
            
          
      )
    }
              
}
export default Menubar;