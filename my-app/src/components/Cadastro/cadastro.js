import React from 'react';

import CadastroForm from './cadastro_form.jsx'
const Cadastro = (props) => {
   return (
         <CadastroForm 
         history={props.history}
         />
   )
}

export default Cadastro;