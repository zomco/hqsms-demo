import React from 'react'
import api from '../../api/index'
import {
    Form,
    Upload,
    List,
    Statistic,
    message
  } from 'antd'
  import { InboxOutlined } from '@ant-design/icons';


export default class CameraHuman extends React.Component{
    constructor(props){
        super(props);
        this.state={
            baseUrl:"http://47.115.144.65/api",
            data:[],
            imgList:[],
      
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


    
    componentDidMount(){
        api.getCameraHuman()
        .then(res=>res.json())
        .then(data=>{
            this.setState({
                data:data,
               
            })
            
        })
    }
    render(){
        let faceUrl=""
        let getData=[]
        getData.push (this.state.data.map((element,index)=>{
            faceUrl="http://47.115.144.65/api/file/"+element.faceUrl
            return <img key={index} src={faceUrl} alt="" style={{width:'64px',height:'80px'}}/>
            }))
        console.log(getData);

        
        return(
            
            <div>
                <Form.Item style={{width:"200px"}}>
                    <Form.Item name="dragger"  valuePropName="fileList" getValueFromEvent={this.normFile}  noStyle>
                        <Upload.Dragger action="http://192.168.1.20:8080/api/camera-humans/feature" data={this.state.imgList} onChange={this.handleChange}> 
                            <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                            </p>
                            <p className="ant-upload-text">请上传人脸图片</p>
                        </Upload.Dragger>
                    </Form.Item>
                </Form.Item>
                
                <div className="up" style={{overflow:"hidden"}}>
                 <h1 style={{float:"left"}}>人脸图片：</h1>
                 <Statistic title="人流量" value={getData[0].length} style={{float:"left"}}/>
                </div>
                 <List
                grid={{
                column:24,
                gutter:10,
                }}
                pagination={{onChange:page=>{console.log(page);},pageSize:144,defaultCurrent:1}}
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