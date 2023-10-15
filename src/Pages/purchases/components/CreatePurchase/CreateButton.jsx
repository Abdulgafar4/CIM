/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import { Button, Modal, Form, Input, Select, Breadcrumb } from "antd";
import { HomeOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { AuthContext } from "../../../../context/AuthContext";
import { fetchData } from "../../../../API";
import { useEffect } from "react";
import { useRef } from "react";
import { addToPurchaseCart } from "../../../../redux/purchaseSlice";
import { useDispatch } from "react-redux";

const CreateButton = ({ setLoading }) => {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const { currentUser } = useContext(AuthContext);
  const [catData, setCatData] = useState([]);
  const [variantData, setVariantData] = useState([]);
  const inputRef = useRef(null);
  const sharedProps = {
    defaultValue: '.00',
    ref: inputRef,
  };

  const userId = currentUser.uid;
  const dispatch = useDispatch();


  useEffect(() => {
    fetchData(userId, "productCategory", setLoading, setCatData);
    fetchData(userId, "productVariant", setLoading, setVariantData);
  }, [userId, setLoading]);

  const handleCreate = () => {
    setLoading(true)
    form.validateFields()
      .then((values) => {
      dispatch(addToPurchaseCart(values))}
      )
      .then(() => {
        form.resetFields();
        setVisible(false);
        
      })
      setLoading(false)
    
  }

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
                href: "/purchases",
                title: <span>Purchases</span>,
              },
              {
                href: "",
                title: <span>Create Purchase</span>,
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
            name="id"
            label="ID"
            rules={[
              { required: true, message: "ID can not be empty" },
            ]}
          >
            <Input />
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
            name="cost"
            label="Cost"
            rules={[{ required: true, message: "Enter a Price" }]}
          >
            <Input onClick={() => {
              inputRef.current.focus({
                cursor: 'start',
              });
            }} {...sharedProps} />
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
        </Form>
      </Modal>
    </div>
  );
};

export default CreateButton;
