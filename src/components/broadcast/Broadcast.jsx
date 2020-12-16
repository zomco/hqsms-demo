import React from 'react'
import api from '../../api'
import { Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import reqwest from 'reqwest';

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
    state = {
        fileList: [],
        uploading: false,
        
      };
      handleUpload = () => {
        const { fileList } = this.state;
        const formData = new FormData();
        fileList.forEach(file => {
          formData.append('file', file);
        });
    
        this.setState({
          uploading: true,
        });
        // You can use any AJAX library you like
        reqwest({
            url: 'http://127.0.0.1:8080/broadcast/content/upload',
            method: 'post',
            processData: false,
            data: formData,
            success: (data) => {
                console.log(data);
            this.setState({
                fileList: [],
                uploading: false,
            });
            message.success('上传成功！');
            },
            error: (e) => {
                console.log(e);
            this.setState({
                uploading: false,
            });
            message.error('上传失败！');
            },
        });
        }; 
    render(){
        console.log(info);
        const { uploading, fileList } = this.state;
        const props = {
        onRemove: file => {
            this.setState(state => {
            const index = state.fileList.indexOf(file);
            const newFileList = state.fileList.slice();
            newFileList.splice(index, 1);
            return {
                fileList: newFileList,
            };
            });
        },
        beforeUpload: file => {
            this.setState(state => ({
            fileList: [...state.fileList, file],
            }));
            return false;
        },
        fileList,
        };
    
    return (
        <div>
            <h1>广播</h1>
            <Upload {...props}>
            <Button icon={<UploadOutlined />}>请上传音频</Button>
            </Upload>
            <Button
            type="primary"
            onClick={this.handleUpload}
            disabled={fileList.length === 0}
            loading={uploading}
            style={{ marginTop: 16 }}
            >
            {uploading ? 'Uploading' : 'Start Upload'}
            </Button>
            
            <br/>
            <br/>
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

            <h5>广播内容信息：</h5>
            
        </div>
        )
    }
}