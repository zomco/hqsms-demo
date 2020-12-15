import React,{useEffect} from 'react'
import flvjs from "flv.js";
import { Button } from 'antd';

export default class CameraVideo extends React.Component{
    componentDidMount(){
        if (flvjs.isSupported()) {
            var videoElement = document.getElementById('videoElement');
            var flvPlayer = flvjs.createPlayer({
                type: 'flv',
                url: 'http://192.168.31.14:8080/live?port=1935&app=myapp&stream=mystream',
                config:{
                    enableWorker: true,
                    enableStashBuffer: false,
                    stashInitialSize: 128,
                },
            });
            flvPlayer.attachMediaElement(videoElement);
            flvPlayer.load();
            flvPlayer.play();
            flvPlayer.on(flvjs.Events.ERROR, (errType, errDetail) => {
     			console.log(errType, errDetail)
			})
        }
    }
    render(){
        return(
            <div className="container">
            <h1>实时视频</h1>
            <video id="videoElement" controls muted style={{width:'1100px',height:'800px'}}></video>
            {
                
            }
            </div>  
        )
    }
}