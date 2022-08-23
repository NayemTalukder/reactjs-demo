import React from 'react';
import { initApp } from './services/firebase'
import { Router } from './router'

const App: React.FC = () => {
  initApp();

  return (
    <div className="App">
      <Router />
    </div>
  );
}

export default App;
