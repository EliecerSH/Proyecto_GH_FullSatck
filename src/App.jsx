import React, { useState } from "react";
import Sidebar from './components/Sidebar';
import Content from './components/content.jsx';
import './App.css';


const App = () => {
  return (
  <div className="dashboard">
        <Sidebar /> {}
        <Content /> {}
  </div>
 );
};

export default App;