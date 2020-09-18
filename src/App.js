import React from 'react';
import Main from './Fragments/MainFragment';
import Typography from '@material-ui/core/Typography';
import HeaderFragment from './Fragments/HeaderFragment';
import {BrowserRouter as Router} from "react-router-dom";
import { Provider } from 'react-redux';
import thunk from "redux-thunk";
import {createStore ,applyMiddleware , compose} from 'redux';
import rootReducer from './Redux_part/rootReducer';
import './App.css';

const composeEnhancers=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
	rootReducer,
	composeEnhancers(applyMiddleware(thunk))
	)


function App() {
  return (
  	<Provider store={store}>
  	<Router>
    <div className="App">
    <Main/> 
    </div>
    </Router>
    </Provider>
  );
}

export default App;
