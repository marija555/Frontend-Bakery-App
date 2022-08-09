import axios from 'axios'


const vrsta_rest_api_url= "http://localhost:8083/vrstaproizvoda"; // dali su ' ili ""



class VrstaService {

   getVrste(){
       return axios.get(vrsta_rest_api_url);
   }

   getById(id){
    return axios.get(vrsta_rest_api_url + '/' + id);

   }

   getVrstaByNazivvrste(naziv){

    return axios.get(vrsta_rest_api_url+ 'Naziv/' + naziv);

   }
  /* getVrstaByProizvod(){

        return axios.
   }*/
}


export default new  VrstaService();