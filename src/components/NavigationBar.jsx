import React from 'react'
 import {Link} from 'react-router-dom'

 class NavigationBar extends React.Component{
     render(){
         return(
        <nav className="narbar nvabar-expand-lg navbar-light bg-light mb-3">
                 <div className="container">
                     <Link className="navbar-brand" to="/camera">摄像头</Link>
                     <Link className="navbar-brand" to="/camera">气象传感器</Link>
                 </div>
             </nav>
         )
     }
 }
 export default NavigationBar