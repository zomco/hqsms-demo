import React from 'react'
import api from '../../api/index'
import { Table,DatePicker, Space } from 'antd'
import moment from 'moment'
import 'moment/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';
import { render } from 'react-dom';

    const { RangePicker } = DatePicker
    const dateFormat = 'YYYY-MM-DD'
    const columns = [
        {
            title: '时间',
            dataIndex: 'createdAt',
            
        },
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
    const weatherList=[];
    function tableChange(pagination, filters,  extra) {
        console.log('params', pagination, filters, extra);
    }
//   只能选择当前时间天数之前的时间
    const disabledDate = (current) => {
        return current > moment().startOf('day');
    }
    
    export default class Weather extends React.Component{
        constructor(){
            super()
            this.state={
                date:[]
            }
            this.dateChange=this.dateChange.bind(this)
        }
        dateChange=(datas,dateStrings)=>{
            this.setState({
                date:dateStrings
            })
        }
            
        
        componentDidMount(){
            api.getWeather()
            .then(res=>res.json())
            .then(data=>{
                // console.log(data);
                data.map((element,index)=>{
                    
                    list.push({
                        key:index,
                        createdAt:element.createdAt.substring(0,10),
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
            let {date} =this.state
            const date1=date[0].replace("-","");
            const date2=date[1].replace("-","");
            const d1=parseInt(date1)
            const d2=parseInt(date2)
            console.log(d1);
            console.log(d2);
            console.log(date);
            // console.log(list);
            return(
                <div>
                    <h1>气象传感器</h1>
                    <span><h4 style={{display:"inline"}}>请选择时间：</h4></span>
                    <Space direction="vertical" size={12}>
                        <RangePicker
                        locale={locale} size="large" 
                        onChange={this.dateChange}
                        defaultValue={moment()}
                        format={dateFormat}
                        disabledDate={disabledDate}
                        dateRender={current => {
                            const style = {};
                            if (current.date() === 1) {
                            style.border = '1px solid #1890ff';
                            style.borderRadius = '50%';
                            }
                            return (
                            <div className="ant-picker-cell-inner" style={style}>
                                {current.date()}
                            </div>
                            );
                        }}
                        />
                    </Space>,
                    <br/>
                    <br/>
                    {/* 表格 */}
                    {   
                        list.map((item,index)=>{
                            if (date[0]<item.createdAt<date[1]) {
                                weatherList.push({
                                    key:index,
                                    createdAt:item.createdAt.substring(0,10),
                                    dn:item.dn,
                                    dm:item.dm,
                                    dx:item.dx,
                                    sn:item.sn,
                                    sm:item.sm,
                                    sx:item.sx,
                                    ta:item.ta,
                                    ua:item.ua,
                                    pa:item.pa
                                })
                            }
                        })
                    }
                    <Table size="middle" center columns={columns} onChange={tableChange} dataSource={weatherList}/>
                    
            </div>
            )
        }
    }
