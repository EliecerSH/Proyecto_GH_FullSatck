import ContentHeader from './ContentHeader.jsx'
import Card from './Card.jsx';
import '../styles/Content.css'

const Content = () => {
  return (
    <div className='content'>
      <div className='content-header'>
        <h1>Content</h1>
      </div>
     <div className='header'><ContentHeader/></div>
      <div className='cardss'></div><Card/>
    </div>
  );
};

export default Content;