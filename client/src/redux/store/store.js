import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import reducer from '../reducer/reducer';

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
);

export default store;
