import React from "react"
import {Route} from 'react-router-dom'
import App from "./components/App"
import CameraVideo from "./components/Camera/CameraVideo"
import CameraHuman from './components/Camera/CameraHuman'
import CameraVehicle from "./components/Camera/CameraVehicle"
import Weather from "./components/Weather/Weather"

export default(

    <div>
 
        <Route exact path="/" component={App} ></Route>
        <Route path="/camera/human" component={CameraHuman}></Route>
        <Route path="/camera/vehicle" component={CameraVehicle}></Route>
        <Route exact path="/camera" component={CameraVideo} />
        <Route exact path="/weather" component={Weather} />
    </div>
  
)