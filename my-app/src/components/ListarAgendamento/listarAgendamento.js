import React from 'react';

import ListarAgendamentoForm from './listarAgendamento_form'
const ListarAgendamento = (props) => {
   return (
         <ListarAgendamentoForm
         history={props.history}
         />
   )
}

export default ListarAgendamento;