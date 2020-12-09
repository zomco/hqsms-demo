import React from 'react'
import api from '../../api/index'
import { Table } from 'antd'

const columns = [
    {
      title: '最小风向',
      dataIndex: 'dn',
    },
    {
      title: '中等风向',
      dataIndex: 'dm',
    },
    {
      title: '最大风向',
      dataIndex: 'dx',
    },
    {
      title: '最小风速',
      dataIndex: 'sn',
    },
    {
        title: '中等风速',
        dataIndex: 'sm',
      },
      {
        title: '最大风速',
        dataIndex: 'sx',
      },
      {
        title: '温度',
        dataIndex: 'ta',
      },
      {
        title: '湿度',
        dataIndex: 'ua',
      },
      {
        title: '气压',
        dataIndex: 'pa',
      },
  ];
const list=[];
  function onChange(pagination, filters,  extra) {
    console.log('params', pagination, filters, extra);
  }
  
export default class Weather extends React.Component{
    componentDidMount(){
        api.getWeather()
        .then(res=>res.json())
        .then(data=>{
            data.map((element,index)=>{
                
                list.push({
                    key:index,
                    dn:element.dn,
                    dm:element.dm,
                    dx:element.dx,
                    sn:element.sn,
                    sm:element.sm,
                    sx:element.sx,
                    ta:element.ta,
                    ua:element.ua,
                    pa:element.pa
                })
            })   
        })
   
    }
    render(){
        console.log(list);
        return(
            <div>
                <h1>气象传感器</h1>
                <Table columns={columns} onChange={onChange} dataSource={list}/>
            </div>
        )
    }
}
