import React, { Component } from 'react';
import PekaraService from '../services/PekaraService';


class UpdatePekara extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,  //uzimamo id 
             nazivpekare: ' ',
              ulica: ' ',
              grad: ' ',
              kontaktpekare:' ' 
          };
        
       this.changeNazivHandler=this.changeNazivHandler.bind(this);
       this.changeUlicaHandler=this.changeUlicaHandler.bind(this);
       this.changeGradHandler=this.changeGradHandler.bind(this);
       this.changeKontaktHandler=this.changeKontaktHandler.bind(this);

       this.updatePekara= this.updatePekara.bind(this);
    }

    componentDidMount(){
        PekaraService.getPekaraById(this.state.id).then((res)=>{
            let pekara = res.data;
            this.setState({nazivpekare: pekara.nazivpekare, 
                ulica: pekara.ulica, 
                grad: pekara.grad,
                kontaktpekare: pekara.kontaktpekare
            });

        });
    }

    updatePekara= (e)=> {
        e.preventDefault();
        let pekara={nazivpekare: this.state.nazivpekare,
             ulica: this.state.ulica,
              grad: this.state.grad,
              kontaktpekare: this.state.kontaktpekare};
        console.log('pekara => ' + JSON.stringify(pekara));

        PekaraService.updatePekara(pekara,this.state.id).then(res =>{
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
                <div className="container" style={{fontFamily:"Quicksand, cursive"}}>
                    <div className="row">
                        <div className = "card col-md-6 offset-md-3 offset-md-3">
                        <h3 className="text-center" >Izmeni pekaru {"'" +this.state.nazivpekare +"'"}</h3>
                            <div className= "card-body"style={{marginTop:"0px"}}>
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
                                    <div className="button-group" style={{"marginLeft":"150px", marginTop:"20px"}}>
                                    <button className="btn btn-success" onClick={this.updatePekara}>Sačuvaj</button>
                                    <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft:"10px"}}>Poništi</button>
                                     </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default UpdatePekara;