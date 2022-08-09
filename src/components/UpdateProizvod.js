import React, { Component } from 'react';
import AuthService from '../services/AuthService';
import ProizvodService from '../services/ProizvodService';
import VrstaService from '../services/VrstaService';

class UpdateProizvod extends Component {

    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id, 
            vrsta: null,
            naziv: '',
            cena: '',
            user: null,
            kolicina: '',
            vrste:[],
            allUsers: [],
            slika: '' 
           
          };
        
       this.changeNazivHandler=this.changeNazivHandler.bind(this);
       this.changeCenaHandler=this.changeCenaHandler.bind(this);
       this.changeKolicinaHandler=this.changeKolicinaHandler.bind(this);
       this.changeVrstaHandler= this.changeVrstaHandler.bind(this);
       this.changeUserHandler=this.changeUserHandler.bind(this);
       this.changeSlikaHandler=this.changeSlikaHandler.bind(this);


       this.updateProizvod= this.updateProizvod.bind(this);
    }

    componentDidMount(){
        ProizvodService.getProizvodById(this.state.id).then((res)=>{
            let proizvod = res.data;
            this.setState({naziv: proizvod.naziv, 
                cena: proizvod.cena ,
                kolicina: proizvod.kolicina,
                user: proizvod.user,
                vrsta: proizvod.vrsta,
                slika: proizvod.slika

                });
        });
        VrstaService.getVrste().then((response)=> {
            this.setState({vrste: response.data})
        });
        AuthService.getUsers().then((response)=> {
            this.setState({allUsers: response.data})

        });
    }

    updateProizvod= (e)=> {
        e.preventDefault();
        let proizvod={naziv: this.state.naziv, 
             cena: this.state.cena, 
             kolicina: this.state.kolicina,
             vrsta: this.state.vrsta,
             user: this.state.user,
             slika: this.state.slika
        };
        console.log('proizvod => ' + JSON.stringify(proizvod));

        ProizvodService.updateProizvod(proizvod,this.state.id).then(res =>{
            this.props.history.push('/proizvodi');
        });
    }
    changeNazivHandler=(event)=> {  
        this.setState({naziv: event.target.value});

    }
    changeCenaHandler=(event)=>{
        this.setState({cena: event.target.value});

    }
   changeVrstaHandler=(event)=>{
        this.setState({vrsta: event.target.value});

    }
    changeSlikaHandler =(event)=>{
        this.setState({slika: event.target.value});

    }

    cancel(){
        this.props.history.push('/proizvodi');

    }

    changeUserHandler=(event) => {
        let z =(event.target.value);
        AuthService.getUserByID(z).then((response)=> {
            this.setState({user: response.data})
       })
       console.log(this.state.user)
     }

     changeVrstaHandler= (event) =>{  
       
        let v =(event.target.value);
        VrstaService.getById(v).then((response)=> {
            this.setState({vrsta: response.data})
            })
       console.log(this.state.vrsta)
    
     };  

    changeKolicinaHandler=(event)=>{
        this.setState({kolicina: event.target.value});

    }
    render() {
        
    let  options= this.state.vrste;
    let options1 = this.state.allUsers;
        return (
            <div>
                <div className="container border-black" style={{fontFamily:"Quicksand, cursive"}}>
                    <div className="row">
                        <div className = "card col-md-6 offset-md-3 offset-md-3">
                        <h3 className="text-center" style={{marginTop:"50px"}}>Izmeni proizvod</h3>
                            <div className= "card-body" style={{marginTop:"-90px"}}>
                                <form>
                                    <div className="form-gorup">
                                        <label> Naziv: </label>
                                        <input placeholder="Naziv" name="naziv" className="form-control"
                                            value={this.state.naziv} onChange={this.changeNazivHandler}/>
                                    </div>
                                    <div className="select-container">
                                    <label> Vrsta: </label>
                                    <select className="form-control" id="vrsta" onChange={this.changeVrstaHandler}  >
                                        {options.map((option, index) => 
                                            <option  key = {index}   value={option.vrstaproizvodaid}> {option.nazivvrsteproizvoda}
                                            </option>
                                          )}
                                        </select>
                                         </div>
                                     <div className="form-group">
                                    <label> Zaposleni: </label>
                                    <select className="form-control" id="user"  onChange={this.changeUserHandler}>
                                        {options1.map((option1, index) => 
                                            <option  key = {index} value={option1.id}  defaultValue={this.state.id}> {option1.ime + " " +option1.prezime}
                                            </option>
                                          )}
                                        </select>
                                     </div>
                                    <div className="form-gorup">
                                        <label> Cena: </label>
                                        <input placeholder="Cena" name="cena" className="form-control"
                                            value={this.state.cena}  onChange={this.changeCenaHandler}/>
                                    </div>
                                    <div className="form-gorup">
                                        <label> Kolicina: </label>
                                        <input placeholder="Kolicina" name="kolicina" className="form-control"
                                            value={this.state.kolicina} onChange={this.changeKolicinaHandler}/>
                                    </div>
                                    <div className="form-gorup" style={{marginBottom:"25px"}}>
                                        <label> Url slike: </label>
                                        <input placeholder="Slika" name="slika" className="form-control"
                                            value={this.state.slika}  onChange={this.changeSlikaHandler}/>
                                    </div>
                                    <button className="btn btn-success"  style= {{marginLeft:"150px"}}onClick={this.updateProizvod}>Sačuvaj</button>
                                    <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft:"10px"}}>Poništi</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default UpdateProizvod;
