import React from 'react';
import ReactDOM from 'react-dom';
import OfflinePluginRuntime from 'offline-plugin/runtime';
import App from './App';
import './index.scss';


ReactDOM.render(
  <App />,
  document.getElementById('root')
);

if(module.hot) {
  module.hot.accept()
}
OfflinePluginRuntime.install();