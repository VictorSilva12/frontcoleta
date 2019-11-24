import React from 'react';
import axios from 'axios'

import '../../styles/form_cad_log.css'
class Cadastro_Form extends React.Component {

    state = {
       nome: '',
       cpf: '',
       email: '',
       senha: '',
       administrador: '',
    };
 
    onNomeChange = (e) => {
        const nome = e.target.value.trim();
        this.setState(()=> ({nome}))
    }

    onCpfChange = (e) =>{
        const cpf = e.target.value.trim();
        this.setState(()=> ({cpf}));
    } 

    onSenhaChange = (e) =>{
        const senha = e.target.value.trim();
        this.setState(()=> ({senha}));
    }

    onEmailChange = (e) =>{
        const email = e.target.value.trim();
        this.setState(()=> ({email}));
    }

    HandleSubmit = async (e) => {
       e.preventDefault();
        const body={
            nome: this.state.nome,
            cpf: this.state.cpf,
            email: this.state.email,
            senha: this.state.senha,
            administrador: false
        }

       axios.post('http://localhost:3100/api/auth/register', body, {
           headers:{
               'Content-Type':'application/json',
           }
       }
       )
          .then((response) => this.props.history.push("/"))
          .catch(err => console.log(err.response))
        
    };

    render(){
        return(
            <div class='rl_container'>
                <form onSubmit={this.HandleSubmit} class='form_rl'>
                    <div class='rl_group'>
                        <label class='label_rl'>Nome</label>
                        <input
                            name="nome"
                            type="Text"
                            autoFocus
                            value={this.state.nome}
                            onChange={this.onNomeChange}
                            required
                            class='input_rl'
                        >
                        </input>
                    </div>
                    <div class='rl_group'>
                        <label class="label_rl">E-Mail</label>
                        <input
                            name="email"
                            type="Text"
                            pattern="^\w+@[a-zA-Z]+?\.[a-zA-Z]{2,3}$"
                            autoFocus
                            value={this.state.email}
                            onChange={this.onEmailChange}
                            required
                            class='input_rl'
                        >
                        </input>
                    </div>
                    <div class='rl_group'>
                        <label class="label_rl">CPF</label>
                        <input
                            name="cpf"
                            type="Text"
                            autoFocus
                            value={this.state.cpf}
                            onChange={this.onCpfChange}
                            required
                            class='input_rl'
                        >
                        </input>
                    </div>
                    <div class='rl_group'>
                        <label class="label_rl">Senha</label>
                        <input
                            type="password"
                            value={this.state.senha}
                            onChange={this.onSenhaChange}
                            required
                            class='input_rl'
                        >
                        </input>
                    </div>
                    <button class='button_rl'>Cadastrar</button>
                    {this.state.errorStatus && <p>{this.state.errorMenssage}</p>}
                </form>
            </div>
        );
    }
}

export default Cadastro_Form;