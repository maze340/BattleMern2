import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
//import { Router, Route, Switch } from 'react-router';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Alert from './components/layout/Alert';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/routing/PrivateRoute';

import './App.css';

// Redux
import { Provider } from 'react-redux';//?- allow to connect redux and react
import store from './store';//?- cloud
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => { //?- when a state is update is keep running in constant loop 
    store.dispatch(loadUser());
  }, []); //? []-arg for run only once
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Alert />
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="dashboard" element={<PrivateRoute component={Dashboard} />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
