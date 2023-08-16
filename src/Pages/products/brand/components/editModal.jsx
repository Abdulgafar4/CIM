/* eslint-disable react/prop-types */
import { EditOutlined, HomeOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Form, Input, Modal, message } from "antd";
import { useContext, useState } from "react";
import { db } from "../../../../config/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { AuthContext } from "../../../../context/AuthContext";
import { fetchData } from "../../../../API";

  const EditModal = ({ record, setLoading, setData }) => {
  const [visible, setVisible] = useState(false);
  const { currentUser } = useContext(AuthContext);

  const userId = currentUser.uid;

      const [form] = Form.useForm();
    
        const handleSave = () => {
          form.validateFields().then((values) => {
            const documentId = values.id; 
            delete values.id;

            updateDoc(doc(db, `users/${userId}/productBrand`, documentId.toString()), values)
              .then(() => {
                form.resetFields();
                message.success('Brand updated successfully');
                setVisible(false)
                fetchData(userId, "productBrand", setLoading, setData);
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
          title={<Breadcrumb
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
            ]} />}
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
        </>
      );
    };
    
  export default EditModal