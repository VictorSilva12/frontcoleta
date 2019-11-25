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
        this.state={
            agendamentoId:'',
            isSearch: false,
            arrAgendamento: [],
            userbuttonid: '',
            value:'',
            enderecoRua:'',
            enderecoNum:'',
            enderecoBairro:'',

        }
        this.Agendamentos = this.Agendamentos.bind(this)
        this.btnPesquisarOnClick = this.btnPesquisarOnClick.bind(this)
        this.HandleSearch = this.HandleSearch.bind(this)
        this.onAgendamentoIdChange = this.onAgendamentoIdChange.bind(this)
    }
  
    componentDidMount() {
        this.Agendamentos();
    }
    btnPesquisarOnClick = (e) =>{
        e.preventDefault();
        this.setState({ isSearch: true })
    }
    onAgendamentoIdChange = (e) => {
        const agendamentoId = e.target.value.trim();
        this.setState(()=>({agendamentoId}))
    }
    onUserButtonIdChange = (e) => {
        const userbuttonid = e.target.value.trim();
        this.setState(()=>({userbuttonid}))
    }

    onRuaChange = (e) =>{
        const enderecoRua = e.target.value.trim();
        this.setState(()=>({enderecoRua}))
    }
    onNumChange = (e) =>{
        const enderecoNum = e.target.value.trim();
        this.setState(()=>({enderecoNum}))
    }
    onBairroChange = (e) =>{
        const enderecoBairro = e.target.value.trim();
        this.setState(()=>({enderecoBairro}))
    }
    onCidadeChange = (e) =>{
        const enderecoCidade = e.target.value.trim();
        this.setState(()=>({enderecoCidade}))
    }
    onEstadoChange = (e) =>{
        const enderecoEstado = e.target.value.trim();
        this.setState(()=>({enderecoEstado}))
    }
    onDataChange = (e) =>{
        const agendadoPara = e.target.value.trim();
        this.setState(()=>({agendadoPara}))
    }

    HandleExcluir = (e) =>{
        e.preventDefault();
        const Authorization = authHeader().token;
        axios.delete('http://localhost:3100/api/agendamento/'+this.state.agendamentoId, {
            headers:{
                'Content-Type':'application/json',
                Authorization
            }
        }).then(()=>{
            alert('Agendamento Deletado com Sucesso')
            this.props.history.push(`/`)
        })
    }
    HandleAlterar = (e) =>{
        e.preventDefault();
        const Authorization = authHeader().token;
        axios.put('http://localhost:3100/api/agendamento/'+this.state.agendamentoId, {
            headers:{
                'Content-Type':'application/json',
                Authorization
            }
        }).then(()=>{
            alert('Agendamento Alterado com Sucesso')
            this.props.history.push(`/`)
        })
    }
    HandleCancelar = (e) =>{
        e.preventDefault();
        this.props.history.push('/perfil')
    }
    HandleSearch = (e) => {
        e.preventDefault();
        const Authorization = authHeader().token;
        axios.get('http://localhost:3100/api/agendamento/'+this.state.agendamentoId, {
            headers:{
                'Content-Type':'application/json',
                Authorization
            }
        })
        .then((response)=>{
            alert(JSON.stringify(response.data))
            if(response.data.agendamento=!null)
            {
                this.setState({
                    id: response.data.agendamento._id,
                    associadoUser: response.data.agendamento.associadoUser.nome,
                    criadoPor: response.data.agendamento.criadoPor.nome,
                    enderecoRua: response.data.agendamento.enderecoRua,
                    enderecoNum: response.data.agendamento.enderecoNum,
                    enderecoBairro: response.data.agendamento.enderecoBairro,
                    enderecoCidade: response.data.agendamento.enderecoCidade,
                    enderecoEstado: response.data.agendamento.enderecoEstado,
                    agendadoPara: response.data.agendamento.enderecoNum,
                    searchRes: true
                })
            }
            else{
                alert('Agendamento não encontrado')
            }
        })
        .catch((err)=>{
            alert('Id de agendamento inexistente')
        })
    }
    Agendamentos = async () =>{
        try{
            const Authorization = authHeader().token;
            const res = await axios.get('http://localhost:3100/api/agendamento', {
                headers:{
                    'Content-Type':'application/json',
                    Authorization
                }
            })
            this.setState({
                arrAgendamento: res.data.agendamentos
            })
        }
        catch(err){
            console.log(err);
        }
        
    }

    render(){
        return(
            <form class='visu_container'>
                    <div class='visu_box' >
                        <button onClick={this.btnPesquisarOnClick}>Pesquisar</button>
                        {this.state.isSearch ? (
                            <ul>
                                <div>
                                    <h3>Pesquisar Agendamento</h3>
                                    <input
                                        class='visu_input'
                                        type="text"
                                        value={this.state.agendamentoId}
                                        onChange={this.onAgendamentoIdChange}
                                        required
                                    />
                                    <button class='visu_button' onClick={this.HandleSearch}>Pesquisar</button>
                                </div>
                            </ul>):(
                            <ul>
                                {
                                    this.state.arrAgendamento.map((agendamento, i)=>{
                                        return (
                                            <li class='user'>
                                                <header>Id: {agendamento._id}</header>
                                                <p>Agendamento feito por {agendamento.criadoPor.nome}, para o associado {agendamento.associadoUser.nome}</p>
                                                <p>
                                                    <p> Local: Rua {agendamento.enderecoRua} Numero {agendamento.enderecoNum}&nbsp;
                                                        Bairro {agendamento.enderecoBairro} Cidade {agendamento.enderecoCidade}&nbsp;
                                                        Estado {agendamento.enderecoEstado}.
                                                    </p>
                                                    <p>Agendamento marcado para: {agendamento.agendadoPara}</p>
                                                </p>
                                            </li>
                                        )
                                    })  
                                }
                            </ul>
                            )
                        }
                        {this.state.searchRes ? (
                            <div class='user'>
                                <h6>Alterar<p><button onClick={this.HandleAlterar}>Confirmar</button><button onClick={this.HandleCancelar}>Cancelar</button></p></h6>
                                <header>Id: {this.state.id}</header>
                                <p>Agendamento feito por {this.state.criadoPor}, para o associado {this.state.associadoUser}</p>
                                <p>
                                    <p> Local: Rua <input type='text' value={this.state.enderecoRua} onChange={this.onRuaChange} /> Numero <input type='number' value={this.state.enderecoNum} onChange={this.onNumChange}/>&nbsp;
                                        Bairro <input type='text' value={this.state.enderecoBairro} onChange={this.onBairroChange}/> Cidade <input type='text' value={this.state.enderecoCidade} onChange={this.onCidadeChange}/>&nbsp;
                                        Estado <input type='text' value={this.state.enderecoEstado} onChange={this.onEstadoChange}/>.
                                    </p>
                                    <p>Agendamento marcado para: <input type='date' value={this.state.agendadoPara} onChange={this.onDataChange}/></p>
                                </p>
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

export default Agendamento_Form;