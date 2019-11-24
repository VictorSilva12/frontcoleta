import React from 'react';
import AppRouters from './routers/routes'
import Popup from 'react-popup';
//import './app.css'

function App() {
  return (
    <div class='app'>
    <AppRouters/>
    <Popup />
    </div>
  );
}

export default App;
