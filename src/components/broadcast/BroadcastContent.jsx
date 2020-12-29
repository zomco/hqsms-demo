import React from 'react'
import api from '../../api'
import { Upload, Button, message,Modal,Table,Popconfirm } from 'antd';


export default class Broadcast extends React.Component{
  
  constructor(){
    super();
    this.columns=[
      {
        title: 'programId',
        dataIndex: 'programId', 
      },
      {
        title: 'audioName',
        dataIndex: 'audioName', 
      },
      {
        title: 'audioType',
        dataIndex: 'audioType', 
      },
      {
        title: 'taskId',
        dataIndex: 'taskId', 
      },
      
      {
        title: 'length',
        dataIndex: 'length', 
      },
      {
        title: 'ftpUrl',
        dataIndex: 'ftpUrl', 
      },
      {
        title: 'createdAt',
        dataIndex: 'createdAt', 
      },
      {
        title: '操作',
        render: (text, record) =>
        this.state.list.length >= 1 ? (
          <div>
          <Popconfirm title="是否删除?" onConfirm={() => this.handleDelete(record.key,record.programId)}>
            <Button key={1} type={"primary"} danger style={{marginRight:"3px"}}>删除</Button>  
          </Popconfirm>
          <Upload {...this.getUrl} onChange={this.onChange} showUploadList={false}>
              <Button type = {"primary"}>上传</Button>
          </Upload>
          </div>
        ) : null,
      },
      ];
    this.state={
      list : [],
      fileList: [],
      isModalVisible  : false,
      setIsModalVisible :false,
      programId:0
    }
    
    }
    componentDidMount(){
        let newlist=[];
        api.getBroadcastContent()
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            data.map((element,index)=> (
               newlist.push({
                key:index,
                programId:element.programId,
                taskId:element.taskId,
                audioName:element.audioName.substring(0,8),
                audioType:element.audioType,
                length:element.length,
                ftpUrl:element.ftpUrl,
                createdAt:element.createdAt.substring(0,10),
               }) 
               ));
            this.setState({
              list:newlist
            })
            console.log(this.state.list);
        }); 
    }

    handleDelete = (key,programId) => {
      const list = [...this.state.list];
      // const programId=list.filter(item=>item.programId)
      this.setState({ list: list.filter(item => item.key !== key) });
      // console.log(programId);
      api.BroadcastDelete({
        "programId":parseInt(programId) 
      })
      .then(res=>res.json())
      .then(data=>console.log(data))
    };
   
     // 实时播放弹窗
     getUrl = {
      name: 'file',
      action: 'http://192.168.1.20:8080/api/broadcast-contents/upload',
      headers: {
        authorization: 'authorization-text'
      },
    };
    onChange=(info) => {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        // console.log(info.file.response.ProgramId);
          this.setState({
            isModalVisible  : true,
            programId:info.file.response.ProgramId
          })
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} 上传失败`);
      }
    }
    
     // 提示实时播放弹窗
    handleOk = () => {
      console.log(this.state.programId);
      this.setState({
        isModalVisible:false
      });
      api.postBroadcastCreateSession({
        "termIds":[2]
      })
      .then(res=>res.json())
      .then(data=>{
        console.log(data.sessionId);
        console.log(this.state.programId);
        api.postBroadcastSetandPlay({"sessionId":data.sessionId,"programId":this.state.programId})
        .then(res=>res.json())
        .then(data=>console.log(data))
      })
    };
    handleCancel = () => {
        this.setState({
          isModalVisible:false
        })
      };
    render(){
   
    return (
        <div>
            <h1>广播</h1>
            
             {/* 实时播放弹窗 */}
             <Modal width={300} title="上传成功！！" visible={this.state.isModalVisible} onOk={this.handleOk} onCancel={this.handleCancel}>
              <p>请问是否实时播放？</p>
            </Modal>
            <h3>广播内容信息</h3>
            <Table size="middle" center columns={this.columns} dataSource={this.state.list}/>
        </div>
        )
    }
}
