import { useState } from 'react';
import './App.css'
import Sidebar from './components/Sidebar';
import Content from './components/content';

function App() {
  return (
   <div className='dashboard'>
      <Sidebar/>
      <div className='dashboard-content'>
          <Content/>
      </div>
   </div> 
    );
}

export default App