import './Apart_info.css'
import '../App.css'
import editpng from '../assets/editar_icon.png'

function Apart_info(){
    return(
        <div id="daily-info"style={{ position: "relative", height: "83vh", width: "95%" }}>
            <div className='container2' style={{justifyContent: "space-between", alignItems: "center", padding: "10px"}}>
                <h1>APLICACIONES</h1>
                <img src={editpng} alt="" width="30px" height="30px"/>
            </div>
        </div>
    )
}
export default Apart_info; 