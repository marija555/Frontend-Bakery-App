import axios from 'axios'


const dostavljac_rest_api_url= "http://localhost:8083/dostavljac";

class DostavljacService  {

    getDostavljaci(){
        return axios.get(dostavljac_rest_api_url);
    }
   
    getDostavljacById(id){
            return axios.get(dostavljac_rest_api_url +'/'+ id);
        }
    
 
}

export default new DostavljacService();