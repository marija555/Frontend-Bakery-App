import axios from 'axios';

const porudzbina_rest_api_url= "http://localhost:8083/porudzbina";


class PorudzbinaService {

   getPorudzbine(){
       return axios.get(porudzbina_rest_api_url);
   }
   getPorudzbinaById(id){
    return axios.get(porudzbina_rest_api_url +'/'+ id);
   }
   addPorudzbina(porudzbina){
    return axios.post(porudzbina_rest_api_url, porudzbina);
    }
    deletePorudzbina(id){
        return axios.delete(porudzbina_rest_api_url + '/'+ id);
    }


}
export default new  PorudzbinaService();