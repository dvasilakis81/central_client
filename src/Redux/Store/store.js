import { createStore } from 'redux';
import { applyMiddleware } from 'redux';
import reduxPromiseMiddleware from 'redux-promise-middleware'
import RootReducer from '../Reducers/index'
import thunkMiddleware from 'redux-thunk'

function saveToLocalStorage(state) {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem('state', serializedState)
  } catch (e) {
    //console.log(e)
  }
}

function loadFromLocalStorage() {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) return undefined
    return JSON.parse(serializedState);
  } catch (e) {
    return undefined
  }
}

const persistedState = loadFromLocalStorage()
const store = createStore(RootReducer, persistedState, applyMiddleware(reduxPromiseMiddleware));
//const store = createStore(RootReducer, applyMiddleware(reduxPromiseMiddleware));

store.subscribe(() => saveToLocalStorage(store.getState()))

export default store;