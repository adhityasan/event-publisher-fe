import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import './App.less';
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
