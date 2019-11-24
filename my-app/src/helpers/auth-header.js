
const authHeader = () =>{
    //localStorage.getItem('userToken')
    let user = localStorage.getItem('userToken');
    if(user) {
        let bearer = {
            token: 'Bearer '+user
        }
        return bearer;
    }
    else{
        return { };
    }
}

export default authHeader;