import React from 'react'
import api from '../../api'
import {Spin,Table,Popconfirm,Button,Upload,Form} from 'antd'
import UploadTask from "./upLoadTask"

export default class ScreenPlan extends React.Component{
    // 列表表头
    columns=[
        {
            title:'createdAt',
            dataIndex:'createdAt'
        },
        {
            title:'cron',
            dataIndex:'cron'
        },
        {
            title:'deletedAt',
            dataIndex:'deletedAt'
        },
        {
            title:'enable',
            dataIndex:'enable'
        },
        {
            title:'endDate',
            dataIndex:'endDate'
        },
        {
            title:'id',
            dataIndex:'id'
        },
        {
            title:'planName',
            dataIndex:'planName'
        },
        {
            title:'jobName',
            dataIndex:'jobName'
        },
        {
            title:'screenId',
            dataIndex:'screenId'
        },
        {
            title:'startTime',
            dataIndex:'startTime'
        },
        {
            title:'updatedAt',
            dataIndex:'updatedAt'
        },
        {
            title:'操作',
            render: (text, record) =>
            this.state.dataSourse.length >= 0 ? (
            <div>
            <Popconfirm title="是否删除?" onConfirm={() => this.handleDelete(record.key,text.id)}>
                <Button key={1} type={"primary"} danger style={{marginRight:"3px"}}>删除</Button>  
            </Popconfirm>
            <Button key={1} type={"primary"} onClick={()=>this.handleUpdata(text.id,text.cron)}style={{marginRight:"3px"}}>更新</Button>
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
        api.getScreenPlan()
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            let datas=[]
            if (data!==null) {
                data.content.map((element,index)=>(
                    datas.push({
                        key:index,
                        createdAt:element.createdAt.substring(0,10),
                        cron:element.cron,
                        deletedAt:element.deletedAt===null?'无':element.deletedAt,
                        endDate:element.endDate===null?'无':element.endDate,
                        enable:element.enable===true?'是':'否',
                        id:element.id,
                        planName:element.planName,
                        jobName:element.jobName,
                        screenId:element.screenId,
                        startTime:element.startTime===null?'无':element.startTime,
                        updatedAt:element.updatedAt===null?'暂无更新':element.updatedAtnull,
                    })
                ));
            }else{
                alert("没有数据")
            }
            this.setState({
                dataSource:datas,
                isLoading:false
            });
        })
    }

     // 删除处理
     handleDelete = (key,id) => {
         console.log(id);
        const {dataSource} = this.state
        // 视图更新
        this.setState({ dataSource: dataSource.filter(element => element.key !== key) });
        // 发送删除请求
        api.getScreenPlanDel({planId:id})
        .then(res=>res.json())
        .then(data=>console.log(data))
      };

    // 更新处理
    handleUpdata=(id,cron)=>{
        api.postScreenPlanUpdata({
            "cronExpr":cron,
            "enable":true,
            "planId":id
        })
        .then(res=>res.json())
        .then(data=>console.log(data))
    }

    render(){

    if (this.state.isLoading) {
        return(
            <Spin size="large" style={{padding:"50% 50%"}}></Spin>
        )
    }else{
        return(
            <>
            <h3>屏幕计划信息</h3>
            {/* <CollectionsPage /> */}
            <UploadTask />
            <Table columns={this.columns} dataSource={this.state.dataSource} />
            </> 
            )
    }
    
}
}