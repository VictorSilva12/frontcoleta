import React from 'react';
//import axios from 'axios'
import authservice from '../../services/authservice'
import '../../styles/agendamento.css'
import axios from 'axios'
import authHeader from '../../helpers/auth-header'
import '../../styles/visualizarassociados.css'
import CheckboxGroup from 'react-checkbox-group'

class VisualizarAssociado_Form extends React.Component {
    constructor(props){
        super(props);
        this.head=false;
        this.state={
            userId:'',
            nome:'',
            cpf:'',
            email:'',
            isSearch: false,
            searchRes: false,
            arrUser: [],
            userbuttonid: '',
            value:''
        }
        this.Usuarios = this.Usuarios.bind(this)
        this.btnPesquisarOnClick = this.btnPesquisarOnClick.bind(this)
        this.HandleSearch = this.HandleSearch.bind(this)
        this.onUserIdChange = this.onUserIdChange.bind(this)

    }
  
    componentDidMount() {
        this.Usuarios();
    }
    btnPesquisarOnClick = (e) =>{
        e.preventDefault();
        this.setState({ isSearch: true })
    }
    onUserIdChange = (e) => {
        const userId = e.target.value.trim();
        this.setState(()=>({userId}))
    }

    onUserButtonIdChange = (e) => {
        const userbuttonid = e.target.value.trim();
        this.setState(()=>({userbuttonid}))
    }

    HandleSearch = (e) => {
        e.preventDefault();
        const Authorization = authHeader().token;
        axios.get('http://localhost:3100/api/usuario/'+this.state.userId, {
            headers:{
                'Content-Type':'application/json',
                Authorization
            }
        })
        .then((response)=>{
            this.setState({
                nome: response.data.user.nome,
                cpf: response.data.user.cpf,
                email: response.data.user.email,
                searchRes: true
            })        
        })
        .catch((err)=>{
            alert(JSON.stringify(err.response.data))
        })
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
    HandleExcluir = (e) =>{
        e.preventDefault();
        const Authorization = authHeader().token;
        axios.delete('http://localhost:3100/api/usuario/'+this.state.userId, {
            headers:{
                'Content-Type':'application/json',
                Authorization
            }
        }).then(()=>{
            alert('Associado Deletado com Sucesso')
            this.props.history.push(`/`)
        })
    }
    HandleCancelar = (e) =>{
        e.preventDefault();
        this.props.history.push('/perfil')
    }
    render(){
            return(
                <form class='visu_container'>
                    <div class='visu_box' >
                        <button onClick={this.btnPesquisarOnClick}>Pesquisar</button>
                        {this.state.isSearch ? (
                            <ul>
                                <div>
                                    <h3>Pesquisar Associado</h3>
                                    <input
                                        class='visu_input'
                                        type="text"
                                        value={this.state.userId}
                                        onChange={this.onUserIdChange}
                                        required
                                    />
                                    <button class='visu_button' onClick={this.HandleSearch}>Pesquisar</button>
                                </div>
                            </ul>):(
                            <ul>
                                {
                                    this.state.arrUser.map((user, i)=>{
                                        return (
                                            <li class='user' key={i}>
                                                <input
                                                    type="checkbox" 
                                                    name={i}
                                                    value={user._id}
                                                    class='visu_buttonExcluir'
                                                />
                                                {user.administrador ? (
                                                        <label>Usuario: {user.nome} Id: {user._id} ADM</label>
                                                    ):(
                                                        <label>Usuario: {user.nome} Id: {user._id} Associado</label>
                                                    )
                                                }
                                            </li>
                                        )
                                    }) 
                                }
                            </ul>
                            )
                        }
                        {this.state.searchRes ? (
                            <div class='user'>
                                <h1>{this.state.nome}</h1>
                                <h2>{this.state.cpf}</h2>
                                <h2>{this.state.email}</h2>
                                <h6>Excluir<p><button onClick={this.HandleExcluir}>Confirmar</button><button onClick={this.HandleCancelar}>Cancelar</button></p></h6>
                            </div>
                            ):(
                                null
                            )
                        }
                    </div>
                </form>
            ) 
    }
}

export default VisualizarAssociado_Form;