import React from 'react'
import api from '../../api'

let info = []
export default class Broadcast extends React.Component{
    componentWillMount(){
        info=[];
        api.getBroadcast()
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            data.map(element => {
               info.push({
                    code:element.code,
                    model:element.model,
                    name:element.name,
                    supplier:element.supplier,
                    productBatch:element.productBatch,
                    createdAt:element.createdAt.substring(0,10),
                    purchaseAt:element.purchaseAt,
                    ip:element.ip,
                    volume:element.volume,
                    on:element.on
               }) 
            });
        });
        
    }
    render(){
        console.log(info);     
    return (
        <div>
            <h5>广播设备信息:</h5>
           
            {info.map((item,index)=>{
               return   <ul style={{fontSize:"16px"}}>
                            <li key={index}>设备编码：{item.code}</li>
                            <li key={index}>设备型号:{item.model}</li>
                            <li key={index}>设备名称:{item.name}</li>
                            <li key={index}>供应商:{item.supplier}</li>
                            <li key={index}>生产批次:{item.productBatch}</li>
                            <li key={index}>安装时间:{item.createdAt}</li>
                            <li key={index}>采购日期:{item.purchaseAt}</li>
                            <li key={index}>IP地  址:{item.ip}</li>
                            <li key={index}>音    量:{item.volume}</li>
                            <li key={index}>运行状态:{item.on===true ? "打开":"关闭"}</li>
                         </ul>
                        
                      
            })}

            
        </div>
        )
    }
}