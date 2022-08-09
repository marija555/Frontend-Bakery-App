import React from 'react'
import AuthService from '../services/AuthService';
import PekaraService from '../services/PekaraService'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

class Pekara extends React.Component{

    constructor(props){
        super(props)
        this.state ={
           
            pekare:[],
            showModeratorBoard: false,
            showAdminBoard: false

        }
        
        this.insertPekara= this.insertPekara.bind(this);
        this.editPekara = this.editPekara.bind(this);
        this.deletePekara = this.deletePekara.bind(this);
    }

    componentDidMount(){
        PekaraService.getPekare().then((response)=> {
            this.setState({pekare: response.data})
        });
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

    insertPekara() { 
        this.props.history.push('/add-pekara');
    }

    editPekara(pekaraid){
        this.props.history.push(`/update-pekara/${pekaraid}`);
    }

    deletePekara(id){
        PekaraService.deletePekara(id).then(res => {
            this.setState({pekare: this.state.pekare.filter(pekara => pekara.id !== id )});
            window.location.reload();

        });
    }
    render (){
        const {showModeratorBoard,showAdminBoard}= this.state;
        return(
           <div style={{marginLeft:"170px",marginRight:"100px", fontFamily:"Quicksand, cursive", fontSize:"20px", backgroundColor: "ThreeDDarkSininhadow"}}>
                {!showModeratorBoard  &&  !showAdminBoard &&(
                    <h1 className="text-center" style={{ marginTop: "100px", color: "white", fontSize:"60px"}}> Lokacije na kojima nas možete naći:</h1>
                       )}
                    
                {((showModeratorBoard)  || ( showAdminBoard ) ) &&(
                      <h1 className="text-center" style={{ marginTop: "100px", color: "white", fontSize:"60px", columnFill:"balance"}}> Pekare:</h1>
                         )}
            <div >
            <table className="table table table-dark" style= {{ textAlign:"center"}}>
                <thead >
                    <tr >
                    <th scope="col"></th>
                    <th scope="col">Naziv</th>
                    <th scope="col">Ulica</th>
                    <th scope="col">Ulica</th>
                    <th scope="col">Kontakt</th>
                    </tr>
                </thead>
                <tbody>
                        {
                            this.state.pekare.map(
                                pekara =>
                                  <tr key = {pekara.pekaraid}>
                                      <td>{pekara.na}</td> 
                                      <td>{pekara.nazivpekare}</td> 
                                      <td>{pekara.ulica}  </td> 
                                      <td>{pekara.grad}  </td> 

                                      <td>{pekara.kontaktpekare}</td>
                                      {((showModeratorBoard)  || ( showAdminBoard ) )  &&(
                                      <td>
                                        <button onClick={ () => this.editPekara(pekara.pekaraid)} className="btn btn-info">Update</button>
                                         <button style= {{marginLeft: "10px"}} onClick={ () => this.deletePekara(pekara.pekaraid )} className="btn btn-danger">Delete</button>

                                        </td>
                                      )}
                                    </tr>
                            )
                        }
                        </tbody>

        </table>
        {((showModeratorBoard)  || ( showAdminBoard ) )  &&(
                        <button className="btn btn-success btn-lg" style={{marginLeft:"570px"}} onClick={this.insertPekara}>  <FontAwesomeIcon icon ={faPlus}/> </button>
                    )}
        </div>
        </div>
        )
    }
}
export default Pekara;
