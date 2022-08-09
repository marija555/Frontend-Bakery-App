import axios from 'axios';

const pproizvod_rest_api_url= "http://localhost:8083/poruceniproizvod";


class PoruceniProizvodService {

   getPoruceniProizvodi(){
       return axios.get(pproizvod_rest_api_url);
   }

   addPoruceniProizvod(pproizvod){
    return axios.post(pproizvod_rest_api_url, pproizvod);
   }

   getPProizvodById(id){
    return axios.get(pproizvod_rest_api_url +'/'+ id);
   }

   deletePProizvod(id){
    return axios.delete(pproizvod_rest_api_url + '/'+ id);
    }

    deletePProizvodByUser(id){
        return axios.delete(pproizvod_rest_api_url + 'User/'+ id);
    }
    updatePProizvod(poruceniproizvodi, proizvod){   
        return axios.put(pproizvod_rest_api_url  +'All', poruceniproizvodi, proizvod);
    }
}
export default new PoruceniProizvodService();