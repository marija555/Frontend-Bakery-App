import axios from 'axios'


const pekara_rest_api_url= "http://localhost:8083/pekara";

class PekaraService {

   getPekare(){
       return axios.get(pekara_rest_api_url);
   }

   addPekara(pekara){
    return axios.post(pekara_rest_api_url, pekara);
    }

    getPekaraById(pekaraid){
        return axios.get(pekara_rest_api_url +'/'+ pekaraid);
    }

    updatePekara(pekara,pekaraid){   //17
        return axios.put(pekara_rest_api_url + '/' + pekaraid, pekara);
    }
    deletePekara(pekaraid){
        return axios.delete(pekara_rest_api_url + '/'+ pekaraid);
    }

}

export default new  PekaraService();