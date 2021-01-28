import React from 'react'
import api from '../../api/index'
import {
    Form,
    Upload,
    List,
    Statistic,
    message,
    Spin
    
  } from 'antd'
  import { InboxOutlined } from '@ant-design/icons';





export default class CameraHuman extends React.Component{
    constructor(props){
        super(props);
        this.state={
            baseUrl:"http://47.115.144.65/api",
            humanCount:0,
            data:[],
            imgList:[],
            totalPages:1,
            pageSize:0,
            isLoading:true
      
        }
    }
    
    normFile = e => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
          return e;
        }
        this.setState({
            imgList:e.fileList
        })
        return e && e.fileList
      };

    handleChange=(info)=>{
        if (info.file.status !=='done') {
            if (info.file.status === 500) {
                message.error('上传文件失败');
                return  
            }else{
            this.setState({
                imgList:info.fileList
            })
            }
        }
    
    }

    pageChange=(page)=>{
        api.getCameraHuman({page:page})
        .then(res=>res.json())
        .then(data=>{
            this.setState({
                data:data.content
            })
        })
    }
    
    componentDidMount(){
        api.getCameraHuman({page:0})
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            this.setState({
                data:data.content,
                humanCount:data.totalElements,
                totalPages:data.totalPages,
                pageSize:data.size,
                isLoading:false
               
            })
        })
    }


    render(){
        let faceUrl=""
        let getData=[]
        if (this.state.data!==null) {
            getData.push (this.state.data.map((element,index)=>{
                faceUrl="http://47.115.144.65/api/file/"+element.faceUrl
                return <img key={index} src={faceUrl} alt="" style={{width:'130px',height:'160px',marginRight:'5px'}}/>
                }))
        }
        console.log(getData);

        if (this.state.isLoading) {
            return(<Spin style={{padding:"30% 50%"}} size="large" />)
        }else{
             
        return(
            
            <div>
                <Form.Item style={{width:"200px"}}>
                    <Form.Item name="dragger"  valuePropName="fileList" getValueFromEvent={this.normFile}  noStyle>
                        <Upload.Dragger action="http://47.115.144.65//api/camera-humans/feature" data={this.state.imgList} onChange={this.handleChange}> 
                            <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                            </p>
                            <p className="ant-upload-text">请上传人脸图片</p>
                        </Upload.Dragger>
                    </Form.Item>
                </Form.Item>
                
                <div className="up" style={{overflow:"hidden"}}>
                 <h1 style={{float:"left"}}>人脸图片：</h1>
                 <Statistic title="人流量" value={this.state.humanCount} style={{float:"left"}}/>
                </div>
                
                <List
                grid={{
                column:11,
                gutter:4,
                }}
                pagination={
                    {
                    total:this.state.humanCount,
                    onChange:this.pageChange,
                    defaultCurrent:1,
                    pageSize:this.state.pageSize,
                    onShowSizeChange:true,
                    }
                }
                dataSource={getData[0]}
                renderItem={item=>(
                    <List.Item>
                    {item}
                    </List.Item>
                )}/>
    
               
                
            </div>
        )
        }
       
    }
}