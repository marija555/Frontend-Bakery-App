import { faEraser } from '@fortawesome/free-solid-svg-icons';
import React, { Component } from 'react';
import AuthService from '../services/AuthService';
import PoruceniProizvodService from '../services/PoruceniProizvodService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PorudzbinaService from '../services/PorudzbinaService';
import DostavljacService from '../services/DostavljacService';

class Korpa extends Component {

        constructor(props){
            super(props)
            this.state={
                poruceniProizvodi: [],
                cena : '',
                currentUser: undefined,
                user: { ime: '', prezime: '', adresa:''},
                pp: [],
                poruceniProizvod: null,
                dostavljac: null,
                dostavljaci: [],
                selectedOption: '',
                nacinplacanja : null,
                porudzbina: null
                

            }
            this.changeDostvljac=this.changeDostvljac.bind(this);
            this.changeNacinPlacanja=this.changeNacinPlacanja.bind(this);
            this.savePorudzbina= this.savePorudzbina.bind(this);

        }

    componentDidMount(){
        const user = AuthService.getCurrentUser();
        DostavljacService.getDostavljaci().then((response)=> {
            this.setState({dostavljaci: response.data,
            datum: new Date().toISOString().split("T")[0]})
        });

        PoruceniProizvodService.getPoruceniProizvodi().then(res => {
            this.setState({currentUser: user,
                poruceniProizvodi: res.data.filter( p => p.user.id === user.id),
                            });     
                            let sum = this.state.poruceniProizvodi.reduce(function(prev, current) {
                                return prev + +current.proizvod.cena}, 0);
                                console.log(sum);
                            this.setState({ cena:sum })

                            AuthService.getUserByID(this.state.currentUser.id).then((res)=>{
                                this.setState({ user: res.data })
                            });
        });
    }
    changeDostvljac= (event) =>{
        let d =(event.target.value);
        DostavljacService.getDostavljacById(d).then((response)=> {
            this.setState({dostavljac: response.data})
            })
       console.log(this.state.dostavljac)
    }

    odbaci (id){
        PoruceniProizvodService.deletePProizvodByUser(id);
        this.props.history.push('/proizvodi')
    }

    ukloni(id){
        PoruceniProizvodService.deletePProizvod(id).then(res => {
            this.setState({poruceniProizvodi: this.state.poruceniProizvodi.filter(pproizvod => pproizvod.id !== id )});
            window.location.reload();
        }
        )
    }
    changeNacinPlacanja=(event)=> {  
        this.setState({nacinplacanja: event.target.value});
        console.log(this.state.nacinplacanja)
    }

    savePorudzbina= (e)=> {
       e.preventDefault();
        let porudzbina={dostavljac: this.state.dostavljac,
             datum: this.state.datum,
             nacinPlacanja: this.state.nacinplacanja,
              iznos: this.state.cena
            }
        this.setState={porudzbina: porudzbina}
        console.log('porudzbina => ' + JSON.stringify(porudzbina));
        PorudzbinaService.addPorudzbina(porudzbina);
    }

