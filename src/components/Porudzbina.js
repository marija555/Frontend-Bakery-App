import { faEraser } from '@fortawesome/free-solid-svg-icons';
import React, { Component } from 'react';
import PorudzbinaService from '../services/PorudzbinaService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Porudzbina extends Component {
    constructor(props){
        super(props)
        this.state ={
           
            porudzbine:[]
        }

   this.deletePorudzbina = this.deletePorudzbina.bind(this);
    }
    deletePorudzbina(id){
        PorudzbinaService.deletePorudzbina(id).then(res => {
            this.setState({porudzbine: this.state.porudzbine.filter(porudzbina => porudzbina.id !== id )});
            window.location.reload();

        });
    }
    componentDidMount(){
        PorudzbinaService.getPorudzbine().then((response)=> {
            this.setState({porudzbine: response.data})
        });
       
          
    }
    render() {
        return (
                <div style={{marginLeft:"200px",marginRight:"100px", fontFamily:"Quicksand, cursive", fontSize:"20px", backgroundColor: "ThreeDDarkSininhadow"}}>
                         <h1 className="text-center" style={{ marginTop: "100px", color: "white", fontSize:"60px"}}> Informacije o porudžbinama:</h1>
                 <div >
                 <table className="table table table-dark" style= {{ textAlign:"center"}}>
                     <thead >
                         <tr >
                         <th scope="col">Id</th>
                         <th scope="col">Iznos</th>
                         <th scope="col">Dostavljac</th>
                         <th scope="col">Datum</th>
                         </tr>
                     </thead>
                     <tbody>
                             {
                                 this.state.porudzbine.map(
                                     porudzbina =>
                                       <tr key = {porudzbina.id}>             
                                        <td>{porudzbina.id}</td> 
                                           <td>{porudzbina.iznos}.00 RSD</td> 
                                           <td>{porudzbina.dostavljac.nazivdostavljaca}</td> 
                                           <td>{porudzbina.datum}  </td> 
                                           <td>
                                            <p onClick={ () => this.deletePorudzbina(porudzbina.id )}><FontAwesomeIcon icon ={faEraser}/></p>
                                            </td>
                                           </tr>
                             )}
                             </tbody>
                  </table>
             </div>
             </div>
        )}
    
}
export default Porudzbina;