import React from 'react'
import api from '../../api'
import CollectionsPage from './upLoad'
import {Spin,Table,Popconfirm,Button,Upload,Form} from 'antd'


const action1='http://47.115.144.65/api/screen-contents/picture'
const action2='http://47.115.144.65/api/screen-contents/video'
export default class ScreenContent extends React.Component{
    // 列表表头
    columns=[
        {
            title:'内容Id',
            dataIndex:'id'
        },
        {
            title:'计划Id',
            dataIndex:'planId'
        },
        {
            title:'resolution',
            dataIndex:'resolution'
        },
        {
            title:'类型',
            dataIndex:'type'
        },
        {
            title:'size',
            dataIndex:'size'
        },
        {
            title:'更新时间',
            dataIndex:'updatedAt'
        },
        {
            title:'操作',
            render: (text, record) =>
            this.state.dataSourse.length >= 0 ? (
            <div>
            <Popconfirm title="是否删除?" onConfirm={() => this.handleDelete(record.key)}>
                <Button key={1} type={"primary"} danger style={{marginRight:"3px"}}>删除</Button>  
            </Popconfirm>
            </div>
            ):null ,
        },
    ];

    constructor(){
        super();
        this.state={
            isLoading:true,
            dataSourse:[],
            video:[],
            List:[],
            fileType:""
            
        }
    }


    // 投放处理
    // getUrl = {
    //     name: 'file',
    //     action: 'http://192.168.1.20:8080/api/screen-contents/video',
    //     headers: {
    //       authorization: 'authorization-text'
    //     },
    //   };
    // handleChange=(info) => {
    // if (info.file.status !== 'uploading') {
    //     console.log(info.file, info.fileList);
    // }
    // if (info.file.status === 'done') {
    //     this.setState({
    //         video:info.file.fileList,
    //         programId:info.file.response.ProgramId
    //     })
    // } else if (info.file.status === 'error') {
    //     message.error(`${info.file.name} 上传失败`);
    // }
    // }

    componentDidMount(){
        api.getScreenContents()
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            let datas=[]
            data.map((element,index)=>(
                datas.push({
                    key:index,
                    id:element.id,
                    planId:element.planId===null?'空':element.planId,
                    resolution:element.resolution===null?'空':element.resolution,
                    type:element.type,
                    size:element.size,
                    updatedAt:element.updatedAt===null?'暂无更新':element.updatedAtnull,
                })
            ));
            this.setState({
                dataSource:datas,
                isLoading:false
            });
        })
    }

    

     // 删除处理
     handleDelete = (key) => {
        const {dataSource} = this.state
        // 视图更新
        this.setState({ dataSource: dataSource.filter(element => element.key !== key) });
        // 发送删除请求
        // api.getScreenDelete({
        //   "programId":0,
        //   "termsId":[0]
        // })
        // .then(res=>res.json())
        // .then(data=>console.log(data))
      };



    render(){

    if (this.state.isLoading) {
        return(
            <Spin size="large" style={{padding:"50% 50%"}}></Spin>
        )
    }else{
        return(
            <>
            <h3>屏幕内容信息</h3>
            <CollectionsPage />
            <Table columns={this.columns} dataSource={this.state.dataSource} />
            </> 
            )
    }
    
}
}