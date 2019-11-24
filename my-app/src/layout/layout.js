import React from 'react';
import Header from '../components/header.jsx';
import Footer from '../components/footer.jsx'
const Layout_Padrao = (props) =>(
    <div className="cointainer">
        <div className="content">
            <Header/>
            {props.children}
        </div>
    </div>
);

export default Layout_Padrao;