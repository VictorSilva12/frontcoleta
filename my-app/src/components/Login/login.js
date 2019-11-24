import React from 'react';

import LoginForm from './login_form'
const Login = (props) => {
   return (
         <LoginForm 
         history={props.history}
         />
   )
}

export default Login;