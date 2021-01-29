import React,{useState} from 'react'
import moment from 'moment'
import 'moment/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';
import { Button,Modal,Form,Input,Table,Select,Radio,DatePicker,Slider,Checkbox,Alert} from 'antd';
import api from '../../api'
import { values } from 'mobx';
// import Checkbox from 'antd/lib/checkbox/Checkbox';

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
let type;
let every;
let daysInWeek=[];
let monthsInYear=[];
let dayInMonth=[];

let startTime;
let repeatTime;

let playMode;
let contentId;
let programId=[];
let enable;


let value1 ="";
let value2 ="";

export default class BroadcastTask extends React.Component{
    constructor(){
        super();
        this.columns=[
            {
                title: '广播id',
                dataIndex: 'broadcastId', 
            },
            {
                title: '创建时间',
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
            list:[],
            isVisible:false,
            isVisibleDay:false,
            isVisibleWeek:false,
            isVisibleMonth:false,
            alert:'none'
            }

    }
    
   
    componentDidMount(){
       let newList=[];
       api.getBroadcastTaskContent()
       .then(res=>res.json())
       .then(data=>{
           console.log(data);
           if(data!==null){
            data.content.map((item,index)=>(
                newList.push({
                    key:index,
                    broadcastId:item.contentId,
                    createdAt:item.createdAt.substring(0,10),
                    frozen:item.frozen===0?'冻结':'启用',
                    taskId:item.taskId,
                    taskName:item.planName,
                    playMode:item.playMode===0?'随机播放':'顺序播放',
                    repeatTime:item.repeatTime,
                    taskVol:item.planVol,
                    startTime:item.startTime.substring(0,10)
                })
                ))
           }
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
        const [form1] = Form.useForm();
        const [formd] = Form.useForm();
        const [formw] = Form.useForm();
        const [formm] = Form.useForm();




            return (
            <>
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
                      contentId=parseInt(values.contentId);
                      name=values.name;
                      startTime=date1;
                      repeatTime=parseInt(values.repeatTimes);
                      playMode=parseInt(values.playMode);
                      programId.push(parseInt(values.proramIds));
                      enable=parseInt(values.enable);
                    
                    })
                    .catch(info => { 
                      console.log('Validate Failed:', info);
                    
                    })
                    this.setState({
                        isVisible:true
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
                    label="计划名称"
                    rules={[{ required: true, message: '请输入任务名称' }]}
                    >
                    <Input />
                    </Form.Item>
                    <Form.Item
                    name="contentId"
                    label="内容Id"
                    rules={[{ required: true, message: '请输入内容Id' }]}
                    >
                    <Input />
                    </Form.Item>
                    {/* <Form.Item
                    name="proramIds"
                    label="内容编号"
                    rules={[{ required: true, message: '请输入内容编号' }]}
                    >
                    <Input />
                    </Form.Item> */}
                    <Form.Item
                    name="repeatTimes"
                    label="重复次数"
                    >
                    <Input id="input1" onChange={this.onChange1} value={value1}/>
                    </Form.Item>

                    <Form.Item name="range-time-picker" label="起止时间" {...layout} onFinish={this.onFinish} {...rangeConfig}>
                        <RangePicker locale={locale} disabledDate={this.disabledDate} onChange={this.dateChange} showTime format="YYYY-MM-DD HH:mm:ss" />
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
              <Modal visible={this.state.isVisible} title="任务类型" okText="确认" cancelText="取消" 
                onOk={()=>{
                    form1
                        .validateFields()
                        .then(values => {
                        form1.resetFields();
                        console.log(values);
                        type=parseInt(values.radio)
                        // 判断任务类型
                        if (values.radio==="1") {
                            this.setState({
                                isVisibleDay:true,
                                isVisible:false
                            })
                        }else if(values.radio==="2"){
                            this.setState({
                                isVisibleWeek:true,
                                isVisible:false
                            })
                        }else if(values.radio==="3"){
                            this.setState({
                                isVisibleMonth:true,
                                isVisible:false
                            })
                        }else if(values.radio==="4"){
                            // 发送一次性任务
                            api.postBroadcastTask({
                                "planName":name,
                                "type":type,
                                "startTime":startTime,
                                "playMode" :playMode,
                                "repeatTime":repeatTime,
                                "contentId" : contentId,
                                // "programIds":programId,
                                "enable" : enable,
                            }).then(this.setState({alert:'block'}))
                            this.setState({isVisible:false})
                        }else{
                            alert("输入失败")
                        }
                        onCreate(values);
                        })
                        .catch(info => { 
                            console.log('Validate Failed:', info);
                          })
                }}>
                <Form form={form1}>
                    <Form.Item name="radio" label="请选择">
                        <Radio.Group>
                        <Radio value="1">日任务</Radio>
                        <Radio value="2">周任务</Radio>
                        <Radio value="3">月任务</Radio>
                        <Radio value="4">一次性任务</Radio>
                        </Radio.Group>
                    </Form.Item>
                </Form>
                </Modal>
             <Modal visible={this.state.isVisibleDay} titie="具体时间" okText="确认" cancelText="取消" onCancel={() => {this.setState({isVisibleDay:false})}}
               onOk={() => {
                this.setState({isVisibleDay:false})
                formd
                  .validateFields()
                  .then(values => {
                    formd.resetFields();
                    onCreate(values);
                    
                    //   发送日计划请求
                    api.postBroadcastTask({
                        "planName":name,
                        "type":type,
                        "startTime":startTime,
                        "playMode" :playMode,
                        "repeatTime":repeatTime,
                        "contentId" : contentId,
                        // "programIds":programId,
                        "enable" : enable,
                        "every":every
                    })
                    .then(res=>res.json())
                  })
                  .catch(info => { 
                    console.log('Validate Failed:', info);
                  })
                
              }}>
                  <Form form={formd} style={{marginTop:"100px"}}>
                  <Form.Item
                    label="第几天"
                    name="every"
                    rules={[{ required: true, message: '请输入第几天!' }]}
                  >
                    <Input style={{ width:"80px"}}/>
                </Form.Item>
                </Form>
              </Modal>
              <Modal visible={this.state.isVisibleWeek} titie="具体时间" okText="确认" cancelText="取消" onCancel={() => {this.setState({isVisibleDay:false})}}
                    onOk={() => {
                        this.setState({isVisibleWeek:false})
                        formw
                          .validateFields()
                          .then(values => {
                              console.log(values.weeks);
                            values.weeks.map(item=>(
                                daysInWeek.push(parseInt(item))
                                ))
                            console.log(daysInWeek);
                            formw.resetFields();
                            onCreate(values);

                            //   发送周计划请求
                            api.postBroadcastTask({
                                "planName":name,
                                "type":type,
                                "startTime":startTime,
                                "playMode" :playMode,
                                "repeatTime":repeatTime,
                                "contentId" : contentId,
                                // "programIds":programId,
                                "enable" : enable,
                                "every":every,
                                "daysInWeek":daysInWeek
                            })
                            .then(res=>res.json())
                          })
                          .catch(info => { 
                            console.log('Validate Failed:', info);
                          })
                        
                      }}
              >
                  <Form form={formw}>
                    <Form.Item
                        label="第几周"
                        name="every"
                        rules={[{ required: true, message: '请输入第几周!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item name="weeks" label="请选择">
                        <Checkbox.Group>
                            <Checkbox value="1">星期一</Checkbox>
                            <Checkbox value="2">星期二</Checkbox>
                            <Checkbox value="3">星期三</Checkbox>
                            <Checkbox value="4">星期四</Checkbox>
                            <br />
                            <Checkbox value="5">星期五</Checkbox>
                            <Checkbox value="6">星期六</Checkbox>
                            <Checkbox value="7">星期日</Checkbox>
                        </Checkbox.Group>
                    </Form.Item>
                
                  </Form>
              </Modal>
                {/* 月任务 */}
              <Modal visible={this.state.isVisibleMonth} titie="具体时间" okText="确认" cancelText="取消" onCancel={() => {this.setState({isVisibleMonth:false})}}
                    onOk={() => {
                        this.setState({isVisibleMonth:false})
                        formm
                          .validateFields()
                          .then(values => {
                              console.log(values.month);
                            values.month.map(item=>(
                                monthsInYear.push(parseInt(item))
                                ))
                            
                            dayInMonth.push(parseInt(values.day))
                               
                            console.log(monthsInYear);
                            formm.resetFields();
                            onCreate(values);

                            //   发送月计划请求
                            api.postBroadcastTask({
                                "planName":name,
                                "type":type,
                                "startTime":startTime,
                                "playMode" :playMode,
                                "repeatTime":repeatTime,
                                "contentId" : contentId,
                                // "programIds":programId,
                                "enable" : enable,
                                "every":every,
                                "monthsInYear":monthsInYear,
                                "dayInMonth":dayInMonth
                            })
                            .then(res=>res.json())
                          })
                          .catch(info => { 
                            console.log('Validate Failed:', info);
                          })
                        
                      }}
              >
                  <Form form={formm}>
                    <Form.Item name="month" label="请选择">
                        <Checkbox.Group>
                            <Checkbox value="1">一月</Checkbox>
                            <Checkbox value="2">二月</Checkbox>
                            <Checkbox value="3">三月</Checkbox>
                            <Checkbox value="4">四月</Checkbox>
                            <Checkbox value="5">五月</Checkbox>
                            <Checkbox value="6">六月</Checkbox>
                            <br/>
                            <Checkbox value="7">七月</Checkbox>
                            <Checkbox value="2">八月</Checkbox>
                            <Checkbox value="3">九月</Checkbox>
                            <Checkbox value="4">十月</Checkbox>
                            <Checkbox value="5">十一月</Checkbox>
                            <Checkbox value="6">十二月</Checkbox>
                        </Checkbox.Group>
                    </Form.Item>
                    <Form.Item
                        label="第几天"
                        name="day"
                        rules={[{ required: true, message: '请输入第几天!' }]}
                    >
                        <Input />
                    </Form.Item>
                  </Form>
              </Modal>
            </>
            );
          };
        
        const CollectionsPage = () => {
            const [visible, setVisible] = useState(false);
            const onCreate = (values) => {
                console.log('Received values of form: ', values);
                every=parseInt(values.every);
                
                
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
            <Alert style={{display:this.state.alert}}
                message="发送成功"
                type="success"
                showIcon
                closable
                />
            <h5>广播定时任务:</h5>
            <CollectionsPage />
            <br/>
            <Table columns={this.columns} dataSource={this.state.list}></Table>
            
        </div>
        )
    }
}
