/* eslint-disable react/prop-types */
import { HomeOutlined, PlusCircleOutlined } from "@ant-design/icons"
import { Breadcrumb, Button, Form, Input, Modal, Select } from "antd"
import { useState } from "react";

function CreateBtn({ onCreate }) {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  const {Option} = Select;

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
                      title: <span>Create Variant</span>
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
            label="Variant Name"
            rules={[{ required: true, message: 'This can not be empty' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="options"
            label="Variant Options"
            rules={[{ required: true, message: 'This can not be empty' }]}
          >
          <Select
              mode="tags"
              style={{
                width: '100%',
              }}
              placeholder="Select the variant"

            >
              <Option value="red">Red</Option>
              <Option value="blue">Blue</Option>
              <Option value="big">Big</Option>
            </Select>
            </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default CreateBtn