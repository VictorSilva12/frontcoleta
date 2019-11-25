import React from 'react'
import Auth from './authservice'
const auth = new Auth();

class Logout extends React.Component{
    componentDidMount(){
        auth.logout()
        window.location.reload(false);
        this.props.history.push('/login')
    }
    render(){
        return <div></div>
    }
}

export default Logout;