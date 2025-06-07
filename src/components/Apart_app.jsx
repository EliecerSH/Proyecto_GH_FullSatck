import './Apart_info.css'
import editpng from '../assets/editar_icon.png'
import '../App.css'
import Apli_calculo from './Aplicaciones/Calculo/Apli_calculo'
import Mecanografia from './Mecanografia/Mecanografia'

function Apart_app(props){
    return(
        <div id="daily-info"style={{ position: "relative", height: "83vh", width: "100%" }}>
            <div className='container2' style={{justifyContent: "space-between", alignItems: "center", padding: "10px"}}>
                <h1>APLICACIONES</h1>
                <img src={editpng} alt="" width="30px" height="30px"/>
            </div>
            <div>
                <Apli_calculo></Apli_calculo>
            </div>
            <div><Mecanografia></Mecanografia>
            </div>
        </div>
    )
}
export default Apart_app;