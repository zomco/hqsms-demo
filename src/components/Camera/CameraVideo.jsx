import React from 'react'
import api from '../../api/index'

export default class CameraVehicle extends React.Component{
   
    render(){
        return(
            <div class="container">
            <h1>实时视频</h1>
            <video id="video" height="1100" width="1200" controls="controls"></video>
                {/* if(flvjs.isSupported()) {
                    const videoElement = document.getElementById('video');
                    const flvPlayer = flvjs.createPlayer({
                        type: 'flv',
                        url: 'http://127.0.0.1:85/live/test.flv'
                    })
                    flvPlayer.attachMediaElement(videoElement);
                    flvPlayer.load();
                    flvPlayer.play();
                } */}
                
            </div>
        )
    }
}