import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import moviesReducer from '../src/store/reducers/movies';
import Home from './screens/Home/Home';
import MyList from './screens/MyList/MyList';

const rootReducer = combineReducers({
  movies: moviesReducer
});
const middlewares = [thunk];
const store = createStore(rootReducer,applyMiddleware(...middlewares));


function App() {

  return (
    <Provider store={store}>
    <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/myList" component={MyList} />
                </Switch>
    </BrowserRouter>
    </Provider>
  );
}

export default App;
