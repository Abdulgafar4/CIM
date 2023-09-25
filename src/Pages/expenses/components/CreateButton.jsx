/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import { Button, Modal, Form, Input, Breadcrumb, message } from "antd";
import { HomeOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { AuthContext } from "../../../context/AuthContext";
import { create, fetchData } from "../../../API";
import { useRef } from "react";

const CreateButton = ({ setLoading, setData }) => {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const { currentUser } = useContext(AuthContext);
  const inputRef = useRef(null);
  const sharedProps = {
    defaultValue: '.00',
    ref: inputRef,
  };

  const userId = currentUser.uid;


  const handleCreate = () => {
    form
      .validateFields()
      .then((values) => {
        create(userId, values, "Expenses", "expenses");
      })
      .then(() => {
        form.resetFields();
        setVisible(false);
        fetchData(userId, "expenses", setLoading, setData);
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
                href: "/products",
                title: <span>Expenses</span>,
              },
              {
                href: "",
                title: <span>Create Expenses</span>,
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
            <Input onClick={() => {
              inputRef.current.focus({
                cursor: 'start',
              });
            }} {...sharedProps} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CreateButton;
