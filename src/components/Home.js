import React, { Component} from 'react';
import UserService from "../services/UserService";

class Home extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          content: ""
        };
      }
      componentDidMount() {
        UserService.getPublicContent().then(
          response => {
            this.setState({
              content: response.data
            });
          },
          error => {
            this.setState({
              content:
                (error.response && error.response.data) ||
                error.message ||
                error.toString()
            });
          }
        );
      }


    render() {
        return (
            <div className="jumbotron"  style={{backgroundColor:"inherit",  marginTop:"60px", color:"white"}}>
                        <h1 className="display-4 " style={{fontFamily:"Pangolin, cursive", fontSize:"80px",color:"white", textAlign:"center"}}>Dobro došli na sajt Bakery!</h1>
                        <h3 style ={{ marginTop:" 50px", fontFamily: "Pangolin ,cursive",fontSize:"40px",textAlign:"center"}} className="lead">Pogledajte naš asortiman ukusnih proizvoda i uverite se i sami zašto šmo najbolje ocenjeni sajt na teritoriji Srbije. 
                        Svi proizvodi su sveži i odmah dostupni. Nalazimo se na mnogo lokacija na teritoriji Srbije. </h3>
                       <a className="nav-link " href="/pekare" style={{ marginTop:" 50px",fontStyle: "italic",fontFamily:"Pangolin, italic",fontSize:"40px",textAlign:"center"}}>
                    Lokacije na kojima se nalazimo mozete pogledati ovde </a>
                    </div>
        );
    }
}

export default Home;