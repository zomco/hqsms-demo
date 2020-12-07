import React from 'react';
import ReactDOM from 'react-dom';

import logger from 'redux-logger'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'

import {createStore,applyMiddleware} from 'redux'
import {Provider} from 'react-redux'

import rootReducers from './reducers'

import {BrowserRouter as Router} from 'react-router-dom'
import routers from './routers';

import NavigationBar from './components/NavigationBar'

const store=createStore(rootReducers,composeWithDevTools(applyMiddleware(logger,thunk)))

ReactDOM.render( 
    <Provider store={ store }>
       <Router routers={routers}>
          <NavigationBar />
            {routers}
       </Router>
    </Provider>,
    document.getElementById('root')
    );
