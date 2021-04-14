import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import 'antd/dist/antd.css';
import './App.css';
import Routes from './routes';

function App() {
  return (
    <div className="eventPublish-app">
      <Router>
        <Routes />
      </Router>
    </div>
  );
}

export default App;
