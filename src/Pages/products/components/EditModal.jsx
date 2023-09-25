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
  const [catData, setCatData] = useState([]);
  const [variantData, setVariantData] = useState([]);
  const [supplier, setSupplier] = useState([]);


  const userId = currentUser.uid;

  useEffect(() => {
    fetchData(userId, "productCategory", setLoading, setCatData);
    fetchData(userId, "suppliers", setLoading, setSupplier);
    fetchData(userId, "productVariant", setLoading, setVariantData);
  }, [userId, setLoading]);



  const handleSave = () => {
    form.validateFields().then((values) => {
      const documentId = values.id;
      delete values.id;

      updateDoc(doc(db, `users/${userId}/product`, documentId.toString()), values)
        .then(() => {
          form.resetFields();
          message.success('Product updated successfully');
          setVisible(false)
          fetchData(userId, "product", setLoading, setData);
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
                href: "/products",
                title: <span>Products List</span>,
              },
              {
                href: "",
                title: <span>Edit Product</span>
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
            name="code"
            label="Product Code"
            rules={[
              { required: true, message: "Product Code can not be empty" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="name"
            label="Product Name"
            rules={[
              { required: true, message: "Product name can not be empty" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="price"
            label="Price"
            rules={[{ required: true, message: "Enter a Price" }]}
          >
           <Input />
          </Form.Item>
          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true, message: "Category can not be empty" }]}
          >
            <Select
              mode="tags"
              style={{
                width: "100%",
              }}
              placeholder="Select the Product Category"
              options={catData}
            />
          </Form.Item>
          <Form.Item
            name="quantity"
            label="Quantity"
            rules={[{ required: true, message: "Quantity can not be empty" }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="variants"
            label="Variants"
            rules={[{ required: true, message: "Variants can not be empty" }]}
          >
            <Select
              mode="tags"
              style={{
                width: "100%",
              }}
              placeholder="Select the Variants"
              options={variantData}
            />
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
        </Form>
      </Modal>
    </>

  );
};

export default EditModal