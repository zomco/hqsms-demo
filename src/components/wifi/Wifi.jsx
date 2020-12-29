import React from 'react'
import api from '../../api'


export default class Wifi extends React.Component{
    componentDidMount(){
        api.getWifiLogs()
        .then(res=>res.json())
        .then(data=>console.log(data))
    }
    render(){   
    return (
        <div>
            <h5>开发中....</h5>
        </div>
        )
    }
}