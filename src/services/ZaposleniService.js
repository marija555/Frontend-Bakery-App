import axios from 'axios'


const zaposleni_rest_api_url= "http://localhost:8083/zaposleni";

class ZaposleniService {
   
    getZaposleni(){
        return axios.get(zaposleni_rest_api_url);
    }
 
    getById (id){
        return axios.get(zaposleni_rest_api_url + '/' + id);
    }
    
}

export default new ZaposleniService();