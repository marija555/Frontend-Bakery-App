import {  faEraser, faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';
import React, { Component } from 'react';
import AuthService from '../services/AuthService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class User extends Component {
    constructor(props){
        super(props)
        this.state ={
           sortType: 'asc',
            users:[]
        }

   this.deleteUser = this.deleteUser.bind(this);
    }

    deleteUser(id){
        AuthService.deleteUser(id).then(res => {
            this.setState({users: this.state.users.filter(user => user.id !== id )});
            window.location.reload();

        });
    }
    componentDidMount(){
        AuthService.getUsers().then((response)=> {
            this.setState({users: response.data})
        });
       
          
    }
    onSort=sortType=>{
       
            this.setState({sortType});
        

    }
    render() {
        const{sortType} = this.state;
        const sorted = this.state.users.sort( (a,b) => {
            const isReversed = (sortType ==='asc') ?1: -1;
            return isReversed * a.prezime.localeCompare(b.prezime)

        });
        return (
                <div style={{marginLeft:"200px",marginRight:"100px", fontFamily:"Quicksand, cursive", fontSize:"20px", backgroundColor: "ThreeDDarkSininhadow"}}>
                    <h1 className="text-center" style={{ marginTop: "30px", fontSize:"60px",color:"red"}}> Članovi</h1>
                 <div >
                 <table className="table table table-dark" style= {{ textAlign:"center", color:"wheat"}}>
                     <thead >
                         <tr >
                         <th scope="col">Id</th>
                         <th scope="col">Prezime i ime {"  "}
                         <button  style={{color:"red", height:"45px", backgroundColor:"inherit"}} onClick={()=> this.onSort('asc')}><FontAwesomeIcon icon ={faSortUp}/></button>
                         <button  style={{color:"red", height:"45px",backgroundColor:"inherit"}} onClick={()=> this.onSort('desc')}><FontAwesomeIcon icon ={faSortDown}/></button>

                         </th>
                         <th scope="col">JMBG</th>
                         <th scope="col">Adresa</th>
                         <th scope="col">Broj kreditne kartice</th>
                         <th scope="col">Korisničko ime</th>
                          <th scope="col"></th>
                         </tr>
                     </thead>
                     <tbody>
                             {
                                 sorted.map(
                                     user =>
                                       <tr key = {user.id}>             
                                        <td>{user.id}</td> 
                                        <td>{user.prezime} {user.ime}</td> 
                                           <td>{user.jmbg}</td> 
                                           <td>{user.adresa}</td> 
                                           <td>{user.brkreditnekartice}</td>
                                           <td>{user.username}</td> 
                                            <td>
                                            <p  style={{color:"red", textAlign:"center"}}onClick={ () => this.deleteUser(user.id )}><FontAwesomeIcon icon ={faEraser}/></p>
                                            </td>
                                           </tr>
                             )}
                             </tbody>
                  </table>
             </div>
             </div>
        )}
    
}
export default User;