/* eslint-disable react/prop-types */
import { HomeOutlined, PlusCircleOutlined } from "@ant-design/icons"
import { Breadcrumb, Button, Form, Input, Modal } from "antd"
import { useState } from "react";

function CreateBtn({ onCreate }) {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();


  const handleCreate = () => {
    form.validateFields().then(values => {
      onCreate(values);
      form.resetFields();
      setVisible(false);
    });
  };

  return (
    <div style={{ marginBottom: 16 }}>
      <Button type='primary' className='bg-green-500 text-white' icon={<PlusCircleOutlined />} onClick={() => setVisible(true)}>Create</Button>
      <Modal
        title={
          <Breadcrumb
              items={[
                  {
                      href: "/",
                      title: <HomeOutlined />,
                  },
                  {
                      href: "/products",
                      title: <span>Products List</span>,
                  },
                  {
                      href: "",
                      title: <span>Create Category</span>
                  }
              ]}
          />
      }
        open={visible}
        onCancel={() => setVisible(false)}
        onOk={handleCreate}
        okType='default'
        okText="Save"
      >
        <Form form={form} className='pt-5'>
          <Form.Item
            name="name"
            label="Category"
            rules={[{ required: true, message: 'This can not be empty' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default CreateBtn