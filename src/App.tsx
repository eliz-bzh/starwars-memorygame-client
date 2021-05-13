import React from 'react';
import './App.css';
import { Game } from './component/Game/Game';
import { Static } from './component/Statistics/Statistics';

function App() {
  return (
    <div className="container">
      <Static />
      <Game />
    </div>
  );
}

export default App;
