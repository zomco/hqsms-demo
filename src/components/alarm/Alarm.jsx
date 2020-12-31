import React from 'react'
import api from '../../api'
import { Card,Spin } from 'antd'


export default class Alarm extends React.Component{
    state={
        name:"",
        id:"",
        model:"",
        status:"",
        supplier:"",
        Mac:"",
        gateway:"",
        netmask:"",
        ip:"",
        username:"",
        isOn:"",
        netmask:"",
        isLoading:true
    }
    componentDidMount(){
        api.getAlams()
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            this.setState({
                isLoading:false,
                name:data.content[0].name,
                id:data.content[0].id,
                model:data.content[0].model,
                supplier:data.content[0].supplier,
                Mac:data.content[0].mac,
                username:data.content[0].username,
                password:data.content[0].password,
                netmask:data.content[0].netmask,
                gateway:data.content[0].gateway,
                ip:data.content[0].ip,
                isOn:data.content[0].isOn
            })
            console.log(data)
        })
    }
    
    render(){ 
        if (this.state.isLoading) {
            return (<Spin size="large" style={{padding:"30% 50%"}} />)
        }else{
            return (
                <div>
                    <Card title="设备信息" bordered={false} style={{ width: 300 }}>
                        <p>设备名称：{this.state.name}</p>
                        <p>设备编号：{this.state.id}</p>
                        <p>设备型号：{this.state.model}</p>
                        <p>供应商：{this.state.supplier}</p>
                        <p>Mac：{this.state.Mac}</p>
                        <p>gateway: {this.state.gateway}</p>
                        <p>netmask: {this.state.netmask}</p>
                        <p>ip: {this.state.ip}</p>
                        <p>用户名：{this.state.username}</p>
                        <p>密码：{this.state.password}</p>
                        <p>是否打开：{this.state.isOn==="YES"?"打开":"关闭"}</p>
                    </Card>
                </div>
                )
        }
   
    }
}