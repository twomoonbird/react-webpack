import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'mobx-react';
import stores from './stores';
import Routes from './routes';
import './index.scss';


render(
  <Provider {...stores}>
    <Routes />
  </Provider>,
  document.getElementById('root')
);

if(module.hot) {
  module.hot.accept();
}