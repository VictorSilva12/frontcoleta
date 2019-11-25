import React from 'react';
import {
    BrowserRouter,
    Switch,
    Route
} from 'react-router-dom';
import authservice from '../services/authservice'
import PrivateRoute from './privateroute.js'
import Layout from '../layout/layout'
import Cadastro from '../components/Cadastro/cadastro'
import Login from '../components/Login/login'
import Logout from '../services/logout'
import Perfil from '../components/Perfil/perfil'
import Agendamento from '../components/Agendamento/agendamento'
import VisualizarAssociado from '../components/VisualizarAssociado/visualizarassociado'
import CadastroAssociado from '../components/CasdastroAssociado/cadastroAssociado'
import ListarAgendamento from '../components/ListarAgendamento/listarAgendamento'
const auth = new authservice();

const routes = () => (
    <BrowserRouter>
        <Layout>
            <Switch>
                <Route path='/cadastro' component={Cadastro}/>
                <Route path='/login' component={Login}/>
                <PrivateRoute path='/perfil' component={Perfil}/>
                <PrivateRoute path='/logout' component={Logout}/>
                <PrivateRoute path='/agendamento' component={Agendamento}/>
                <PrivateRoute path='/visualizarassociado' component={VisualizarAssociado}/>
                <PrivateRoute path='/cadastroAssociado' component={CadastroAssociado}/>
                <PrivateRoute path='/listarAgendamento' component={ListarAgendamento}/>
            </Switch>
        </Layout>
    </BrowserRouter>
)
//<Route path='/logout' component={Logout}/>
//<Route path='/perfil' component={Perfil}/>
//https://reacttraining.com/react-router/web/guides/quick-start link onde pesquisei sobre 
export default routes;