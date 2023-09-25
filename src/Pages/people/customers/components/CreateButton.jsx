/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import { Button, Modal, Form, Input, Breadcrumb, message } from "antd";
import { HomeOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { AuthContext } from "../../../../context/AuthContext";
import { create, fetchData } from "../../../../API";


const CreateButton = ({ setLoading, setData }) => {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const { currentUser } = useContext(AuthContext);

  const userId = currentUser.uid;


  const handleCreate = () => {
    form
      .validateFields()
      .then((values) => {
        create(userId, values, "Customers", "customers");
      })
      .then(() => {
        form.resetFields();
        setVisible(false);
        fetchData(userId, "customers", setLoading, setData);
      })
      .catch((error) => {
        message.error(error.code);
      });
  };

  const handleCancel = () => {
    form.resetFields();
    setVisible(false);
  };
  return (
    <div style={{ marginBottom: 16 }}>
      <Button
        type="primary"
        className="bg-green-500 text-white"
        icon={<PlusCircleOutlined />}
        onClick={() => setVisible(true)}
      >
        Create
      </Button>
      <Modal
        title={
          <Breadcrumb
            items={[
              {
                href: "/",
                title: <HomeOutlined />,
              },
              {
                href: "/customers",
                title: <span>Cutomers</span>,
              },
              {
                href: "",
                title: <span>Create Customer</span>,
              },
            ]}
          />
        }
        open={visible}
        onCancel={handleCancel}
        onOk={handleCreate}
        okType="default"
        okText="Save"
      >
        <Form form={form} className="pt-5">
          <Form.Item
            name="value"
            label="First Name"
            rules={[
              { required: true, message: "Name can not be empty" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="label"
            label="Last Name"
            rules={[
              { required: true, message: "Name can not be empty" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="tel"
            label="Phone Number"
            rules={[{ required: true, message: "Enter Phone Number" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: "Enter Email" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CreateButton;
