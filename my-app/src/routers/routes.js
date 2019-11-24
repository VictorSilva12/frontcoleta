import React from 'react';
import {
    BrowserRouter,
    Switch,
    Route
} from 'react-router-dom';
import { PrivateRoute } from './privateroute'
import authservice from '../services/authservice'

import Layout from '../layout/layout'
import Cadastro from '../components/Cadastro/cadastro'
import Login from '../components/Login/login'
import Logout from '../services/logout'
import Perfil from '../components/Perfil/perfil'
const auth = new authservice();

const routes = () => (
    <BrowserRouter>
        <Layout>
            <Switch>
                <Route path='/cadastro' component={Cadastro}/>
                <Route path='/login' component={Login}/>
                <Route path='/perfil' component={Perfil}/>
                <Route path='/logout' component={Logout}/>
            </Switch>
        </Layout>
    </BrowserRouter>
)
//<Route path='/logout' component={Logout}/>
//<Route path='/perfil' component={Perfil}/>
//https://reacttraining.com/react-router/web/guides/quick-start link onde pesquisei sobre 
export default routes;