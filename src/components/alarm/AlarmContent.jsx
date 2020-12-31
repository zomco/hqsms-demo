import React from 'react'
import api from '../../api'
import { Table,Spin } from 'antd'


export default class AlarmContent extends React.Component{
    columns=[
        {
            title:'序号',
            dataIndex:'id'
        },
        {
            title:'报警器Id',
            dataIndex:'alarmId'
        },
        {
            title:'经度',
            dataIndex:'longitude'
        },
        {
            title:'纬度',
            dataIndex:'latitude'
        },
        {
            title:'安装时间',
            dataIndex:'createdAt'
        },
    ];
    state={
        dataSourse:[],
    }
    componentDidMount(){
        api.getAlarmLogs()
        .then(res=>res.json())
        .then(data=>{
            let list=[]
            if (data!==null) {
                data.content.map((item,index)=>(
                    list.push({
                        key:index,
                        id:item.id,
                        longitude:item.longitude,
                        latitude:item.latitude,
                        createdAt:item.createdAt,
                        alarmId:item.alarmId
                    })
                ))
            }else{
                this.setState({
                    dataSource:[]
                })
            }
            this.setState({
                dataSource:list
            })
        }
        )
    }
    
    render(){ 
        if (this.state.isLoading) {
            return (<Spin size="large" style={{padding:"30% 50%"}} />)
        }else{
            return (
                <div>
                     <Table  columns={this.columns} dataSource={this.state.dataSource} />
                </div>
                )
        }
   
    }
}