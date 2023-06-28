/* eslint-disable react/prop-types */
import { HomeOutlined, PlusCircleOutlined } from "@ant-design/icons"
import { Breadcrumb, Button, Form, Input, Modal, message } from "antd"
import { useContext, useState } from "react";
import { db } from "../../../../config/firebase";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { AuthContext } from "../../../../context/AuthContext";

function CreateBtn() {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const { currentUser } = useContext(AuthContext);

  const userId = currentUser.uid;

  const handleCreate = () => {
    form.validateFields().then((values) => {
      const collectionRef = collection(db, `users/${userId}/productBrand`);
      addDoc(collectionRef, values)
        .then((docRef) => {
          const documentId = docRef.id;
          const documentRef = doc(db, `users/${userId}/productBrand/${documentId}`);
          const updatedValues = { ...values, id: documentId };
          updateDoc(documentRef, updatedValues)
            .then(() => {
              form.resetFields();
              message.success('Brand Added Successfully');
              setVisible(false);
              window.location.reload();
            })
            .catch((error) => {
              message.error(error.code);
            });
        })
        .catch((error) => {
          message.error(error.code);
        });
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
                      title: <span>Create Brand</span>
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
            name="name"
            label="Brand Name"
            rules={[{ required: true, message: 'Product name can not be empty' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default CreateBtn