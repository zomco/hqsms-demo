import React from 'react'
import api from '../../api'
import {Card,Spin} from 'antd'
export default class Broadcast extends React.Component{
    state={
        code:"",
        model:"",
        name:"",
        supplier:"",
        productBatch:"",
        createdAt:"",
        purchaseAt:"",
        ip:"",
        volume:"",
        on:"",
        isLoading:true
    }
    componentDidMount(){
        api.getBroadcast()
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            this.setState({
                code:data.content[0].code,
                model:data.content[0].model,
                name:data.content[0].name,
                supplier:data.content[0].supplier,
                productBatch:data.content[0].productBatch,
                createdAt:data.content[0].createdAt.substring(0,10),
                purchaseAt:data.content[0].purchasedAt.substring(0,10),
                ip:data.content[0].ip,
                volume:data.content[0].volume,
                on:data.content[0].isOn,
                isLoading:false
            })
        });
        
    }
    render(){
        if (this.state.isLoading) {
            return(<Spin size="large" style={{padding:"30% 50%"}} />)
        }
        else {
            return (
                <Card title="设备信息" bordered={false} style={{ width: 300 }}>
                            <p>设备编码:{this.state.code}</p>
                            <p>设备型号:{this.state.model}</p>
                            <p>设备名称:{this.state.name}</p>
                            <p>供 应 商:{this.state.supplier}</p>
                            <p>生产批次:{this.state.productBatch}</p>
                            <p>安装时间:{this.state.createdAt}</p>
                            <p>采购日期:{this.state.purchaseAt}</p>
                            <p>IP地  址:{this.state.ip}</p>
                            <p>音    量:{this.state.volume}</p>
                            <p>运行状态:{this.state.on==="ON"?"打开":"关闭"}</p>
                </Card>
                )
        }

    }
}