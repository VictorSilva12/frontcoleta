import React from 'react'
import {Link} from 'react-router-dom'
import '../styles/header.css'
import authservice from '../services/authservice'
import logo from '../logo.png'

const auth = new authservice()

function deslogado(){
    return(
        <ul class="menu">
            <li><Link to="cadastro">Cadastre-se</Link></li>
            <li><Link to="login">Logar-se</Link></li>
        </ul>
    );
}
function logado(){
    return(
        <ul class="menu">
            <li><Link to="perfil">Perfil</Link></li>
            <li><Link to="logout">Deslogar</Link></li>
        </ul>
    );
}
const header =() => (
    <div class="header">
        <Link exact to="/" class="logo"><img src={logo} alt="Logo"/></Link>
        <input class="menu-btn" type="checkbox" id="menu-btn" />
        <label class="menu-icon" for="menu-btn"><span class="navicon"></span></label>
        {auth.loggedIn() ? logado():deslogado()}
    </div>
)

export default header;