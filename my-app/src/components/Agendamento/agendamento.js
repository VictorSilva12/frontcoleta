import React from 'react';

import AgendamentoForm from './agendamento_form'
const Agendamento = (props) => {
   return (
         <AgendamentoForm
         history={props.history}
         />
   )
}

export default Agendamento;