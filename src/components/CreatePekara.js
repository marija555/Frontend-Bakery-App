import PekaraService from '../services/PekaraService';
import React, { Component } from 'react';
//15
//treba da se odabere vrsta kao od check, izbacuje gresku kad se ubaci zbog str kljuca
class CreatePekara extends Component {
    
  constructor(props) {
        super(props)

        this.state = {
             nazivpekare: ' ',
              ulica: ' ',
              grad: ' ',
              kontaktpekare:' ' 
          };
        
       this.changeNazivHandler=this.changeNazivHandler.bind(this);
       this.changeUlicaHandler=this.changeUlicaHandler.bind(this);
       this.changeGradHandler=this.changeGradHandler.bind(this);
       this.changeKontaktHandler=this.changeKontaktHandler.bind(this);

       this.savePekara= this.savePekara.bind(this);
      }
     savePekara= (e)=> {
        e.preventDefault();
        let pekara={nazivpekare: this.state.nazivpekare,
             ulica: this.state.ulica,
              grad: this.state.grad,
              kontaktpekare: this.state.kontaktpekare};
        console.log('pekara => ' + JSON.stringify(pekara));

        PekaraService.addPekara(pekara).then(res =>{
            this.props.history.push('/pekare');
        });
      }

     changeNazivHandler=(event)=> {  
            this.setState({nazivpekare: event.target.value});

     }
     changeUlicaHandler=(event)=>{
        this.setState({ulica: event.target.value});

    }
    changeGradHandler=(event)=>{
        this.setState({grad: event.target.value});
    }
    changeKontaktHandler=(event)=>{
        this.setState({kontaktpekare: event.target.value});
    }
    cancel(){
        this.props.history.push('/pekare');

    }
  /*  onChange = e => {
        const {name,value} = e.target;
        this.setState({
        [name]:value
        })
        }*/

    render() {
        return (
            <div>
                <div className="container" style={{fontFamily:"Quicksand,cursive",fontSize:"18px"}} >
                    <div className="row">
                        <div className = "card col-md-6 offset-md-3 offset-md-3">
                        <h3 className="text-center" >Unesite podatke o pekari</h3>
                            <div className= "card-body">
                                <form>
                                    <div className="form-gorup" >
                                        <label> Naziv: </label>
                                        <input placeholder="Naziv" name="nazivpekare" className="form-control"
                                            value={this.state.nazivpekare} onChange={this.changeNazivHandler}/>
                                    </div>
                                    <div className="form-gorup">
                                        <label> Ulica: </label>
                                        <input placeholder= "Ulica" name="ulica" className="form-control"
                                            value={this.state.ulica} onChange={this.changeUlicaHandler}/>
                                    </div>
                                    <div className="form-gorup">
                                        <label> Grad: </label>
                                        <input placeholder="Grad" name="grad" className="form-control"
                                            value={this.state.grad} onChange={this.changeGradHandler}/>
                                    </div>
                                    <div className="form-gorup">
                                        <label> Kontakt: </label>
                                        <input placeholder="Kontakt" name="kontaktpekare" className="form-control"
                                            value={this.state.kontaktpekare} onChange={this.changeKontaktHandler}/>
                                    </div>
                                    <button className="btn btn-success" style={{marginTop:"10px", marginLeft:"150px"}} onClick={this.savePekara}>Sacuvaj</button>
                                    <button className="btn btn-danger" style={{marginLeft:"10px", marginTop:"10px"}} onClick={this.cancel.bind(this)} >Ponisti</button>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ); 
    }
}

export default CreatePekara;