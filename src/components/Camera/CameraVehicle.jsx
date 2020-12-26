import React from 'react'
import api from '../../api/index'

import { Input,Image,List,Statistic,Modal} from 'antd';


const { Search } = Input;


let plateUrl=[];

export default class CameraVehicle extends React.Component{
    state={
        imgUrl:'',
        data:[],
        setModalVisible:false,
        setModalVisible1:false   
    }
    onSearch=(plateId)=>{
        fetch("http://47.115.144.65/api/camera-vehicles/search/findByPlateChars?plateChars="+plateId)
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            if (data.length!==0) {
                this.setState({
                    setModalVisible:true,
                    imgUrl:"http://47.115.144.65/api/file/"+data[0].plateUrl
                })
            }else{
                this.setState({
                    setModalVisible1:true
                })
            }
            
            console.log(this.setState.imgUrl);
        })
    
    }
    getImgUrl=()=>{
        this.state.data.forEach((element)=>{
            plateUrl.push(element[plateUrl])
            
        })
    }


    handleOk =()=>{
        this.setState({
            setModalVisible:false
        })
    }
    handleCancel=()=>{
        this.setState({
            setModalVisible:false
        })
    }

    handleOk1 =()=>{
        this.setState({
            setModalVisible1:false
        })
    }
    handleCancel1=()=>{
        this.setState({
            setModalVisible1:false
        })
    }
    componentDidMount(){
        api.getCameraVehicle()
        .then(res=>res.json())
        .then(data=>(
            this.setState({
                data:data
            })
            
            ))
    }
  
    render(){
        let plateUrl=""
        let getData=[]
        getData.push (this.state.data.map((element,index)=>{
                plateUrl="http://47.115.144.65/api/file/"+element.plateUrl
                return <img key={index} src={plateUrl} alt="" width="160" height="80"/>
            }))
        console.log(getData);
        
        return(
            <div>
                <div className="container" width="100px">
                    <Search placeholder="请输入车牌号" onSearch={this.onSearch} enterButton />
                    <Modal title="查询结果" width="200px" visible={this.state.setModalVisible} onOk={this.handleOk} onCancel={this.handleCancel}>
                        <Image src={this.state.imgUrl} style={{width:"160px",height:"80px"}} />
                    </Modal>
                    <Modal title="查询结果" width="200px" visible={this.state.setModalVisible1} onOk={this.handleOk1} onCancel={this.handleCancel1}>
                        <p>没有查询到该车牌</p>
                    </Modal>
                    
                </div>
                <br />
                <div className="up" style={{overflow:"hidden"}}>
                 <h1 style={{float:"left"}}>车牌图片：</h1>
                 <Statistic title="车流量" value={getData[0].length} style={{float:"left"}}/>
                </div>
                <List 
                grid={{
                column:8,
                gutter:10,
                }}
                pagination={{onChange:page=>{console.log(page);},pageSize:48,defaultCurrent:1,total:500}}
                dataSource={getData[0]}
                renderItem={item=>(
                    <List.Item>
                    {item}
                    </List.Item>
                )}/>
                
            </div>
        )
    }
}