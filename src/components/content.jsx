import React from 'react'
import ContentHeader from './contentHeader.jsx'
import Card from './Card.jsx';
import '../styles/Content.css'

const Content = () => {
  return (
    <div className='content'>

     <div className='header'><ContentHeader/></div>
      <div className='cardss'></div><Card/>
    </div>
  );
};

export default Content;