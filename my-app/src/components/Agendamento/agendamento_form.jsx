import React from 'react';
//import axios from 'axios'
import authservice from '../../services/authservice'
import '../../styles/agendamento.css'
import axios from 'axios'
import authHeader from '../../helpers/auth-header'
class Agendamento_Form extends React.Component {
    constructor(props){
        super(props);

        this.state={
            descricao:'',
            enderecoRua:'',
            enderecoNum:'',
            enderecoComplemento:'',
            enderecoBairro:'',
            enderecoCidade:'',
            enderecoEstado:'',
            agendadoPara:'',
            userId:''
        };
        this.auth = new authservice();
        this.onDescricaoChange = this.onDescricaoChange.bind(this)
        this.onEnderecoRuaChange = this.onEnderecoRuaChange.bind(this)
        this.onEnderecoNumChange = this.onEnderecoNumChange.bind(this)
        this.onEnderecoComplementoChange = this.onEnderecoComplementoChange.bind(this)
        this.onEnderecoBairroChange = this.onEnderecoBairroChange.bind(this)
        this.onEnderecoCidadeChange = this.onEnderecoCidadeChange.bind(this)
        this.onEnderecoEstadoChange = this.onEnderecoEstadoChange.bind(this)
        this.onAgendadoParaChange = this.onAgendadoParaChange.bind(this)
        this.onUserIdChange = this.onUserIdChange.bind(this)
    }
    onDescricaoChange = (e) => {
        const descricao = e.target.value.trim();
        this.setState(()=>({descricao}))
    }
    onEnderecoRuaChange = (e) =>{
        const enderecoRua = e.target.value.trim();
        this.setState(()=>({enderecoRua}))
    }
    onEnderecoNumChange = (e) =>{
        const enderecoNum = e.target.value.trim();
        this.setState(()=>({enderecoNum}))
    }
    onEnderecoComplementoChange = (e) =>{
        const enderecoComplemento = e.target.value.trim();
        this.setState(()=>({enderecoComplemento}))
    }
    onEnderecoBairroChange = (e) =>{
        const enderecoBairro = e.target.value.trim();
        this.setState(()=>({enderecoBairro}))
    }
    onEnderecoCidadeChange = (e) =>{
        const enderecoCidade = e.target.value.trim();
        this.setState(()=>({enderecoCidade}))
    }
    onEnderecoEstadoChange = (e) =>{
        const enderecoEstado = e.target.value.trim();
        this.setState(()=>({enderecoEstado}))
    }
    onAgendadoParaChange = (e) =>{
        const agendadoPara = e.target.value.trim();
        this.setState(()=>({agendadoPara}))
    }
    onUserIdChange = (e) =>{
        const userId = e.target.value.trim();
        this.setState(()=>({userId}))
    }
    HandleSubmit = async (e) =>{
        e.preventDefault();

        const body={
            descricao: this.state.descricao,
            enderecoRua: this.state.enderecoRua,
            enderecoNum: this.state.enderecoNum,
            enderecoComplemento: this.state.enderecoComplemento,
            enderecoBairro: this.state.enderecoBairro,
            enderecoCidade: this.state.enderecoCidade,
            enderecoEstado: this.state.enderecoEstado,
            agendadoPara: this.state.agendadoPara
        }
        const Authorization = authHeader().token;
        //alert(Authorization)
       axios.post('http://localhost:3100/api/agendamento/'+this.state.userId, body, {
           headers:{
               'Content-Type':'application/json',
                Authorization
           }
       }
       )
          .then((response) => this.props.history.push("/"))
          .catch(err => console.log(err.response))
        
    };
    render(){
        return(
            <div class='ag_container'>
                <form onSubmit={this.HandleSubmit} class='form_ag'>
                    <div class='ag_group'>
                        <p>Informe o Id do Usuario que voce deseja associar o Agendamento</p>
                        <input 
                            type="text"
                            value={this.state.userId}
                            onChange={this.onUserIdChange}
                            required
                            class='input_ag'
                        />
                    </div>
                    <div class='ag_group'>
                        <p>Rua</p>
                        <input 
                            type="text"
                            value={this.state.enderecoRua}
                            onChange={this.onEnderecoRuaChange}
                            required
                            class='input_ag'
                        />
                    </div>
                    <div class='ag_group'>
                        <p >Numero</p>
                        <input 
                            type="number"
                            value={this.state.enderecoNum}
                            onChange={this.onEnderecoNumChange}
                            required
                            class='input_ag'
                        />
                    </div>
                    <div class='ag_group'>
                        <p >Complemento</p>
                        <input 
                            type="text"
                            value={this.state.enderecoComplemento}
                            onChange={this.onEnderecoComplementoChange}
                            class='input_ag'
                        />
                    </div>
                    <div class='ag_group'>
                        <p >Bairro</p>
                        <input 
                            type="text"
                            value={this.state.enderecoBairro}
                            onChange={this.onEnderecoBairroChange}
                            required
                            class='input_ag'
                        />
                    </div>
                    <div class='ag_group'>
                        <p >Cidade</p>
                        <input 
                            type="text"
                            value={this.state.enderecoCidade}
                            onChange={this.onEnderecoCidadeChange}
                            required
                            class='input_ag'
                        />
                    </div>
                    <div class='ag_group'>
                        <p >Estado</p>
                        <input 
                            type="text"
                            value={this.state.enderecoEstado}
                            onChange={this.onEnderecoEstadoChange}
                            required
                            class='input_ag'
                        />
                    </div>
                    <div class='ag_group'>
                        <p >Data</p>
                        <input 
                            type="date"
                            value={this.state.agendadoPara}
                            onChange={this.onAgendadoParaChange}
                            required
                            class='input_ag'
                        />
                    </div>
                    <div class='ag_group'>
                        <p >Descrição</p>
                        <textarea
                            type="text"
                            value={this.state.descricao}
                            onChange={this.onDescricaoChange}
                            required
                            class='input_ag'
                        />
                    </div>
                    <button class='button_ag'>Confirmar</button>
                    {this.state.errorStatus && <p>{this.state.errorMenssage}</p>}
                </form>
            </div>
        )    
    }
}

export default Agendamento_Form;