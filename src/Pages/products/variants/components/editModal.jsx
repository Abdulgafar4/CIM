/* eslint-disable react/prop-types */
import { EditOutlined, HomeOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Form, Input, Modal, Select } from "antd";
import { useEffect } from "react";


export const EditButton = ({ record, onEdit }) => {

    const handleEditClick = () => {
      onEdit(record);
    };
  
    return (
      <Button icon={<EditOutlined />} onClick={handleEditClick} />
    );
  };

  const EditModal = ({ record, visible, onCancel, onSave }) => {
      const [form] = Form.useForm();
      const {Option} = Select;
    
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
        title={
          <Breadcrumb
              items={[
                  {
                      href: "/",
                      title: <HomeOutlined />,
                  },
                  {
                      href: "",
                      title: <span>Product Variants</span>,
                  },
                  {
                      href: "",
                      title: <span>Edit Variant</span>
                  }
              ]}
          />
      }
          open={visible}
          onCancel={onCancel}
          onOk={handleSave}
          okType="default"
          okText="Update"
        >
          <Form form={form} className='pt-5'>
          <Form.Item
              name="id"
              label="ID"
              rules={[{ required: true, message: 'ID can not be empty' }]}
            >
              <Input disabled />
            </Form.Item>
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
      );
    };
    
  export default EditModal