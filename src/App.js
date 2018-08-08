import React from 'react';
import logo from './assets/test.png';
import { Button } from 'antd';
import './App.scss';

const App = () => {
  return (
    <div className="app">
      <img src={logo} />
      <div className='test1'>
        <Button>test</Button>
      </div>
      <div className='test2'>test2</div>
    </div>
  )
}

export default App;