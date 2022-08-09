import axios from 'axios';

const proizvod_rest_api_url= "http://localhost:8083/proizvod";


class ProizvodService {

   getProizvodi(){
       return axios.get(proizvod_rest_api_url);
   }

   addProizvod(proizvod){
       return axios.post(proizvod_rest_api_url, proizvod);

   }
   getProizvodById(id){
    return axios.get(proizvod_rest_api_url +'/'+ id);
   }

   getProizvodByNaziv(naziv){  
    return axios.get('http://localhost:8083/proizvodNaziv/' + naziv)
   }

   proizvodByVrsta(vrsta){
    return axios.get(proizvod_rest_api_url +'/ByVrsta'+ vrsta);

   }

    updateProizvod(proizvod, id){   
        return axios.put(proizvod_rest_api_url + '/' + id, proizvod);
    }
    deleteProizvod(id){
        return axios.delete(proizvod_rest_api_url + '/'+ id);
    }

    
    }

export default new  ProizvodService();