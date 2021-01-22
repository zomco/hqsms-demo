import React, { useState } from 'react';
import { Button, Modal, Form, Upload,Input } from 'antd';

import api from '../../api';



const CollectionCreateForm = ({ visible, onCreate, onCancel }) => {

const [form] = Form.useForm();
return (
    <Modal
    visible={visible}
    title="新增计划"
    okText="确定"
    cancelText="取消"
    onCancel={onCancel}
    onOk={() => {
        form
        .validateFields()
        .then((values) => {
            form.resetFields();
            onCreate(values);
            console.log(values);
            
        })
        .catch((info) => {
            console.log('上传失败:', info);
        });
    }}
    >
    <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        style={{marginLeft:"5px"}}
    >
        <Form.Item name="planName" label="计划名称：">
            <Input  />
        </Form.Item>
        <Form.Item name="contentId" label="内容id：">
            <Input  />
        </Form.Item>
        <Form.Item name="ScreenId" label="屏幕id：">
            <Input  />
        </Form.Item>
        <Form.Item name="cronExpr" label="cronExpr：">
            <Input  />
        </Form.Item>
        <Form.Item name="endDate" label="结束时间：">
            <Input  />
        </Form.Item>
    </Form>
    </Modal>
);
};

const UploadTask = () => {
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

export default UploadTask