import React from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers';
import Game from './components/Game';
import './App.css';

let store;
const USE_REDUX_DEVTOOLS = true;
if(USE_REDUX_DEVTOOLS) {
  const middleware = [ thunkMiddleware ];
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  store = createStore(rootReducer, composeEnhancers(applyMiddleware(...middleware)));
} else {
  store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
}

const App = () => (
  <Provider store={store}>
    <div>
      <Game />
    </div>
  </Provider>
);

export default App;
