import decode from 'jwt-decode';
import axios from 'axios'
class AuthService {

    async login(email, senha) {
        const body={
            email: email,
            senha: senha
        }
        // Get a token from api server using the fetch api
        await axios.post('http://localhost:3100/api/auth/logon', body,{
            headers:{
                'Content-Type':'application/json',
            }
        })
        .then((response) =>{
            //alert(JSON.stringify(response.data.data.user))
            localStorage.setItem('userToken', response.data.data.token)
            return response.data
        })
        .catch((response)=> {
            alert(response.data.erros)
            console.log(response.data.erros)
            return response.data.erros
        }) 
    }

    loggedIn() {
        // Checks if there is a saved token and it's still valid
        const token = this.getToken() // GEtting token from localstorage
        if(token!==undefined && this.TokenExpirado()!==true)
        {
            return true;
        }
        else{
            return false;
        }
    }
    decoded(){
        return decode(this.getToken());
    }
    TokenExpirado(token) {
        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now() / 1000) { // Checking if token is expired. N
                return true;
            }
            else
                return false;
        }
        catch (err) {
            return false;
        }
    }

    setToken(token) {
        // Saves user token to localStorage
        localStorage.setItem('userToken', token)
    }

    getToken() {
        // Retrieves the user token from localStorage
        return localStorage.getItem('userToken')
    }

    logout() {
        // Clear user token and profile data from localStorage
        localStorage.removeItem('userToken');
    }

    getProfile() {
        // Using jwt-decode npm package to decode the token
        return decode(this.getToken());
    }

    _checkStatus(response) {
        // raises an error in case response status is not a success
        if (response.status >= 200 && response.status < 300) { // Success status lies between 200 to 300
            return response
        } else {
            var error = new Error(response.statusText)
            error.response = response
            throw error
        }
    }
}

export default AuthService;