/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import { Button, Modal, Form, Input, Select, Breadcrumb, message } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { AuthContext } from "../../../../context/AuthContext";
import { create, fetchData } from "../../../../API";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../../../../redux/cartSlice";

const GenerateInvoiceBtn = ({ subTotal, record }) => {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const { Option } = Select;
  const { currentUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [customerData, setCustomerData] = useState([]);
  const navigate = useNavigate();

  const userId = currentUser.uid;

  useEffect(() => {
    fetchData(userId, "customer", setLoading, setCustomerData);
  }, [userId]);

  const { cartItems } = useSelector((store) => store.cart);
  const dispatch = useDispatch();



  const handleCreate = () => {
    form.validateFields().then((values) => {
      create(userId, {...values, subTotal, cartItems}, "Bill", "bill")
        .then(() => {
          form.resetFields();
          setVisible(false);
          navigate("/sales");
          dispatch(clearCart(record))

        })
        .catch((error) => {
          message.error(error.code);
        });
    });
  };

  const handleCancel = () => {
    form.resetFields();
    setVisible(false);
  }


  return (
    <div>
      <Button
        type="primary"
        className="bg-green-500 text-white"
        onClick={() => setVisible(true)}
        disabled = {cartItems.length === 0}
      >
        Generate Invoice
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
                href: "/sales",
                title: <span>Sales</span>,
              },
              {
                href: "",
                title: <span>Generate Invoice</span>,
              },
            ]}
          />
        }
        open={visible}
        onCancel={handleCancel}
        onOk={handleCreate}
        okType="default"
        okText="Generate Bill"
      >
        <Form form={form} className="py-5">
        <Form.Item
            name="addedby"
            label="Added By"
            rules={[{ required: true, message: "This can not be empty" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="name"
            label="Customer Name"
            rules={[
              { required: true, message: "Customer name can not be empty" },
            ]}
          >
            <Select
              style={{
                width: "100%",
              }}
              placeholder="Walk In Customer"
            >
              <Option value="Walk In Customer">Walk In Customer</Option>
              {customerData.map((data) => {
                <Option value={data.name} loading={loading}>{data.name}</Option>;
              })}
            </Select>
          </Form.Item>
          <Form.Item
            name="paymentmethod"
            label="Payment Method"
            rules={[{ required: true, message: "Payment Method can not be empty" }]}
          >
            <Select
              style={{
                width: "100%",
              }}
              placeholder="Select the Payment Method"
            >
              <Option value="Cash">Cash</Option>
              <Option value="Card">Card</Option>
              <Option value="Transfer">Transfer</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="amountpaid"
            label="Amount Paid"
            rules={[{ required: true, message: "This can not be empty" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="remainingamount"
            label="Remaining Amount"
            rules={[{ required: true, message: "This can not be empty" }]}
          >
            <Input />
          </Form.Item>
          <div>
             <h1 className="font-bold text-green-500">Total Amount: ₦ {subTotal}</h1>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default GenerateInvoiceBtn;
