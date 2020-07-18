import React from 'react';

import store from './redux/store';
import jwt_decode from "jwt-decode";
import setAuthToken from './utils';

import AppRouter from './Router';

import { Provider } from 'react-redux';
import { BrowserRouter as Router } from "react-router-dom";
import { setCurrentUser, logoutUser } from './redux/actions/authActions';
import { clearCurrentProfile } from './redux/actions/profileActions';

const App = () => {
  if (localStorage.jwtToken) {
    setAuthToken(localStorage.jwtToken);

    const decoded = jwt_decode(localStorage.jwtToken);

    store.dispatch(setCurrentUser(decoded));

    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      store.dispatch(logoutUser());

      store.dispatch(clearCurrentProfile());

      window.location.href = "/login";
    }
  }

  let darkmode = JSON.parse(localStorage.getItem('darkmode'))
  let body = document.querySelector('html');

  if (darkmode) {
    body.classList.add('darkTheme')
    localStorage.setItem('darkmode', 'true')
  } else {
    body.classList.remove('darkTheme')
    localStorage.setItem('darkmode', 'false')
  }

  if (!localStorage.getItem('jwtToken')) {
    localStorage.setItem('darkmode', 'false');
    body.classList.remove('darkTheme');
  }

  return (
    <React.Fragment>
      <Provider store={store}>
        <Router>
          <AppRouter />
        </Router>
      </Provider>
    </React.Fragment>
  );
}

export default App;
