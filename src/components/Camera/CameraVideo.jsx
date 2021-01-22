import React from 'react'
import api from '../../api'
import moment from 'moment'
import VideoPlay from "./VideoPlayer";
import { Menu,Modal,Input,DatePicker,Button  } from 'antd'

import img1 from '../../imgs/1/1.jpg'
import img2 from '../../imgs/1/2.jpg'
import img3 from '../../imgs/1/3.jpg'
import img4 from '../../imgs/1/6.jpg'
import img5 from '../../imgs/1/7.jpg'
import img6 from '../../imgs/1/8.jpg'
import img7 from '../../imgs/1/11.jpg'
import img8 from '../../imgs/1/12.jpg'
import img9 from '../../imgs/1/13.jpg'

import img10 from '../../imgs/2/4.jpg'
import img11 from '../../imgs/2/5.jpg'
import img12 from '../../imgs/2/9.jpg'
import img13 from '../../imgs/2/10.jpg'
import img14 from '../../imgs/2/14.jpg'
import img15 from '../../imgs/2/15.jpg'

const {RangePicker} = DatePicker;
function range(start, end) {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  }
// const requirePic=require.context("../../imgs/1",true,/^\.\/.*\.jpg$/)
// const imgs = requirePic.keys().map(requirePic);
// console.log(imgs);
export default class CameraVideo extends React.Component{
    state = {
        current: 'yulan',
        inputValue:0,
        showElm:false,
        btnPlay:'inline-block',
        isModalVisible:false,
        setModalVisible:false,
        videoDisplay:'none',
        hfVideoDisplay:'none',
        yutaiDisplay:'none',
        data1:"",
        data2:"",
        date1:"",
        date2:"",
      };



    
    handleOk = () => {
        api.postCameraVideo({"duration":this.state.inputValue*60000})
        .then(res=>res.json())
        .then(data=>console.log(data))
        this.setState({
            isModalVisible:false,
            
            btnPlay:'none',
            videoDisplay:'block',
            yutaiDisplay:'block',
            hfVideoDisplay:"none",
            data1:"http://47.115.144.65/hls/1_live.m3u8",
            data2:""
        })
      };

      handleCancel = () => {
        this.setState({
            isModalVisible:false
        })
      };
     
    

    handleOk1 = () => {
    api.postCameraPlay({"startTime": this.state.date1,"endTime": this.state.date2})
    this.setState({
        setModalVisible:false,
        showElm:true,
        btnPlay:'none',
        videoDisplay:'none',
        yutaiDisplay:'none',
        hfVideoDisplay:'block',
        data2:"http://47.115.144.65/hls/1_play.m3u8",
        data1:""
    })
    };
    
    handleCancel1 = () => {
        this.setState({
            setModalVisible:false
        })
      };
    
    handleChange=(date,dateString)=>{
        this.setState({
            date1:dateString[0],
            date2:dateString[1]
        })
    }

    handleClick = e => {
    console.log('click ', e);
    this.setState({ 
        current: e.key,
        isModalVisible:true
    })
    };
    handleHuifang=e=>{
        this.setState({
            current:e.key,
            setModalVisible:true
        })
    }
    handleInput=e=>{
        this.setState({
            inputValue:e.target.value
        })
    };

    disabledDate=(current)=>{
        return !current;
    }

    disabledRangeTime(_, type) {
        if (type === 'start') {
          return {
            disabledHours: () => range(0, 60).splice(4, 20),
            disabledMinutes: () => range(30, 60),
            disabledSeconds: () => [55, 56],
          };
        }
        return {
          disabledHours: () => range(0, 60).splice(20, 4),
          disabledMinutes: () => range(0, 31),
          disabledSeconds: () => [55, 56],
        };
      }
      
    handleLook=()=>{
        this.setState({
            showElm:true,
            isModalVisible:true,
        })
    }
    handleReturn=()=>{
        this.setState({
            current: 'huifang',
            showElm:true,
            setModalVisible:true,
        })
    }

