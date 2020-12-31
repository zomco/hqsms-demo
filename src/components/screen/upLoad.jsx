import React, { useState } from 'react';
import { Button, Modal, Form, Upload, Radio, Col, Row } from 'antd';

import { UploadOutlined } from '@ant-design/icons';
import api from '../../api';

const normFile = e => {
    console.log('Upload event:', e);
    // if (Array.isArray(e)) {
    //     return e;
    // }
    return  e.fileList
  };
// const beforeUpload =file=>{
//     let reader = new FileReader();
//     reader.readAsBinaryString(file);
//     return false
// }
const CollectionCreateForm = ({ visible, onCreate, onCancel }) => {

const [form] = Form.useForm();
return (
    <Modal
    visible={visible}
    title="投放视频/图片"
    okText="确定"
    cancelText="取消"
    onCancel={onCancel}
    onOk={() => {
        form
        .validateFields()
        .then((values) => {
            // let formData = new FormData()
            // formData.append('file','jajksdna');
            // formData.append('termsIds','1');
            form.resetFields();
            onCreate(values);
            // let termIds=[]
            // values.termIds.map(item=>(
            //     termIds.push(parseInt(item))
            // ))
            // console.log(values.termIds);
            // values.termIds.map(item=>{
            //     termIds.push(parseInt(item))
            // })
            console.log(values);
            
            if (values.file[0].type==="audio/mpeg") {
                api.postVideo({"termIds":"1","file":values.file[0]})
                .then(res=>res.json())
                .then(data=>console.log(data))
            }else if(values.file[0].type==="image/jpeg"){
                api.postPicture({"termIds":"1","file":values.file[0]})
                .then(res=>res.json())
                .then(data=>console.log(data))
            }
        })
        .catch((info) => {
            console.log('上传失败:', info);
        });
    }}
    >
    <Form
        form={form}
        // enctype="multipart/form-data"
        encType="multipart/form-data"
        layout="vertical"
        name="form_in_modal"
        // initialValues={{
        // modifier: 'public',
        // }}
        style={{marginLeft:"5px"}}
    >
        <Form.Item name="termIds" label="请选择目标终端：">
        <Radio.Group>
        <Row>
            <Col span={8}>
            <Radio value="1" style={{ lineHeight: '32px' }}>
                终端1
            </Radio>
            </Col>
            <Col span={8}>
            <Radio value="2" style={{ lineHeight: '32px' }}>
                终端2
            </Radio>
            </Col>
            <Col span={8}>
            <Radio value="3" style={{ lineHeight: '32px' }}>
                终端3
            </Radio>
            </Col>
            <Col span={8}>
            <Radio value="4" style={{ lineHeight: '32px' }}>
                终端4
            </Radio>
            </Col>
            <Col span={8}>
            <Radio value="5" style={{ lineHeight: '32px' }}>
                终端5
            </Radio>
            </Col>
            <Col span={8}>
            <Radio value="6" style={{ lineHeight: '32px' }}>
                终端6
            </Radio>
            </Col>
        </Row>
        </Radio.Group> 

    </Form.Item>
        <Form.Item
            name="file"
            label="上传"
            valuePropName="file"
            getValueFromEvent={normFile}
        >
            <Upload name="test" beforeUpload={()=>{return false}} listType="file">
            <Button icon={<UploadOutlined />}>点击上传图片/视频</Button>
            </Upload>
        </Form.Item>
       
    </Form>
    </Modal>
);
};

const CollectionsPage = () => {
  const [visible, setVisible] = useState(false);

  const onCreate = (values) => {
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
        投放
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

export default CollectionsPage