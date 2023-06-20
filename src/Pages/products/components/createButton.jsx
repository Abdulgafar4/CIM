/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Button, Modal, Form, Input, Select, Breadcrumb } from 'antd';
import { HomeOutlined, PlusCircleOutlined } from '@ant-design/icons';

const CreateButton = ({ onCreate }) => {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const { Option } = Select;
  const { TextArea } = Input;


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
                      title: <span>Create Product</span>
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
            name="sku"
            label="SKU"
            rules={[{ required: true, message: 'SKU can not be empty' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="name"
            label="Product Name"
            rules={[{ required: true, message: 'Product name can not be empty' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="price"
            label="Price"
            rules={[{ required: true, message: 'Enter a Price' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true, message: 'Category can not be empty' }]}
          >
            <Select
              mode="tags"
              style={{
                width: '100%',
              }}
              placeholder="Select the Product Category"

            >
              <Option value="phone">Phone</Option>
              <Option value="charger">Charger</Option>
              <Option value="powerbank">PowerBank</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="brand"
            label="Brand"
            rules={[{ required: true, message: 'Brand name can not be empty' }]}
          >
            <Select
              mode="tags"
              style={{
                width: '100%',
              }}
              placeholder="Select Brand"

            >
              <Option value="phone">Tecno</Option>
              <Option value="charger">Nokia</Option>
              <Option value="powerbank">Samsung</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="quantity"
            label="Quantity"
            rules={[{ required: true, message: 'Quantity can not be empty' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="variants"
            label="Variants"
            rules={[{ required: true, message: 'Variants can not be empty' }]}
          >
            <Select
              mode="tags"
              style={{
                width: '100%',
              }}
              placeholder="Select the Variants"

            >
              <Option value="red">Red</Option>
              <Option value="white">White</Option>
              <Option value="big">Big</Option>
              <Option value="small">small</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="supplier"
            label="Supplier"
            rules={[{ required: true, message: 'Supplier can not be empty' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="desc"
            label="Descriiption"
          >
            <TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CreateButton;
