/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { Modal, Form, Input, Button, Select } from 'antd';
import { EditOutlined } from "@ant-design/icons";

export const EditButton = ({ record, onEdit }) => {

  const handleEditClick = () => {
    onEdit(record);
  };

  return (
    <Button icon={<EditOutlined />} onClick={handleEditClick} />
  );
};


const EditModal = ({ record, visible, onCancel, onSave }) => {
  const { Option } = Select;
  const { TextArea } = Input;
    const [form] = Form.useForm();
  
    const handleSave = () => {
      form.validateFields().then(values => {
        onSave(values);
        form.resetFields();
        onCancel();
      });
      
    };
  
    useEffect(() => {
      if (record) {
        form.setFieldsValue(record);
      }
    }, [record, form]);
  
    return (
      <Modal
        title="Edit Record"
        open={visible}
        onCancel={onCancel}
        onOk={handleSave}
        okType="default"
        okText="Update"
      >
        <Form form={form}>
        <Form.Item
            name="sku"
            label="SKU"
            rules={[{ required: true, message: 'SKU can not be empty' }]}
          >
            <Input disabled />
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
              placeholder="Tags Mode"

            >
              <Option value="male">male</Option>
              <Option value="female">female</Option>
              <Option value="other">other</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="brand"
            label="Brand"
            rules={[{ required: true, message: 'Brand name can not be empty' }]}
          >
            <Input />
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
              placeholder="Tags Mode"

            >
              <Option value="male">male</Option>
              <Option value="female">female</Option>
              <Option value="other">other</Option>
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
    );
  };
  
export default EditModal