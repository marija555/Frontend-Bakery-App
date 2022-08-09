 /*eslint-disable jsx-a11y/anchor-is-valid */
import ProizvodService from '../services/ProizvodService';
import React, { Component } from 'react';
import VrstaService from '../services/VrstaService';
import AuthService from '../services/AuthService';

//15

class CreateProizvod extends Component {
    
    constructor(props) {
        super(props)  
          this.state = {
            naziv: ' ',
            vrsta: null,
            user: null,
            kolicina: ' ',
            cena: ' ',
            selectedOption: '',
            vrste:[],
            allUsers: [],
            slika: ''
          
        }
        this.changeVrstaHandler=this.changeVrstaHandler.bind(this);
          this.changeNazivHandler=this.changeNazivHandler.bind(this);
          this.changeCenaHandler=this.changeCenaHandler.bind(this);
          this.changeKolicinaHandler=this.changeKolicinaHandler.bind(this);
          this.changeUserHandler=this.changeUserHandler.bind(this);
          this.changeSlikaHandler=this.changeSlikaHandler.bind(this);


         this.saveProizvod= this.saveProizvod.bind(this);
    }

    componentDidMount(){
        VrstaService.getVrste().then((response)=> {
            this.setState({vrste: response.data})
        });

        AuthService.getUsers().then((response)=> {
            this.setState({allUsers: response.data})
                  
        });

    }

     changeCenaHandler=(event)=>{
       this.setState({cena: event.target.value});

     }
     changeSlikaHandler=(event)=>{
        this.setState({slika: event.target.value});
 
      }

    changeKolicinaHandler=(event)=> {  
        this.setState({kolicina: event.target.value});

    }
    changeNazivHandler=(event)=> {  
            this.setState({naziv: event.target.value});
    }
    changeVrstaHandler= (event) =>{  
        /*this.setState({vrsta:{nazivvrsteproizvoda: event.target.value}}
        );
        console.log('vrsta => ' + JSON.stringify(this.state.vrsta.nazivvrsteproizvoda));*/

        let v =(event.target.value);
        VrstaService.getById(v).then((response)=> {
            this.setState({vrsta: response.data})
            })
       console.log(this.state.vrsta)
    
     };  

     changeUserHandler=(event) => {
        let z =(event.target.value);
        AuthService.getUserByID(z).then((response)=> {
            this.setState({user: response.data})
       })
       console.log(this.state.user)
     }
        /*let vrsta = this.vrste.find(v => v.vrsta.nazivvrsteproizvoda === nazivv);
        this.setState({
          value: vrsta*/
        
       /* const vrstaproizvodaid = event.target.value;
        const vrsta = this.vrsta.find(v => v.id === vrstaproizvodaid);
        this.setState({
          value: vrsta
        })*/
    
    cancel(){
        this.props.history.push('/proizvodi');
    }
    saveProizvod= (e)=> {
        e.preventDefault();
        let proizvod={naziv: this.state.naziv,
             vrsta: this.state.vrsta,
              cena: this.state.cena,
              kolicina: this.state.kolicina,
              user:this.state.user,
              slika: this.state.slika
            }
        console.log('proizvod => ' + JSON.stringify(proizvod));

        ProizvodService.addProizvod(proizvod).then(res =>{
            this.props.history.push('/proizvodi');
        });
    }
  /*  onChange = e => {
        const {name,value} = e.target;
        this.setState({ 
        [name]:value
        }) 
        }*/
        
   render() {

    let  options= this.state.vrste;
    let options1 = this.state.allUsers;

        return (
            <div>
                <div className="container" style={{fontFamily:"Quicksand,cursive",fontSize:"18px"}}>
                    <div className="row">
                        <div className = "card col-md-6 offset-md-3 offset-md-3">
                        <h3 className="text-center">Unesi podatke o proizvodu</h3>
                            <div className= "card-body">
                                <form>
                                    <div className="form-group" >
                                        <label> Naziv: </label>
                                        <input placeholder="Naziv" name="naziv" className="form-control"
                                            value={this.state.naziv} onChange={this.changeNazivHandler}/>
                                    </div>
                                    <div className="form-group">
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
                                            <option  key = {index} value={option1.id}  defaultValue={index === 0}> {option1.ime + " " +option1.prezime}
                                            </option>
                                          )}
                                        </select>
                                     </div>
                                      <div className="form-group">
                                        <label> Kolicina: </label>
                                        <input placeholder="Kolicina" name="kolicina" className="form-control"
                                            value={this.state.kolicina} onChange={this.changeKolicinaHandler}/>
                                        </div>
                                   
                                    <div className="form-group">
                                        <label> Cena: </label>
                                        <input placeholder="Cena" name="cena" className="form-control"
                                            value={this.state.cena} onChange={this.changeCenaHandler}/>
                                    </div>
                                    <div className="form-group">
                                        <label> Url slike: </label>
                                        <input placeholder="Slika" name="Slika" className="form-control"
                                            value={this.state.slika} onChange={this.changeSlikaHandler}/>
                                    </div>
                                   
                                    <button className="btn btn-success"style={{marginTop:"10px", marginLeft:"150px"}} onClick={this.saveProizvod}>Sačuvaj</button>
                                    <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft:"10px", marginTop:"10px"}}>Poništi</button>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CreateProizvod;