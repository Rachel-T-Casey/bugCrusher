import React from 'react';
import './styles/App.css';
import LoginPanel from './components/authentication/LoginPanel';
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <LoginPanel/>
      </header>
    </div>
  );
}

export default App;
