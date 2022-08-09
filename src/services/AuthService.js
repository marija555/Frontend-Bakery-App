import axios from "axios";
const API_URL = "http://localhost:8083/api/auth/";

class AuthService {
    login(username, password) {
      return axios
        .post(API_URL + "signin", {
          username,
          password
        })
        .then(response => {
          if (response.data.accessToken) {
            localStorage.setItem("user", JSON.stringify(response.data));
          }
  
          return response.data;
        });
    }
   
    logout() {
      localStorage.removeItem("user");
    }
  
   register(username, password,adresa,ime, prezime,brkreditnekartice,jmbg,role) {
      return axios.post(API_URL + "signup", {
        username,
        password,
        adresa,
        ime,
        prezime,
        brkreditnekartice,
        jmbg,role
      });
    }
  
    getCurrentUser() {
      return JSON.parse(localStorage.getItem('user'));;
    }

    getUserByID(id){ 
      return axios.get(API_URL + 'user/' + id);
    }
    getUsers(){
      return axios.get(API_URL + 'users');
  }
    deleteUser(id){
      return axios.delete(API_URL + 'user/' + id);
  }
  
  }
  
  export default new AuthService();