import React, { useContext, useState, useEffect, useRef } from 'react'
import api from '../../api'
import {Spin,Table,Popconfirm,Button,Input,Form} from 'antd'
import UploadTask from "./upLoadTask"

const EditableContext = React.createContext(null);
const EditableRow = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
      <Form form={form} component={false}>
        <EditableContext.Provider value={form}>
          <tr {...props} />
        </EditableContext.Provider>
      </Form>
    );
  };
  
  const EditableCell = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
  }) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef(null);
    const form = useContext(EditableContext);
    useEffect(() => {
      if (editing) {
        inputRef.current.focus();
      }
    }, [editing]);
  
    const toggleEdit = () => {
      setEditing(!editing);
      form.setFieldsValue({
        [dataIndex]: record[dataIndex],
      });
    };
  
    const save = async () => {
      try {
        const values = await form.validateFields();
        toggleEdit();
        handleSave({ ...record, ...values });
      } catch (errInfo) {
        console.log('Save failed:', errInfo);
      }
    };
  
    let childNode = children;
  
    if (editable) {
      childNode = editing ? (
        <Form.Item
          style={{
            margin: 0,
          }}
          name={dataIndex}
          rules={[
            {
              required: true,
              message: `${title} is required.`,
            },
          ]}
        >
          <Input ref={inputRef} onPressEnter={save} onBlur={save} />
        </Form.Item>
      ) : (
        <div
          className="editable-cell-value-wrap"
          style={{
            paddingRight: 24,
          }}
          onClick={toggleEdit}
        >
          {children}
        </div>
      );
    }
  
    return <td {...restProps}>{childNode}</td>;
  };

export default class ScreenPlan extends React.Component{
    // 列表表头
    columns=[
        {
            title:'createdAt',
            dataIndex:'createdAt'
        },
        {
            title:'cron',
            dataIndex:'cron',
            editable: true,
        },
        {
            title:'deletedAt',
            dataIndex:'deletedAt'
        },
        {
            title:'enable',
            dataIndex:'enable',
            editable: true,
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
            <Popconfirm title="是否修改?" onConfirm={()=>this.handleUpdata(text.id,text.cron,text.enable)}>
            <Button key={1} type={"primary"} style={{marginRight:"3px"}}>修改</Button>
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
    handleUpdata=(id,cron,enable)=>{
        console.log(enable);
        api.postScreenPlanUpdata({
            "cronExpr":cron,
            "enable":enable==='是'?true:false,
            "planId":id
        })
        .then(res=>res.json())
        .then(data=>console.log(data))
    }

    handleSave = (row) => {
        const newData = [...this.state.dataSource];
        const index = newData.findIndex((item) => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        this.setState({
          dataSource: newData,
        });
      };

    render(){
        const components = {
        body: {
            row: EditableRow,
            cell: EditableCell,
        },
        };
        const columns = this.columns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record) => ({
              record,
              editable: col.editable,
              dataIndex: col.dataIndex,
              title: col.title,
              handleSave: this.handleSave,
            }),
          };
        });

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
                <Table components={components} rowClassName={() => 'editable-row'} bordered columns={columns} dataSource={this.state.dataSource} />
                </> 
                )
        }
        
    }
}