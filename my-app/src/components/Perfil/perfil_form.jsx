import React from 'react';
//import axios from 'axios'
import '../../styles/perfil.css'
import authservice from '../../services/authservice'
import {Link} from 'react-router-dom'

class Perfil_Form extends React.Component {
    constructor(props){
        super(props);
        this.auth = new authservice();
        this.user_type = this.user_type.bind(this)
        this.admin = this.admin.bind(this)
        this.associado = this.associado.bind(this)
        this.user_info = this.user_info.bind(this)
    }
    user_info(){
        return this.auth.decoded();
    }
    user_type(){
        if(this.auth.loggedIn()){
            if(this.user_info().user.administrador){
                return true;
            }
            else{
                return false;
            }
        }
        else{
            return false;
        }
    }
    admin(){
        return(
            <div class='perfil_box'>
                
                <input class="perfilmenu-btn" type="checkbox" id="perfilmenu-btn" />
                <label class="perfilmenu-icon" for="perfilmenu-btn"><span class="perfilnavicon"></span></label>
                <ul class="dropdown-content">
                    <li><Link to='/agendamento'>Agendar Coleta</Link></li>
                    <li><Link to='/'>Deletar Agendamento</Link></li>
                    <li><Link to='/'>Listar Agendamentos</Link></li>
                    <li><Link to='/'>Cadastrar Associado</Link></li>
                    <li><Link to='/'>Alterar Associado</Link></li>
                    <li><Link to='/'>Deletar Associado</Link></li>
                    <li><Link to='/visualizarassociado'>Visualizar Associado</Link></li>
                </ul>
                <div class="div">
                    <h1>admin</h1>
                    <span>/</span>
                    <h1>{this.user_info().user.nome}</h1>
                </div>
            </div>
        )

    }
    associado(){
        return(
            <div class='perfil_box'>
                <label>associado</label>
                
            </div>
        )
    }
    render(){
        return(
            <div class='perfil_container'>
                {this.user_type() ?
                    this.admin()
                    :
                    this.associado()
                }
            </div>
        );
    }
}

export default Perfil_Form;