    ok=(userid)=>{
        //console.log(JSON.stringify(pp));
            this.odbaci(userid);
            window.location.reload();
            this.props.push('/proizvodi');
        }

    
    render() {
        let p={porudzbina: this.state.porudzbina};
        let  options= this.state.dostavljaci;
        let options2= [ { value: 'karticom', label: 'Karticom'},{value: 'pouzecem', label:'Pouzećem'}] ;
        return (
            <div>
             { (this.state.poruceniProizvodi.length === 0) &&(
                 <div className="container bg-dark" style= {{"marginTop": "150px", textAlign:"center", color:"wheat", fontFamily:"Quicksand,cursive"}}>
                 <h1 style={{marginTop:"50px"}}> Vaša korpa je prazna.
                     </h1>
                     <a className="nav-link " href="/proizvodi" style={{ marginTop:" 50px",fontStyle: "italic",fontFamily:"Pangolin, italic",fontSize:"25px",textAlign:"center"}}> Proizvode mozete pogledati ovde</a>
                     </div>
             )}
                { !(this.state.poruceniProizvodi.length === 0) &&(
                <div style={{marginTop:"150px",marginLeft:"200px", marginRight:"200px", fontSize:"20px",fontFamily:"Quicksand,cursive"}}>
                <table className="table table-md " style={{ marginTop:"50px", backgroundColor: "papayawhip"}}>
                   <thead>
                    <tr style={{textAlign: "center", backgroundColor:"darkgrey"}}>
                        <th> ID </th>
                         <th>Naziv  </th>
                         <th>Cena </th>
                         <th> </th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.poruceniProizvodi.map(
                         pproizvod =>
                         <tr key = {pproizvod.id} style={{textAlign: "center"}}>
                            <td>{pproizvod.proizvod.id}</td> 
                             <td>{pproizvod.proizvod.naziv}</td> 
                             <td>{pproizvod.proizvod.cena}.00 RSD</td>
                            <td>
                             <p onClick={()=>this.ukloni(pproizvod.id)} ><FontAwesomeIcon icon ={faEraser}/></p>
                            </td>
                         </tr>
                    )}
                </tbody>
                </table>
                <footer className="page-footer font-small blue pt-4" >
                <div style= {{float:"right"}}>
                    <a  style={{backgroundColor:"wheat", fontSize:"30px", marginRight:"10px"}}>Iznos: {this.state.cena} .00 RSD </a>
                    <button className="btn btn-success btn-lg"  style={{marginLeft:"10px", marginTop:"-10px"}} data-toggle="modal" data-target="#exampleModal">Poruci</button>
                    <button className="btn btn-danger btn-lg" onClick={()=>this.odbaci(this.state.user.id)} style={{marginLeft:"10px", marginTop:"-10px"}}>Odbaci</button>
                 </div>
                </footer>
                </div>
                    )}

          <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{marginTop:"100px", fontFamily:"Quicksand", fontSize:"20px"}}>
            <div className="modal-dialog" role="document">
                <div className="modal-content" style={{ backgroundColor:"wheat"}}>
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel" style={{fontSize:"30px"}}>Podaci o porudzbini</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <p> Ime i prezime : {this.state.user.ime + " " + this.state.user.prezime}</p>
                    <p> Adreasa : {this.state.user.adresa}</p>
                    <p> Broj kreditne kartice : {this.state.user.brkreditnekartice }</p>
                    <p> Iznos : {this.state.cena}.00 RSD</p>
                    <div className="form-group">
                                    <label> Odaberi dostavljača : </label>
                                    <select className="form-control" id="dostavljac"  onChange={this.changeDostvljac}  >
                                        {options.map((option, index) => 
                                            <option  key = {index}   value={option.dostavljacid}> {option.nazivdostavljaca}
                                            </option>
                                          )}
                                        </select>
                     </div>
                     <div className="form-group">
                         <label> Način plaćanja :  </label>
                                <select className="form-control" id="nacinplacanja"  onChange={this.changeNacinPlacanja} >
                                        {options2.map((option, index) => 
                                            <option  key = {index}   value={option.value}> {option.label}
                                            </option>
                                          )}
                                        </select>
                     </div>
                </div>
                <div className="modal-footer">
                <small className="text-muted" style={{textAlign:"left"}}>Datum : {this.state.datum}</small>
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Zatvori</button>
                    <button type="button" className="btn btn-primary" onClick={this.savePorudzbina} data-toggle="modal" data-target="#exampleModal3">Poruči</button>
                </div>
                </div>
            </div>
            </div>

            <div className="modal " id="exampleModal3" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true"style={{marginTop:"100px", fontFamily:"Quicksand", fontSize:"20px", backgroundColor:"black"}}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content" style={{ backgroundColor:"wheat"}}>
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel"> </h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        Porudzbina uspešno poslata. Hvala na kupovini.
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button"  onClick={()=>this.ok(this.state.user.id)} className="btn btn-primary">Ok</button>
                    </div>
                    </div>
                </div>
                </div>
          </div>

        );
    }
}

export default Korpa;