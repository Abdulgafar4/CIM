/* eslint-disable react/prop-types */
import { EditOutlined, HomeOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Form, Input, Modal } from "antd";
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
                      title: <span>Product Brands</span>,
                  },
                  {
                      href: "",
                      title: <span>Edit Brand</span>
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
              label="Brand Name"
              rules={[{ required: true, message: 'Brand name can not be empty' }]}
            >
              <Input />
            </Form.Item>
          </Form>
        </Modal>
      );
    };
    
  export default EditModal