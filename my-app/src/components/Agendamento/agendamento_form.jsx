import React from 'react';
//import axios from 'axios'
import authservice from '../../services/authservice'

class Agendamento_Form extends React.Component {
    constructor(props){
        super(props);
        this.auth = new authservice();
    }
    render(){
        <div>
            <form onSubmit={this.HandleSubmit}>
                <div class='rl_group'>
                    <label></label>
                    <input 
                        type="text"
                    
                    />
                </div>
            </form>
            <button class='button_rl'>Confirmar</button>
            {this.state.errorStatus && <p>{this.state.errorMenssage}</p>}
        </div>
                
    }
}

export default Agendamento_Form;