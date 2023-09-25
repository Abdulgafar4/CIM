/* eslint-disable react/prop-types */
import { EditOutlined, HomeOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Form, Input, Modal, message } from "antd";
import { useContext, useState } from "react";
import { AuthContext } from "../../../../context/AuthContext";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../../config/firebase";
import { fetchData } from "../../../../API";

  const EditModal = ({ record, setLoading, setData }) => {
      const [form] = Form.useForm();
    
    const [visible, setVisible] = useState(false);
    const { currentUser } = useContext(AuthContext);

  const userId = currentUser.uid;

    
        const handleSave = () => {
          form.validateFields().then((values) => {
            const documentId = values.id; 
            delete values.id;

            updateDoc(doc(db, `users/${userId}/productCategory`, documentId.toString()), values)
              .then(() => {
                form.resetFields();
                message.success('Category updated successfully');
                setVisible(false)
                fetchData(userId, "productCategory", setLoading, setData);
              })
              .catch((error) => {
                message.error(error.code);
              });
          });
        };
    
      return (
        <>
      <Button icon={<EditOutlined />} onClick={() => setVisible(true)} />

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
                      title: <span>Product Categories</span>,
                  },
                  {
                      href: "",
                      title: <span>Edit Category</span>
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
              name="label"
              label="Category Label"
              rules={[{ required: true, message: 'This can not be empty' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="value"
              label="Category Value"
              rules={[{ required: true, message: 'This can not be empty' }]}
            >
              <Input />
            </Form.Item>
          </Form>
        </Modal>
        </>
      );
    };
    
  export default EditModal