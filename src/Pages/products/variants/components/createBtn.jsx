/* eslint-disable react/prop-types */
import { HomeOutlined, PlusCircleOutlined } from "@ant-design/icons"
import { Breadcrumb, Button, Form, Input, Modal, Select, message } from "antd"
import { useContext, useState } from "react";
import { AuthContext } from "../../../../context/AuthContext";
import { db } from "../../../../config/firebase";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";

function CreateBtn() {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const { currentUser } = useContext(AuthContext);

  const userId = currentUser.uid;

  const handleCreate = () => {
    form.validateFields().then((values) => {
      const collectionRef = collection(db, `users/${userId}/productVariant`);
      addDoc(collectionRef, values)
        .then((docRef) => {
          const documentId = docRef.id;
          const documentRef = doc(db, `users/${userId}/productVariant/${documentId}`);
          const updatedValues = { ...values, id: documentId };
          updateDoc(documentRef, updatedValues)
            .then(() => {
              form.resetFields();
              message.success('Variant Added Successfully');
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
                      title: <span>Create Variant</span>
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
    </div>
  )
}

export default CreateBtn