import React,{useEffect} from 'react'
import flvjs from "flv.js";
import { Button } from 'antd';
import { UpCircleOutlined,DownCircleOutlined,LeftCircleOutlined,RightCircleOutlined} from '@ant-design/icons';

export default class CameraVideo extends React.Component{
    componentDidMount(){
        if (flvjs.isSupported()) {
            var videoElement = document.getElementById('videoElement');
            var flvPlayer = flvjs.createPlayer({
                type: 'flv',
                url: 'http://127.0.0.1:85/live/test.flv',
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
            <div>
            <h1>实时视频</h1>
            <video id="videoElement" controls muted style={{width:'1100px',height:'800px'}}></video>
            {
                
            }
            </div>  
        )
    }
}