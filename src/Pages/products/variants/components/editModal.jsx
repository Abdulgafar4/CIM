/* eslint-disable react/prop-types */
import { EditOutlined, HomeOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Form, Input, Modal, Select, message } from "antd";
import { useContext, useState } from "react";
import { AuthContext } from "../../../../context/AuthContext";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../../config/firebase";



  const EditModal = ({ record }) => {
    const [form] = Form.useForm();
    
    const [visible, setVisible] = useState(false);
    const { currentUser } = useContext(AuthContext);

  const userId = currentUser.uid;

    
        const handleSave = () => {
          form.validateFields().then((values) => {
            const documentId = values.id; 
            delete values.id;

            updateDoc(doc(db, `users/${userId}/productVariant`, documentId.toString()), values)
              .then(() => {
                form.resetFields();
                message.success('Variant updated successfully');
                setVisible(false)
                window.location.reload();
              })
              .catch((error) => {
                message.error(error.code);
              });
          });
        };
    
    
      return (
        <>
      <Button icon={<EditOutlined />} onClick={() => setVisible(true)}  />

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
          onCancel={() => setVisible(false)}
          onOk={handleSave}
          okType="default" 
          okText="Update"
        >
          <Form form={form} className='pt-5' initialValues={record}>
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
              <Select.Option value="red">Red</Select.Option>
              <Select.Option value="blue">Blue</Select.Option>
              <Select.Option value="big">Big</Select.Option>
            </Select>
            </Form.Item>
          </Form>
        </Modal>
        </>
      );
    };
    
  export default EditModal