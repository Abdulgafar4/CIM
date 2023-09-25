/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import { Button, Modal, Form, Input, Select, Breadcrumb, message } from "antd";
import { HomeOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { AuthContext } from "../../../context/AuthContext";
import { create, fetchData } from "../../../API";
import { useEffect } from "react";
import { useRef } from "react";

const CreateButton = ({ setLoading, setData }) => {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const { currentUser } = useContext(AuthContext);
  const [catData, setCatData] = useState([]);
  const [variantData, setVariantData] = useState([]);
  const [supplier, setSupplier] = useState([]);
  const inputRef = useRef(null);
  const sharedProps = {
    defaultValue: '.00',
    ref: inputRef,
  };

  const userId = currentUser.uid;

  useEffect(() => {
    fetchData(userId, "productCategory", setLoading, setCatData);
    fetchData(userId, "suppliers", setLoading, setSupplier);
    fetchData(userId, "productVariant", setLoading, setVariantData);
  }, [userId, setLoading]);

  const handleCreate = () => {
    form
      .validateFields()
      .then((values) => {
        create(userId, values, "Purchases", "purchases");
      })
      .then(() => {
        form.resetFields();
        setVisible(false);
        fetchData(userId, "purchases", setLoading, setData);
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
            <Input onClick={() => {
              inputRef.current.focus({
                cursor: 'start',
              });
            }} {...sharedProps} />
          </Form.Item>
          <Form.Item
            name="tax"
            label="Tax"
            rules={[{ required: true, message: "Enter a Price" }]}
          >
            <Input onClick={() => {
              inputRef.current.focus({
                cursor: 'start',
              });
            }} {...sharedProps} />
          </Form.Item>
          <Form.Item
            name="subtotal"
            label="SubTotal"
            rules={[{ required: true, message: "Enter a Price" }]}
          >
            <Input onClick={() => {
              inputRef.current.focus({
                cursor: 'start',
              });
            }} {...sharedProps} />
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
    </div>
  );
};

export default CreateButton;
