import React from 'react';
//import axios from 'axios'
import '../../styles/form_cad_log.css'
import authservice from '../../services/authservice'
import ReCAPTCHA from "react-recaptcha";

class Cadastro_Form extends React.Component {
    constructor(props){
        super(props);

        this.verify = this.verify.bind(this)
        this.recaptcha = this.recaptcha.bind(this);
        this.autentica = new authservice();

        this.state = {
            email: "",
            senha: "",
            isVerified: false
        };
    }
    /*
    componentWillMount(){
        if(!this.autentica.loggedIn()){
                this.props.history.replace('/perfil')
        }
    }
    */
    recaptcha(){
        console.log('captcha carregou')
    }
    verify(response){
        if(response){
            this.setState({
                isVerified: true
            })
        }
    }
    onSenhaChange = (e) => this.setState({senha : e.target.value.trim()})

    onEmailChange = (e) =>this.setState({email : e.target.value.trim()})

    HandleSubmit = async (e) => {
        e.preventDefault();
        if(this.state.isVerified){
            this.autentica.login(this.state.email, this.state.senha)
            .then(res =>{
            //this.props.history.push(`/perfil/${res}`)
            this.props.history.push(`/`)
            })
            .catch(res=>{
                alert(JSON.stringify(res))
            })
        }
        else{
            alert('Por favor, prove que você não é um robô')
        }
        /*
        const body={
            email: this.state.email,
            senha: this.state.senha,
        }
        await axios.post('http://localhost:3100/api/auth/logon', body,{
            headers:{
                'Content-Type':'application/json',
            }
        })
        .then((response) =>{
            alert(JSON.stringify(response.data.data.user))
            localStorage.setItem('userToken', response.data.data.token)
            this.props.history.push(`/perfil/${response.data}`)
        })
        .catch((response)=> {
            alert(response.data)
            this.props.history.push('/login')
        })
        */
    };

    render(){
        return(
            <div class='rl_container'>
                <form onSubmit={this.HandleSubmit} class='form_rl'>
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
                    <button class='button_rl'>Logar</button>
                    {this.state.errorStatus && <p>{this.state.errorMenssage}</p>}
                    <div class='captcha'>
                        <ReCAPTCHA
                            elementID='g-recaptcha'
                            sitekey='6LcaDsQUAAAAALih5jCkehNLohBYBsKxMe33vkHt'
                            render='explicit'
                            size='compact'
                            badge='inline'
                            theme='light'
                            hl='pt'
                            verifyCallback={this.verify}
                            onloadCallback={this.recaptcha}
                        />
                    </div>
                    
                </form>
            </div>
        );
    }
}

export default Cadastro_Form;