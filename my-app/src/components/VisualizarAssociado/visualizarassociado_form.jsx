import React from 'react';
//import axios from 'axios'
import authservice from '../../services/authservice'
import '../../styles/agendamento.css'
import axios from 'axios'
import authHeader from '../../helpers/auth-header'
import '../../styles/visualizarassociados.css'
import CheckboxGroup from 'react-checkbox-group'

class Agendamento_Form extends React.Component {
    constructor(props){
        super(props);
        this.head=false;
        this.state={
            userId:'',
            isSearch: false,
            arrUser: [],
            userbuttonid: '',
            value:''
        }
        this.Usuarios = this.Usuarios.bind(this)

    }
  
    componentDidMount() {
        this.Usuarios();
    }

    onUserIdChange = (e) => {
        const userId = e.target.value.trim();
        this.setState(()=>({userId}))
    }

    onUserButtonIdChange = (e) => {
        const userbuttonid = e.target.value.trim();
        this.setState(()=>({userbuttonid}))
    }

    HandleSearch = () => {
        axios.get('http://localhost:3100/api/usuario/'+this.userId)
        .then((response)=>{
            alert(JSON.stringify(response))
            return response
        })
        .catch()
    }
    Usuarios = async () =>{
        try{
            const Authorization = authHeader().token;
            const res = await axios.get('http://localhost:3100/api/usuario', {
                headers:{
                    'Content-Type':'application/json',
                    Authorization
                }
            })
            this.setState({
                arrUser: res.data.user
            })
        }
        catch(err){
            console.log(err);
        }
        
    }

    render(){
        if(!this.state.isSearch){
            return(
                <form class='visu_container'>
                    <ul class='visu_box'>
                        {
                            this.state.arrUser.map((user, i)=>{
                                return (
                                    <li class='user'>
                                        <input
                                            type="checkbox" 
                                            name={i}
                                            value={user._id}
                                            class='visu_buttonExcluir'
                                        />
                                        <span> 	&nbsp; 	&nbsp;</span>
                                        <label>Usuario: {user.nome}</label>
                                        <span> 	&nbsp;/ 	&nbsp;</span>
                                        <label>Id: {user._id}</label>
                                    </li>
                                )
                            })
                            
                        }
                    </ul>
                </form>
            )
        }
        else{
            return(
                <div>
                    <label>Pesquisar Associado</label>
                    <input
                     type="text"
                     required
                    />
                    //<button onClick='HandleSearch();'></button>
                </div>
            )
        }   
    }
}

export default Agendamento_Form;