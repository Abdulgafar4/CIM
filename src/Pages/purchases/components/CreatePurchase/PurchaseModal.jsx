import { Breadcrumb, Button, Form, Input, Modal, Select, message } from 'antd'
import { useContext, useEffect, useRef, useState } from 'react'
import { create, fetchData } from '../../../../API';
import { useNavigate } from 'react-router';
import { AuthContext } from '../../../../context/AuthContext';
import { useDispatch, useSelector } from 'react-redux';
import { HomeOutlined } from '@ant-design/icons';
import { clearPurchaseCart } from '../../../../redux/purchaseSlice';


function PurchaseModal( record,{setLoading }) {
    const navigate = useNavigate();
    const { currentUser } = useContext(AuthContext);
    const userId = currentUser.uid;
    const [visible, setVisible] = useState(false);
    const [form] = Form.useForm();
    const [supplier, setSupplier] = useState([]);

    

    const { purchaseCartItems } = useSelector((store) => store.purchaseCart);
    const dispatch = useDispatch();

    const inputRef = useRef(null);
    const sharedProps = {
      defaultValue: '.00',
      ref: inputRef,
    };


    useEffect(() => {
        fetchData(userId, "suppliers", setLoading, setSupplier);
      }, [userId, setLoading]);


    const handleCreate = () => {
        form.validateFields().then((values) => {
            create(userId, { ...values, purchaseCartItems }, "Purchases", "purchases")
                .then(() => {
                    form.resetFields();
                    setVisible(false);
                    navigate("/purchases");
                    dispatch(clearPurchaseCart(record));
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
        <>
            <Button
                type="primary"
                className="bg-green-500 text-white"
                onClick={() => setVisible(true)}
            >
                Add to Purchase
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
                                title: <span>Purchase</span>,
                            },
                            {
                                href: "",
                                title: <span>Generate Purchase</span>,
                            },
                        ]}
                    />
                }
                open={visible}
                onCancel={handleCancel}
                onOk={handleCreate}
                okType="default"
                okText="Generate Purchase"
            >
                <Form form={form} className="py-5">
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
        </>
    )
}

export default PurchaseModal