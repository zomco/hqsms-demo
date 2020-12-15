import React from 'react'
import api from '../../api/index'
import { Table,DatePicker, Space } from 'antd'
import moment from 'moment'
import 'moment/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';
import { Modal, Button } from 'antd';
import Draggable from 'react-draggable';

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
    const columns2=[
        {
            title: '名称',
            dataIndex: 'name',
            
        },
        {
            title: '最小值',
            dataIndex: 'mini',
            
        },
        {
            title: '平均值',
            dataIndex: 'average',
            
        },
        {
            title: '最大值',
            dataIndex: 'max',
            
        },
    ];
    let list=[]
    let weatherList=[]
    // 温度
    let taArr=[]
    let maxTa;
    let miniTa;
    let avgTa;
    // 湿度
    let uaArr=[]
    let maxUa;
    let miniUa;
    let avgUa;
    // 气压
    let paArr=[];
    let maxPa;
    let miniPa;
    let avgPa;

function getData(weatherList){
        taArr=[];
        uaArr=[];
        paArr=[];
        weatherList.map((item)=>{
            taArr.push(item['ta']);
            uaArr.push(item['ua']);
            paArr.push(item['pa']);
        })
        // console.log(taArr);
        maxTa=Math.max(...taArr);
        miniTa=Math.min(...taArr);
        if (taArr.length!=0) {
            avgTa=taArr.reduce((num,item,index)=>{
                if(index !=taArr.length-1){
                    return (num+item)
                }else{
                    return (num+item)/taArr.length
                }
            })
        }
        
        maxUa=Math.max(...uaArr);
        miniUa=Math.min(...uaArr);
        if (uaArr.length!=0) {
            avgUa=uaArr.reduce((num,item,index)=>{
                if(index !=uaArr.length-1){
                    return (num+item)
                }else{
                    return (num+item)/uaArr.length
                }
            })
        }
        maxPa=Math.max(...paArr);
        miniPa=Math.min(...paArr);
        if(paArr.length!=0){
            avgPa=paArr.reduce((num,item,index)=>{
                if(index !=paArr.length-1){
                    return (num+item)
                }else{
                    return (num+item)/paArr.length
                }
            })
        }
        }
        

    
    function tableChange(pagination, filters,  extra) {
        console.log('params', pagination, filters, extra);
    }
    //只能选择当前时间天数之前的时间
    const disabledDate = (current) => {
        return current > moment().startOf('day');
    }
    export default class Weather extends React.Component{
        constructor(){
            super()
            this.state={
                date1:[],
                date2:[],
                data:[],
                visible: false,
                disabled: true,
            }
            this.dateChange=this.dateChange.bind(this)
        }
        dateChange=(datas,dateStrings)=>{
            this.setState({
                // date1:parseInt(dateStrings[0].replace("-","").replace("-","")),
                // date2:parseInt(dateStrings[1].replace("-","").replace("-",""))
                date1:dateStrings[0],
                date2:dateStrings[1]
            });
            
        }
        
        showModal = () => {
            this.setState({
              visible: true,
              data:[
                {
                    key:'1',
                    name:'温度',
                    mini:miniTa,
                    average:avgTa.toFixed(2),
                    max:maxTa
                },
                {
                    key:'2',
                    name:'湿度',
                    mini:miniUa,
                    average:avgUa.toFixed(2),
                    max:maxUa
                },
                {
                    key:'3',
                    name:'气压',
                    mini:miniPa,
                    average:avgPa.toFixed(2),
                    max:maxPa
                },
                {
                    key:'4',
                    name:'风速',
                    mini:'0',
                    average:'0',
                    max:'0'
                },
                ],
            });
          };
        
          handleOk = e => {
            console.log(e);
            this.setState({
              visible: false,
            });
          };
        
          handleCancel = e => {
            console.log(e);
            this.setState({
              visible: false,
            });
          };
        
        
          componentWillMount(){
            list=[]
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
                        pa:element.pa/10
                    })
                })   
            })
    
        }
        render(){
            let {date1} =this.state;
            let {date2} =this.state;
            // 先清空，然后在往里面添加
            weatherList=[]
            list.map((item,index)=>{
                // console.log(date1+"/"+item.createdAt+"/"+date2);                 
                // console.log(date1<item.createdAt&&item.createdAt<date2);
                // let a = parseInt(item.createdAt.replace("-","").replace("-","")) 
                if (date1<=item.createdAt&&item.createdAt<=date2) {
                    
                    weatherList.push({
                        key:index,
                        createdAt:item.createdAt,
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
           getData(weatherList)
        // console.log(date1);
        // console.log(list);
            // 这个是我之前换的方法
            // let a=list.find(item=>date1<=item.createdAt&&item.createdAt<=date2)
            // console.log(a);
            // let a=list.find(item=>item.createdAt==="2020-12-03")
            
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

                    <Button onClick={this.showModal}>查看</Button>
                    <Modal
                    title={
                        <div
                        style={{
                            width: '100%',
                            cursor: 'move',
                        }}
                        onMouseOver={() => {
                            if (this.state.disabled) {
                            this.setState({
                                disabled: false,
                            });
                            }
                        }}
                        onMouseOut={() => {
                            this.setState({
                            disabled: true,
                            });
                        }}
                        // fix eslintjsx-a11y/mouse-events-have-key-events
                        // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/mouse-events-have-key-events.md
                        onFocus={() => {}}
                        onBlur={() => {}}
                        // end
                        >
                        <h5>{date1}-----{date2}</h5>
                        </div>
                        }
                        visible={this.state.visible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                        modalRender={modal => <Draggable disabled={this.state.disabled}>{modal}</Draggable> }
                        >
                        
                        <Table size="small" center columns={columns2} dataSource={this.state.data}/>
                        </Modal>
                    <br/>
                    <br/>
                    
                    <Table size="middle" center columns={columns} onChange={tableChange} dataSource={list}/>
                    
            </div>
            )
        }
    }
