import { faFastBackward, faFastForward, faPlus, faSearch, faStepBackward, faStepForward, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import AuthService from '../services/AuthService';
import PoruceniProizvodService from '../services/PoruceniProizvodService';
import ProizvodService from '../services/ProizvodService'

const pageNummCss = {
    width: "45px",
    border: "1px solid #17A2B8",
    color: "#",
    textAlign: "center",
    fontWeight: "bold",
    showModeratorBoard: false,
    showAdminBoard: false
   

};
class Proizvod extends React.Component{

    constructor(props){
        super(props)
        this.state ={
            proizvodi:[],
            currentPage : 1,
            proizvodPerPage: 6,
            search: '',
            pproizvodid: null,
            showModeratorBoard: false,
            showAdminBoard: false,
            currentUser: undefined
            
           
        }
        this.insertProizvod= this.insertProizvod.bind(this); //13
        this.editProizvod = this.editProizvod.bind(this);
        this.deleteProizvod = this.deleteProizvod.bind(this);

    }

    componentDidMount(){
        ProizvodService.getProizvodi().then((response)=> {
            this.setState({proizvodi: response.data})
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

    insertProizvod() { 
        this.props.history.push('/add-proizvod');
    }

    editProizvod(id){
        this.props.history.push(`/update-proizvod/${id}`);
    }

    deleteProizvod(id){
        ProizvodService.deleteProizvod(id).then(res => {
            this.setState({proizvodi: this.state.proizvodi.filter(proizvod => proizvod.id !== id )});
            window.location.reload();

        });
    }

    changePage = event => {
        this.setState({
            [event.target.name]: parseInt(event.target.value)
        });
    };

    findByNaziv (search) {
        ProizvodService.getProizvodByNaziv(search).then((response)=> {
            this.setState({proizvodi: response.data})
        });

    }

    firstPage =() =>{
        if(this.state.currentPage >1){
            this.setState({
                currentPage:1
            });
        }
    };

    prevPage =() =>{
        if(this.state.currentPage >1){
            this.setState({
                currentPage: this.state.currentPage -1
            });
        }
    };

    lastPage =() =>{
        if(this.state.currentPage < Math.ceil(this.state.proizvodi.length / this.state.proizvodPerPage)){
            this.setState({
                currentPage: Math.ceil(this.state.proizvodi.length / this.state.proizvodPerPage)
            });
        }
    };

    nextPage =() =>{
        if(this.state.currentPage < Math.ceil(this.state.proizvodi.length / this.state.proizvodPerPage)){
            this.setState({
                currentPage: this.state.currentPage + 1
            });
        }
    };
     
     searchChange = event => { 
        this.setState({
            [event.target.name]: event.target.values
            });
        this.findByNaziv(event.target.values)
        };

    updateSearch(event) {
            this.setState({search: event.target.value.substr(0,20)});
        }

     cancelSearch =() => {
            this.setState({"search": ''});

        };
    
    dodajUKorpu =(id, userid) => {

     ProizvodService.getProizvodById(id).then((response)=> {
        let proizvod=response.data;
     
     AuthService.getUserByID(userid).then((res)=>{
        let user=res.data;

        let pproizvod ={proizvod: proizvod,
                        user: user};

        PoruceniProizvodService.addPoruceniProizvod(pproizvod);
        console.log('reponse=> ' + JSON.stringify(pproizvod))
        })
    })
   
    };  
            
    

    render (){
        const{proizvodi, currentPage, proizvodPerPage,showModeratorBoard, showAdminBoard,currentUser}= this.state;

        let filteredProizvoid = proizvodi.filter(
            (proizvod)  => {
                return proizvod.naziv.toLowerCase().indexOf(
                    this.state.search.toLowerCase()) !== -1;
                
            }
        )
        const lastIndex = currentPage * proizvodPerPage;
        const firstIndex = lastIndex - proizvodPerPage;
        const currentProizvodi = filteredProizvoid.slice(firstIndex,lastIndex);
        const totalPages = Math.ceil(proizvodi.length / proizvodPerPage);

       
        const renderCard = (proizvodi, index) => {
            return (
                
                <div className="card border-secondary  3 text-center" style={{"maxWidth": "20rem", marginTop:"50px",marginLeft:"170px", marginRight:"50", backgroundColor:"wheat",fontFamily:"Quicksand,cursive", fontSize:"20px"}} key={index}  >
                  <div className="card-header" style={{fontFamily:"Quicksand,cursive", fontSize:"20px"}}>{proizvodi.naziv}</div>
                     <img className="card-img-top" alt="slika nije učitana!" src={proizvodi.slika}  />
                      <div className="card-img" variant="top" src="holder.js/100px180" />
                        <div className="card-body" >
                           <div className="card-title">{proizvodi.vrsta.nazivvrsteproizvoda}</div>
                            <div className="card-text">{proizvodi.cena + ".00 RSD"}</div>
                                    {((showModeratorBoard)  || ( showAdminBoard ) ) &&(
                                        <p className="card-text" style={{ fontSize:"15px"}}><small className="text-muted">Preostalo je {" " +proizvodi.kolicina} komada,    </small>
                                        <small className="text-muted">Dodao/da {" " +proizvodi.user.ime+ " " + proizvodi.user.prezime } </small></p>
                                        )}
                                    {((showModeratorBoard)  || ( showAdminBoard ) ) && (
                                    <div>
                                        <button onClick={ () => this.editProizvod(proizvodi.id)} className="btn btn-warning">Izmeni</button>
                                        <button onClick={ () => this.deleteProizvod(proizvodi.id)} className="btn btn-danger">Ukloni</button>
                                    </div>
                                     )}
                                     {currentUser ? (
                                      !showModeratorBoard && !showAdminBoard && (
                                             <div>
                                             <button style={{marginTop: "10px", marginLeft:"15px"}} className="btn btn-success" onClick={ () => this.dodajUKorpu(proizvodi.id, this.state.currentUser.id)}  data-toggle="modal" data-target="#exampleModal">Dodaj u korpu</button>
                                     </div>
                                       )  ):(
                                           <a>  </a>
                                       )}
                         </div>
                            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" 
                                aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div className="modal-dialog" role="document">
                                        <div className="modal-content">
                                            <div className="modal-body">
                                                Proizvod je uspešno dodat u korpu!
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-info" data-dismiss="modal">Close</button>
                                            </div>
                                        </div>
                                    </div>
                            </div>
                    </div>

                    );
                };
                return(
                <div style={{backgroundColor:"inherit"}}>
                <header className="page-header font-small blue pt-4">
                    <div style={{"float" : "right", marginRight:"30px"}}>
                        <div className="input-group input-group-sm mb-3">
                            <input className="form-control" placeholder="Search" name="search" value={this.state.search} 
                                onChange={this.updateSearch.bind(this)}/>
                                <div className="input-group-append">
                                    <button type="button" className="btn btn-dark"size="sm"  >
                                        <FontAwesomeIcon icon = {faSearch}/>
                                    </button>
                                    <button type="button" className="btn btn-danger"size="sm" onClick={this.cancelSearch}>
                                        <FontAwesomeIcon icon ={faTimes}/>
                                    </button>
                                    {((showModeratorBoard)  || ( showAdminBoard ) ) &&(
                                    <button type="button" className="btn btn-success" size="sm"  onClick={this.insertProizvod}>
                                        <FontAwesomeIcon icon ={faPlus}/> </button>
                                    )}
                                </div>
                        </div>
                     </div>
                </header>
            <div>
               <div className="card-columns grid" style={{marginTop:"10px"}} >{currentProizvodi.map(renderCard)}
               </div>;
            </div>
                            
             <footer className="page-footer font-small blue pt-4" style={{"marginTop" :"0px"}}>
                 <div style= {{"float": "left", fontStyle: "italic", fontSize:"20px", color:"white", marginLeft:"50px"}} >
                     Prikazana {currentPage}. stranica od {totalPages} 
                </div>
                <div style= {{"float": "right",backgroundColor:"inherit", marginRight:"50px"}}>
                     <div className="input-group input-group-sm mb-3">
                        <div className="input-group-prepend">
                            <button type="button" className="btn btn-dark" disabled= {currentPage===1 ? true:false}
                            onClick= {this.firstPage} >
                                <FontAwesomeIcon icon ={faFastBackward}/> First </button>
                            <button type="button" className="btn btn-dark" disabled= {currentPage===1 ? true:false}
                            onClick= {this.prevPage} >
                            <FontAwesomeIcon icon ={faStepBackward}/> Prev</button>
                        </div>
                    <input className="form-control" type="text" style={pageNummCss} name="currentPage" value={currentPage}
                        onChange={this.changePage} />
                    <div className="input-group-append">
                        <button type="button" className="btn btn-dark" disabled= {currentPage===totalPages ? true:false}
                        onClick= {this.nextPage} >
                        <FontAwesomeIcon icon ={faStepForward}/> Next </button>
                        <button type="button" className="btn btn-dark"  disabled= {currentPage=== totalPages ? true:false}
                        onClick= {this.lastPage} >
                        <FontAwesomeIcon icon ={faFastForward}/> Last</button>
                    </div>
                  </div>
                </div>
            </footer>
         </div>
        )
    }
}
export default Proizvod;
