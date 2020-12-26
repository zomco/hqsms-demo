import React,{useState} from 'react'
import moment from 'moment'
import 'moment/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';
import { Button,Modal,Form,Input,Table,Select,Radio,DatePicker,Slider} from 'antd';
import api from '../../api'

const { Option } = Select;
const { RangePicker } = DatePicker;
const layout = {
labelCol: { span: 5 },
wrapperCol: { span: 18 },
};
const rangeConfig = {
rules: [{ type: 'array', required: true, message: 'Please select time!' }],
};

// 开始结束时间
let date1="";


let name="";
let leixing;

let startTime;
let repeatTime;

let playMode;
let termIds=[];
let programId=[];
let enable;


let value1 ="";
let value2 ="";
let judge1=false;
let judge2=false;
export default class BroadcastTask extends React.Component{
    constructor(){
        super();
        this.columns=[
            {
                title: '广播id',
                dataIndex: 'broadcastId', 
            },
            {
                title: '时间',
                dataIndex: 'createdAt', 
            },
            {
                title: '是否冻结',
                dataIndex: 'frozen', 
            },
            {
                title: '任务id',
                dataIndex: 'taskId', 
            },
            {
                title: '任务名称',
                dataIndex: 'taskName', 
            },
            {
                title: '播放模式',
                dataIndex: 'playMode', 
            },
            {
                title: '循环次数',
                dataIndex: 'repeatTime', 
            },
            {
                title: '音频音量',
                dataIndex: 'taskVol', 
            },
            {
                title: '开始时间',
                dataIndex: 'startTime', 
            },
        ]

        this.state={
            list:[]
            }

    }
    
       onChange1 = (e) => {
            e.preventDefault();
            value1=e.target.value
            judge2=true
        }

       onChange2 = (e) => {
            e.preventDefault();
            value2=e.target.value
            judge1=true
       }
   
    componentDidMount(){
       let newList=[];
       api.getBroadcastTaskContent()
       .then(res=>res.json())
       .then(data=>{
           console.log(data);
           data.map((item,index)=>(
           newList.push({
               key:index,
               broadcastId:item.broadcastId,
               createdAt:item.createdAt.substring(0,19),
               frozen:item.frozen===0?'冻结':'启用',
               taskId:item.taskId,
               taskName:item.taskName,
               playMode:item.playMode===0?'随机播放':'顺序播放',
               repeatTime:item.repeatTime,
               taskVol:item.taskVol,
               startTime:item.startTime
           })
           ))
       this.setState({
        list:newList
        })
       
    })
       

    }
    onFinish = fieldsValue => {
        const rangeTimeValue = fieldsValue['range-time-picker'];
        const values = {
        ...fieldsValue,
        'range-time-picker': [
        rangeTimeValue[0].format('YYYY-MM-DD HH:mm:ss'),
        rangeTimeValue[1].format('YYYY-MM-DD HH:mm:ss'),
        ],
    };
    console.log('Received values of form: ', values);
    };
    //只能选择当前时间天数之前的时间
    disabledDate = (current) => {
        return current < moment().startOf('day');
    }
    // 获取日期值
    dateChange=(data,dateStrings)=>{
            date1=dateStrings[0];
            // date2=dateStrings[1]
    }


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

                    //   发送创建计划请求
                      api.postBroadcastTask({
                        "taskName":name,
                        "type":leixing,
                        "startTime":startTime,
                        "playMode" :playMode,
                        "repeatTime":repeatTime,
                        "termIds" : termIds,
                        "programIds":programId,
                        "enable" : enable
                      })
                      .then(res=>res.json())
                      .then(data=>console.log(data))
                    })
                    .catch(info => { 
                      console.log('Validate Failed:', info);
                    
                    })
                }}
              >
                <Form
                  form={form}
                  {...layout}
                  name="nest-messages"
                  initialValues={{ modifier: 'public' }}
                >
                    <Form.Item
                    name="name"
                    label="任务名称"
                    rules={[{ required: true, message: '请输入任务名称' }]}
                    >
                    <Input />
                    </Form.Item>
                    <Form.Item
                    name="termIds"
                    label="目标终端"
                    rules={[{ required: true, message: '请输入目标终端' }]}
                    >
                    <Input />
                    </Form.Item>
                    <Form.Item
                    name="proramIds"
                    label="内容编号"
                    rules={[{ required: true, message: '请输入内容编号' }]}
                    >
                    <Input />
                    </Form.Item>
                    <Form.Item
                    name="repeatTimes"
                    label="重复次数"
                    >
                    <Input id="input1" onChange={this.onChange1} value={value1} disabled={judge1} />
                    </Form.Item>
                    <Form.Item
                    name="length"
                    label="任务时长"
                    >
                    <Input id="input2" onChange={this.onChange2} value={value2} disabled={judge2}/>
                    </Form.Item>

                    <Form.Item name="range-time-picker" label="起止时间" {...layout} onFinish={this.onFinish} {...rangeConfig}>
                        <RangePicker locale={locale} disabledDate={this.disabledDate} onChange={this.dateChange} showTime format="YYYY-MM-DD HH:mm:ss" />
                    </Form.Item>

                    <Form.Item label="任务类型" rules={[{ required: true}]}>
                    <Input.Group compact>
                    <Form.Item
                        name={['type', 'leixing']}
                        rules={[{ required: true, message: '请选择任务类型' }]}
                    >
                        <Select placeholder="类型">
                        <Option value="1">日任务</Option>
                        <Option value="2">周任务</Option>
                        <Option value="3">月任务</Option>
                        <Option value="4">一次性任务</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name={['type', 'xiangqing']}
                    >
                        <Input style={{ width: '80%' }} placeholder="请输入详细时间" />
                    </Form.Item>
                    </Input.Group>
                    </Form.Item>

                    <Form.Item name="vol" label="音  量">
                        <Slider
                        marks={{
                            0: '静音',
                            33: '弱',
                            66: '一般',
                            99: '强',
                        }}
                        />
                    </Form.Item>
                    <Form.Item name="playMode" label="播放模式">
                        <Radio.Group>
                        <Radio value="0">顺序播放</Radio>
                        <Radio value="1">随机播放</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item name="enable" label="是否冻结">
                        <Radio.Group>
                        <Radio value="0">冻结</Radio>
                        <Radio value="1">启用</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item name="status" label="是否启动">
                        <Radio.Group>
                        <Radio value="0">启动</Radio>
                        <Radio value="1">停止</Radio>
                        </Radio.Group>
                    </Form.Item>
                </Form>
              </Modal>
            );
          };
        
        const CollectionsPage = () => {
            const [visible, setVisible] = useState(false);
          
            const onCreate = values => {
                console.log('Received values of form: ', values);
                termIds.push(parseInt(values.termIds));
                name=values.name;
                leixing=parseInt(values.type.leixing);
                // xiangqing=parseInt(values.xiangqing);
                startTime=date1;
                repeatTime=parseInt(values.repeatTimes);
                // length=parseInt(values.length);
                playMode=parseInt(values.playMode);
                programId.push(parseInt(values.proramIds));
                enable=parseInt(values.enable);
                // endDate=date2;
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
            <h5>广播定时任务:</h5>
            <CollectionsPage />
            <br/>
            <Table columns={this.columns} dataSource={this.state.list}></Table>
        </div>
        )
    }
}
