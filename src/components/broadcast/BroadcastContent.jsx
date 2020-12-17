import React,{ useState } from 'react'
import api from '../../api'
import { Upload, Button, message,Modal,Form,Input,Table,Popconfirm } from 'antd';
import { render } from 'react-dom'







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
          <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
            <Button key={1} type={"primary"} danger style={{marginRight:"3px"}}>删除</Button>  
          </Popconfirm>
          <Upload {...this.getUrl} onChange={this.onChange} showUploadList={false}>
              <Button type = {"primary"}>上传</Button>
          </Upload>
          </div>
        ) : null,
      },
      ];
    // this.getUrl.onChange = this.onChange.bind(this)
    this.state={
      list : [],
      fileList: [],
      isModalVisible  : false,
      setIsModalVisible :false
    }
    
    }
    componentDidMount(){
        let newlist=[];
        api.getBroadcastContent()
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            data.map((element,index)=> {
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
            });
            this.setState({
              list:newlist
            })
            console.log(this.state.list);
        }); 
    }

    handleDelete = key => {
      const list = [...this.state.list];
      this.setState({ list: list.filter(item => item.key !== key) });
    };
   
     // 实时播放弹窗
     getUrl = {
      name: 'file',
      action: 'http://127.0.0.1:8080/broadcast/content/upload',
      headers: {
        authorization: 'authorization-text'
      },
    };
    onChange=(info) => {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
          this.setState({
            isModalVisible  : true,
          })
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} 上传失败`);
      }
    }
     // 提示实时播放弹窗
    handleOk = () => {
      this.setState({
        isModalVisible:false
      });
      api.postBroadcastCreateSession({"termIds":[2]})
      .then(res=>(res.json))
      .then(data=>{
        api.postBroadcastSetandPlay({"sessionId":data.sessionId,"programId":42})
        .then(res=>(res.json))
      })
    };
    handleCancel = () => {
        this.setState({
          isModalVisible:false
        })
      };
    render(){
        interface Values {
            title: string;
            description: string;
            modifier: string;
          }
          
        interface CollectionCreateFormProps {
        visible: boolean;
        onCreate: (values: Values) => void;
        onCancel: () => void;
        }
        

        const CollectionCreateForm: React.FC<CollectionCreateFormProps> = ({
        visible,
        onCreate,
        onCancel,
        }) => {
        const [form] = Form.useForm();
            return (
              <Modal
                visible={visible}
                title="创建广播任务"
                okText="确认"
                cancelText="取消"
                onCancel={onCancel}
                onOk={() => {
                  form
                    .validateFields()
                    .then(values => {
                      form.resetFields();
                      onCreate(values);
                    })
                    .catch(info => {
                      console.log('Validate Failed:', info);
                    });
                }}
              >
                <Form
                  form={form}
                  layout="vertical"
                  name="form_in_modal"
                  initialValues={{ modifier: 'public' }}
                >
                  <Form.Item
                    name="title"
                    label="Title"
                    rules={[{ required: true, message: 'Please input the title of collection!' }]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item name="description" label="Description">
                    <Input type="textarea" />
                  </Form.Item>
                  {/* <Form.Item name="modifier" className="collection-create-form_last-form-item">
                    <Radio.Group>
                      <Radio value="public">Public</Radio>
                      <Radio value="private">Private</Radio>
                    </Radio.Group>
                  </Form.Item> */}
                </Form>
              </Modal>
            );
          };
        
        const CollectionsPage = () => {
            const [visible, setVisible] = useState(false);
          
            const onCreate = values => {
              console.log('Received values of form: ', values);
              setVisible(false);
            };
          
        return (
            <div>
            <Button
                type="primary"
                onClick={() => {
                setVisible(true);
                }}
            >
                新增
            </Button>
            <CollectionCreateForm
                visible={visible}
                onCreate={onCreate}
                onCancel={() => {
                setVisible(false);
                }}
            />
            </div>
        );
        };
       
    return (
        <div>
            <h1>广播</h1>
            {/* 创建实时播放任务 */}
            <CollectionsPage />
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