    render(){
        const {current} = this.state;
        return(
           <>
            <Button size="large" onClick={this.handleLook} type="primary" style={{display:this.state.btnPlay,margin:"100px 50px 800px 200px"}}>预览</Button>
            <Button size="large" onClick={this.handleReturn} type ="primary" style={{display:this.state.btnPlay}}>回放</Button>
            <Modal title="预览" width="250px" visible={this.state.isModalVisible} onOk={this.handleOk} onCancel={this.handleCancel}>
                        预览{<Input onChange={this.handleInput} style={{display:"inline",width:"48px"}}/>}分钟
            </Modal>
            <Modal title="回放" width="400px" visible={this.state.setModalVisible} onOk={this.handleOk1} onCancel={this.handleCancel1}>
                <RangePicker
                
                showTime={{
                    hideDisabledOptions: true,
                    defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('11:59:59', 'HH:mm:ss')],
                }}
                onChange={this.handleChange}
                format="YYYY-MM-DD HH:mm:ss"
                />
            </Modal>
            {
                this.state.showElm?(
                    <div>
                    <Menu selectedKeys={[current]} mode="horizontal">
                    
                        <Menu.Item key="yulan" onClick={this.handleClick}>
                        预览
                        </Menu.Item>
                        <Menu.Item key="huifang" onClick={this.handleHuifang}>
                        回放
                        </Menu.Item>
                    
                    </Menu>
                        <div className="video_container" style={{overflow:"hidden"}}>
                            {/* 直播 */}
                            <VideoPlay src={this.state.data1}></VideoPlay>
                            {/* 回放 */}
                            <VideoPlay src={this.state.data2}></VideoPlay>
                            {/* 云台 */}
                            <div className="video_yuntai" style={{display:this.state.yutaiDisplay}}>
                            <p style={{fontSize:"30px",textAlign:"center"}}>云台</p>
                            <hr/>
                                <div className="1" style={{float:"left"}}>
                                    <img src={img1} alt=""
                                    onClick={()=>{api.postCameraPtz({"command":25,"duration":0,"speed":1}).then(res=>res.json()).then(data=>console.log(data))}}/>
                                    <img src={img2} alt=""
                                    onClick={()=>{api.postCameraPtz({"command":21,"duration":0,"speed":1}).then(res=>res.json()).then(data=>console.log(data))}}/>
                                    <img src={img3} alt=""
                                    onClick={()=>{api.postCameraPtz({"command":26,"duration":0,"speed":1}).then(res=>res.json()).then(data=>console.log(data))}}/>
                                    <br/>
                                    <img src={img4} alt=""
                                    onClick={()=>{api.postCameraPtz({"command":23,"duration":0,"speed":1}).then(res=>res.json()).then(data=>console.log(data))}}/>
                                    <img src={img5} alt=""
                                    onClick={()=>{api.postCameraPtz({"command":29,"duration":0,"speed":1}).then(res=>res.json()).then(data=>console.log(data))}}/>
                                    <img src={img6} alt=""
                                    onClick={()=>{api.postCameraPtz({"command":24,"duration":0,"speed":1}).then(res=>res.json()).then(data=>console.log(data))}}/>
                                    <br/>
                                    <img src={img7} alt=""
                                    onClick={()=>{api.postCameraPtz({"command":27,"duration":0,"speed":1}).then(res=>res.json()).then(data=>console.log(data))}}/>
                                    <img src={img8} alt=""
                                    onClick={()=>{api.postCameraPtz({"command":22,"duration":0,"speed":1}).then(res=>res.json()).then(data=>console.log(data))}}/>
                                    <img src={img9} alt=""
                                    onClick={()=>{api.postCameraPtz({"command":28,"duration":0,"speed":1}).then(res=>res.json()).then(data=>console.log(data))}}/>
                                </div>
                                <div className="2" style={{float:"left"}}>
                                    <img src={img10} alt=""
                                    onClick={()=>{api.postCameraPtz({"command":11,"duration":0,"speed":1}).then(res=>res.json()).then(data=>console.log(data))}}/>
                                    <img src={img11} alt=""
                                    onClick={()=>{api.postCameraPtz({"command":12,"duration":0,"speed":1}).then(res=>res.json()).then(data=>console.log(data))}}/>
                                    <br/>
                                    <img src={img12} alt=""
                                    onClick={()=>{api.postCameraPtz({"command":13,"duration":0,"speed":1}).then(res=>res.json()).then(data=>console.log(data))}}/>
                                    <img src={img13} alt=""
                                    onClick={()=>{api.postCameraPtz({"command":14,"duration":0,"speed":1}).then(res=>res.json()).then(data=>console.log(data))}}/>
                                    <br/>
                                    <img src={img14} alt=""
                                    onClick={()=>{api.postCameraPtz({"command":15,"duration":0,"speed":1}).then(res=>res.json()).then(data=>console.log(data))}}/>
                                    <img src={img15} alt=""
                                    onClick={()=>{api.postCameraPtz({"command":16,"duration":0,"speed":1}).then(res=>res.json()).then(data=>console.log(data))}}/>
        
                                </div>
                            
                            </div>
                        </div>
                        
                    </div>
                ):null
            }
           </>
        )
    }
}
