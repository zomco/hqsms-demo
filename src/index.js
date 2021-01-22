import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App'
import routers from "./routers"
import {BrowserRouter as Router} from "react-router-dom"


ReactDOM.render( 
    <Router routes={routers}>
        {routers}
    </Router>,
    // <App />,
    document.getElementById('root')
    );
