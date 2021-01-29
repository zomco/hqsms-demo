import React, { useState } from 'react';
import { Button, Modal, Form, Upload, Radio, Col, Row } from 'antd';

import { UploadOutlined } from '@ant-design/icons';
import api from '../../api';

const normFile = e => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
        return e;
    }
    return  e&&e.fileList
  };
const beforeUpload =file=>{
    let reader = new FileReader();
    reader.readAsBinaryString(file);
    return false
}
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
            form.resetFields();
            onCreate(values);
            let formData = new FormData()
            formData.append('file',values.file[0]);
            formData.append('type',values.type);
            formData.append("screenId", parseInt(values.termIds));

            api.postPicture(formData)
            .then(res=>res.json())
            .then(data=>console.log(data))
        })
        .catch((info) => {
            console.log('上传失败:', info);
        });
    }}
    >
    <Form
        form={form}
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
        <Form.Item name="type" label="请选择节目类型：">
            <Radio.Group>
            <Row>
                <Col span={12}>
                <Radio value="picture" style={{ lineHeight: '32px' }}>
                    图片
                </Radio>
                </Col>
                <Col span={12}>
                <Radio value="video" style={{ lineHeight: '32px' }}>
                    视频
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
            <Upload name="test" beforeUpload={beforeUpload} listType="file">
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