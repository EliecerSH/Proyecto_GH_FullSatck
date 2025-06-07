import './Apart_info.css'
import '../App.css'
import editpng from '../assets/editar_icon.png'
import WeatherApp from './WeatherApp'
import Pokemon from './Api_info/pokemon'

function Apart_info(props) { 

  const handleOpen = () => {
    if (props.openWn) {
      props.openWn(true);
    }
  };

  return (
    <div id="daily-info" style={{ position: "relative", height: "83vh", width: "95%" }}>
      <div className='container2' style={{ justifyContent: "space-between", alignItems: "center", padding: "10px", display: "flex" }}>
        <h1>APLICACIONES</h1>
        <div onClick={handleOpen}>
          <img src={editpng} alt="Editar" width="30px" height="30px" />
        </div>
      </div>

      <WeatherApp />
      <Pokemon />
    </div>
  );
}


export default Apart_info
