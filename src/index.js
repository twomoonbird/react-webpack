import React from 'react';
import ReactDOM from 'react-dom';
import Loadable from 'react-loadable';
import './index.scss';
const Loading = ()=>(<div></div>)

const AsyncApp = Loadable({
  loader: ()=>import('./App'),
  loading: Loading
})

ReactDOM.render(
  <AsyncApp />,
  document.getElementById('root')
);

if(module.hot) {
  module.hot.accept()
}