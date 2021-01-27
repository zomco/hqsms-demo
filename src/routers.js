import React from "react"
import {Route} from 'react-router-dom'
import App from "./components/App"
// import MyMap from "./components/index"
import MyMap from "./components/Map/Map"

export default(

    <div>
        {/* <Route exact path="/" component={MyMap}></Route> */}
        <Route exact path="/" component={MyMap}></Route>
        <Route exact path="/myapp" component={App} ></Route>
    </div>
  
)