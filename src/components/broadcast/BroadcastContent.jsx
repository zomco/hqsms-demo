import React from 'react'
import api from '../../api'
import { Upload, Button, message,Modal,Table,Popconfirm } from 'antd';


export default class Broadcast extends React.Component{
  
  constructor(){
    super();
    this.columns=[
      {
        title: 'broadcastId',
        dataIndex: 'broadcastId', 
      },
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
        dataIndex: 'type', 
      },
      {
        title: 'Id',
        dataIndex: 'id', 
      },
      
      {
        title: 'length',
        dataIndex: 'length', 
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
          {/* <Popconfirm title="是否删除?" onConfirm={() => this.handleDelete(record.key,record.programId)}>
            <Button key={1} type={"primary"} danger style={{marginRight:"3px"}}>删除</Button>  
          </Popconfirm> */}
          <Button type="primary" style={{marginRight:"30px"}} danger onClick={()=>{api.postBroadcastSetStatus({"id":record.id,"command":'stop'})}}>停止</Button>
          <Button type="primary" style={{marginRight:"30px"}} onClick={()=>{api.postBroadcastSetStatus({"id":record.id,"command":'play'})}}>播放</Button>
          <Button type="primary" style={{marginRight:"30px"}} onClick={()=>{api.postBroadcastSetStatus({"id":record.id,"command":'pause'})}}>暂停</Button>
          
          </div>
        ) : null,
      },
      ];
    this.state={
      list : [],
      fileList: [],
      isModalVisible  : false,
      setIsModalVisible :false,
      id:0,
      command:0,
      isPalyModalVisible: false,
    }
    
    }
    componentDidMount(){
        let newlist=[];
        api.getBroadcastContent()
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            data.content.map((element,index)=> (
               newlist.push({
                key:index,
                broadcastId:element.broadcastId,
                taskId:element.taskId,
                id:element.id,
                audioName:element.contentName!==null?element.contentName.substring(0,8):null,
                programId:element.programId,
                length:element.length,
                type:element.type,
                createdAt:element.createdAt.substring(0,10),
               }) 
               ));
            this.setState({
              list:newlist
            })
            console.log(this.state.list);
        }); 
    }

    getUrl = {
      name: 'file',
      action: 'http://47.115.144.65/api/broadcast-contents',
      headers: {
        authorization: 'authorization-text'
      },
      data:{
        broadcastId:1
      }
    };
    onChange=(info) => {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        // console.log(info.file.response.ProgramId);
          this.setState({
            isModalVisible  : true,
            id:info.file.response.ProgramId
          })
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} 上传失败`);
      }
    }
    
    // 上传音频
    handleOk = () => {
      this.setState({
        isModalVisible:false
      });
    };
    handleCancel = () => {
        this.setState({
          isModalVisible:false
        })
      };

    handleOk1 =()=>{
      this.setState({
        isPlayModalVisible:false
      })
    };

    handleCancel1 = () => {
      this.setState({
        isPalyModalVisible:false
      })
    };

    render(){
   
    return (
        <div>
            <h1>广播</h1>
            <Upload {...this.getUrl} onChange={this.onChange} showUploadList={false}>
              <Button type = {"primary"}>上传</Button>
            </Upload>
            
             {/* 实时播放弹窗 */}
             <Modal width={300} title="提示" visible={this.state.isModalVisible} onOk={this.handleOk} onCancel={this.handleCancel}>
              <p>上传成功!</p>
            </Modal>
            {/* 控制音频播放 */}
            <Modal width={350} title="控制音频播放" visible={this.state.isPlayModalVisible} onOk={this.handleOk1} onCancel={this.handleCancel1}>
              <Button type="primary" style={{marginRight:"30px"}} danger onClick={this.handleReturn}>停止</Button>
              <Button type="primary" style={{marginRight:"30px"}} onClick={this.handlePlay}>播放</Button>
              <Button type="primary" style={{marginRight:"30px"}} onClick={this.handleStop}>暂停</Button>
            </Modal>
            <h3>广播内容信息</h3>
            <Table size="middle" center columns={this.columns} dataSource={this.state.list}/>
        </div>
        )
    }
}
