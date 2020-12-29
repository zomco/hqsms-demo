import React from 'react'
import api from "../../api"
import { Card,Spin } from 'antd'

export default class Screen extends React.Component{
    state={
        name:"",
        id:"",
        model:"",
        status:"",
        supplier:"",
        Mac:"",
        volume:"",
        isOn:"",
        isLoading:true
    }
    componentDidMount(){
        api.getScreen()
        .then(res=>res.json())
        .then(data=>{
            this.setState({
                isLoading:false,
                name:data.name,
                id:data.id,
                model:data.model,
                status:data.status,
                supplier:data.supplier,
                Mac:data.mac,
                volume:data.volume,
                isOn:data.isOn
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
                        <p>设备状态：{this.state.status}</p>
                        <p>供应商：{this.state.supplier}</p>
                        <p>Mac：{this.state.Mac}</p>
                        <p>音量：{this.state.volume}</p>
                        <p>是否打开：{this.state.isOn==="YES"?"打开":"关闭"}</p>
                    </Card>
                </div>
                )
        }
   
    }
}

 