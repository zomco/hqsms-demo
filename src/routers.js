import React from "react"
import {Route} from 'react-router-dom'
import App from "./components/App"
import CameraHuman from './components/Camera/CameraHuman'

export default(
    <div className="container">
        <Route exact path="/" component={App} ></Route>
        <Route path="/camera" component={CameraHuman}></Route>
    </div>
)