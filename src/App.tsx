import React from 'react';
import Editor from './components/Editor';
import RightClickMenu from "./components/RightClickMenu";
import './styles/globals.scss';

const App: React.FC = () => {
  return (
    <div className="app-container">
      <RightClickMenu />
      <Editor />
    </div>
  );
};

export default App;