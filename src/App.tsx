import React from 'react';
import Editor from './components/Editor';
import Footer from './components/Footer';
import RightClickMenu from "./components/RightClickMenu";
import './styles/globals.scss';

const App: React.FC = () => {
  return (
    <div className="app-container">
      <RightClickMenu />
      <Editor />
      <Footer />
    </div>
  );
};

export default App;