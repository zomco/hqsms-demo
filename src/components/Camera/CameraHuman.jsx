import React from 'react'
import api from '../../api/index'
import {
    Form,
    Upload,
    List,
    Card
  } from 'antd'
  import { InboxOutlined } from '@ant-design/icons';

    const normFile = e => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList
  };
const handleFnishi=(data)=>{
    console.log(data);
}  




export default class CameraHuman extends React.Component{
    constructor(props){
        super(props);
        this.state={
            baseUrl:"http://localhost:8080",
            data:[]
        }
    }
        
    componentDidMount(){
        api.getCameraHuman()
        .then(res=>res.json())
        .then(data=>{
            this.setState({
                data:data
            })
            
        })
    }
    render(){
        let faceUrl=""
        let getData=[]
        getData.push (this.state.data.map((element,index)=>{
            faceUrl="http://localhost:8080/file/"+element.faceUrl
            return <img key={index} src={faceUrl} alt="" style={{width:'64px',height:'80px'}}/>
            }))
        console.log(getData);
        return(
            
            <div>
                <Form.Item style={{width:"200px"}}>
                    <Form.Item name="dragger" valuePropName="fileList" getValueFromEvent={normFile}  noStyle>
                        <Upload.Dragger name="flie" action="http://127.0.0.1:8080/camera/human/feature" onFinish={handleFnishi}> 
                            <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                            </p>
                            <p className="ant-upload-text">请上传人脸图片</p>
                        </Upload.Dragger>
                    </Form.Item>
                </Form.Item>

                
                 <h1>人脸图片：</h1>
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
                 {/* <Pagination defaultCurrent={1} total={500} onChange={onChange} defaultPageSize={100} /> */}
                {/* {
                    this.state.data.map((element,index)=>{
                        let faceUrl="http://localhost:8080/file/"+element.faceUrl
                        return <img key={index} src={faceUrl} alt="" style={{width:'64px',height:'80px',padding:'0 3px 3px 0'}}/>
                    })
                }
                 */}
                
            </div>
        )
    }
}