/* eslint-disable react/prop-types */
import { Modal, Form, Input, Button, Select, Breadcrumb, message } from 'antd';
import { EditOutlined, HomeOutlined } from "@ant-design/icons";
import { useContext, useState } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { db } from '../../../config/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { fetchData } from '../../../API';
import { useEffect } from 'react';

const EditModal = ({ record, setLoading, setData }) => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const [supplier, setSupplier] = useState([]);


  const userId = currentUser.uid;

  useEffect(() => {
    fetchData(userId, "suppliers", setLoading, setSupplier);
  }, [userId, setLoading]);


  const handleSave = () => {
    form.validateFields().then((values) => {
      const documentId = values.id;
      delete values.id;

      updateDoc(doc(db, `users/${userId}/purchases`, documentId.toString()), values)
        .then(() => {
          form.resetFields();
          message.success('Purchase updated successfully');
          setVisible(false)
          fetchData(userId, "purchases", setLoading, setData);
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
                href: "/purchases",
                title: <span>Purchases</span>,
              },
              {
                href: "",
                title: <span>Edit Purchase</span>
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
            name="supplier"
            label="Supplier"
            rules={[{ required: true, message: "Supplier can not be empty" }]}
          >
              <Select
              mode="tags"
              style={{
                width: "100%",
              }}
              placeholder="Select the Supplier"
              options={supplier}
            />
          </Form.Item>
          <Form.Item
            name="discount"
            label="Discount"
            rules={[{ required: true, message: "Enter a Price" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="tax"
            label="Tax"
            rules={[{ required: true, message: "Enter a Price" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="subtotal"
            label="SubTotal"
            rules={[{ required: true, message: "Enter a Price" }]}
          >
            <Input  />
          </Form.Item>
          <Form.Item
            name="paymentstatus"
            label="Payment Status"
            rules={[{ required: true, message: "Payment Method can not be empty" }]}
          >
            <Select
              style={{
                width: "100%",
              }}
              placeholder="Select the Payment Status"
            >
              <Select.Option value="Paid">Paid</Select.Option>
              <Select.Option value="Partial">Partial</Select.Option>
              <Select.Option value="Unpaid">Unpaid</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>

  );
};

export default EditModal