import ContentHeader from './ContentHeader.jsx'
import Card from './Card.jsx';
import '../styles/Content.css'

const Content = () => {
  return (
    <div className='content'>
      <ContentHeader />
      <div className='cardss'></div><Card/>
    </div>
  );
};

export default Content;