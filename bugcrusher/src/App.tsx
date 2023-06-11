import React from 'react';
import './styles/App.css';

import LoginPanel from './components/authentication/LoginPanel';
import MainRouter from './components/controllers/MainRouter';
 function App() {
  return (
    <div className="App">
      <header className="App-header">
        <MainRouter/>
      </header>
    </div>
  );
}

export default App;
