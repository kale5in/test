import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './App';
import parse from '../parseRegions';
import { config } from '../test.js';
import { generateData } from './utils';

const items = parse(config);

render(
  <AppContainer>
    <App
      items={items}
    />
  </AppContainer>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./App', () => {
    const RootContainer = require('./App').default;
    render(
      <AppContainer>
        <RootContainer
          items={items}
        />
      </AppContainer>,
      document.getElementById('root')
    );
  });
}
