import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import './styles.css';
import App from './App';

render(
  <AppContainer>
    <App />
  </AppContainer>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./App', () => {
    const RootContainer = require('./App').default;
    render(
      <AppContainer>
        <RootContainer />
      </AppContainer>,
      document.getElementById('root')
    );
  });
}
