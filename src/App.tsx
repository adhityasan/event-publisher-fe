import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.less';
import Routes from './routes';
import { SocketProvider } from './context/SocketContext';
import { NotificationProvider } from './context/NotificationContext';

function App() {
  return (
    <div className="eventPublish-app">
      <SocketProvider>
        <NotificationProvider key="eventpublish-notification-provider">
          <Router>
            <Routes />
          </Router>
        </NotificationProvider>
      </SocketProvider>
    </div>
  );
}

export default App;
