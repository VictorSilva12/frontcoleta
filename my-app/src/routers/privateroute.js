import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import authservice from '../services/authservice'
const auth = new authservice();

const PrivateRoute = ({ component: Component, ...rest}) => {
    return(
        <Route
            {...rest}
            render={ props =>
                auth.loggedIn() ? (
                    <Component {...props} />
                ):(
                    <Redirect
                        to={{
                            pathname:'/login',
                            state: { from: props.location }
                        }}
                        />
                )
            }
        />
    )
};

export default PrivateRoute;