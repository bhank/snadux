import React from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers';
import Game from './components/Game';
//import logo from './logo.svg';
import './App.css';


 const middleware = [ thunkMiddleware ];
 const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
 const store = createStore(rootReducer, composeEnhancers(applyMiddleware(...middleware)));
//const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

const App = () => (
	<Provider store={store}>
		<div>
			<Game />
		</div>
	</Provider>
);

export default App;
