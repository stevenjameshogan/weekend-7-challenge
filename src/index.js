import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import registerServiceWorker from './registerServiceWorker';
import { createStore, combineReducers, applyMiddleware } from 'redux'; 
import { Provider } from 'react-redux'; 
import axios from 'axios'; 
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { call, put, takeEvery } from 'redux-saga/effects';

const sagaMiddleware = createSagaMiddleware();

function * rootSaga () {
    yield takeEvery('GET_REFLECTIONS', getReflectionsSaga);
    yield takeEvery('ADD_REFLECTION', addReflectionSaga);
}

function * getReflectionsSaga() {
    try {
      const refResponse = yield call(axios.get, '/reflection')
      yield put({
          type: 'SET_REFLECTIONS',
          payload: refResponse.data
      })
    } catch (error) {
    }
}

function * addReflectionSaga(action) {
    try {
        yield call(axios.post, '/reflection', action.payload)
        yield put({
            type: 'GET_REFLECTIONS'
        })
      } catch (error) {
      }
}

  

// reducers
const reflectionList = (state = [], action) => {
    switch(action.type) {
        case 'SET_REFLECTIONS':
            return action.payload;
        default:
            return state; 
    }  
}

const storeInstance = createStore(
    combineReducers({
        reflectionList
    }),
    applyMiddleware(sagaMiddleware), 
    applyMiddleware(logger)
);

// initializing this saga
sagaMiddleware.run(rootSaga);

ReactDOM.render(<Provider store={storeInstance}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
