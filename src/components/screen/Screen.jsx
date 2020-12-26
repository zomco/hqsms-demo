import React from 'react'
import api from '../../api'
import { Card } from 'antd';

export default class Screen extends React.Component{
    state={

    }
    componentDidMount(){
        api.getScreen()
        .then(res=>res.json())
        .then(data=>console.log(data))
    }
    render(){   
    return (
        <div>
            <Card title="设备信息" bordered={false} style={{ width: 300 }}>
                <p>设备名称：</p>
                <p>设备编号：</p>
                <p>设备型号：</p>
                <p>设备状态：</p>
                <p>供应商：</p>
                <p>Mac：</p>
                <p>音量：</p>
                <p>是否打开：</p>

            </Card>
        </div>
        )
    }
}