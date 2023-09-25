/* eslint-disable react/prop-types */
import { Modal, Form, Input, Button, Breadcrumb, message } from 'antd';
import { EditOutlined, HomeOutlined } from "@ant-design/icons";
import { useContext, useState } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { db } from '../../../config/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { fetchData } from '../../../API';

const EditModal = ({ record, setLoading, setData }) => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const { currentUser } = useContext(AuthContext);


  const userId = currentUser.uid;




  const handleSave = () => {
    form.validateFields().then((values) => {
      const documentId = values.id;
      delete values.id;

      updateDoc(doc(db, `users/${userId}/expenses`, documentId.toString()), values)
        .then(() => {
          form.resetFields();
          message.success('Expenses updated successfully');
          setVisible(false)
          fetchData(userId, "expenses", setLoading, setData);
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
                href: "/expenses",
                title: <span>Expenses</span>,
              },
              {
                href: "",
                title: <span>Edit Expenses</span>
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
            name="purpose"
            label="Purpose"
            rules={[
              { required: true, message: "Purpose can not be empty" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="amount"
            label="Amount"
            rules={[{ required: true, message: "Enter Amount" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>

  );
};

export default EditModal