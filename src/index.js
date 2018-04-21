import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import registerServiceWorker from './registerServiceWorker';
import { createStore, combineReducers, applyMiddleware } from 'redux'; 
import { Provider } from 'react-redux'; 
// import axios from 'axios'; 
import logger from 'redux-logger' 

// reducers
const reflectionList = (state = [], action) => {
    console.log('in reflection list');
    return state;   
}





const storeInstance = createStore(
    combineReducers({
        reflectionList
    }),
    //middleware goes here
        applyMiddleware(logger),
)


ReactDOM.render(<Provider store={storeInstance}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
