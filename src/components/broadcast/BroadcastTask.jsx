import React,{useState} from 'react'
import { Upload, Button, message,Modal,Form,Input,Table} from 'antd';
import api from '../../api'


export default class BroadcastTask extends React.Component{
    componentWillMount(){
        
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
                    name="name"
                    label="任务名称"
                    rules={[{ required: true, message: '请输入任务名称' }]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item name="type" label="任务类型">
                    <Input />
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
            <h5>广播定时任务:</h5>
            <CollectionsPage />
            
        </div>
        )
    }
}
