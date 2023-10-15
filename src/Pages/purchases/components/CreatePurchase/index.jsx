/* eslint-disable react/prop-types */
import { Table, Button, Space, Popconfirm, Breadcrumb, Tag } from "antd";
import { CloseCircleOutlined, HomeOutlined } from "@ant-design/icons";
import { useCallback, useEffect, useState } from "react";
import { colors } from "../../../../colors";
import CreateButton from "./CreateButton";
import { useDispatch, useSelector } from "react-redux";
import { clearPurchaseCart, removeFromPurchaseCart } from "../../../../redux/purchaseSlice";
import PurchaseModal from "./PurchaseModal";

function CreatePurchase() {
  const [loading, setLoading] = useState(false);
  const [subTotal, setSubTotal] = useState(0);


  const { purchaseCartItems } = useSelector((store) => store.purchaseCart);
  const dispatch = useDispatch();
  const calculateSubTotal = useCallback(() => {
    let temp = 0;
    purchaseCartItems.forEach((item) => (temp += item.cost * item.quantity));
    setSubTotal(temp);
  }, [purchaseCartItems]);

  useEffect(() => {
    calculateSubTotal();
  }, [calculateSubTotal]);


  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Code", dataIndex: "code", key: "code" },
    { title: "Name", dataIndex: "name", key: "name", responsive: ["sm"] },
    {
      title: "(₦) Cost",
      dataIndex: "cost",
      key: "cost",
      responsive: ["md"],
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      responsive: ["lg"],
      width: 100,
      render: (_, { category }) => (
        <>
          {category.map((tag) => {
            return (
              <Tag color={colors.green} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      responsive: ["lg"],

    },
    {
      title: "Variants",
      dataIndex: "variants",
      key: "variants",
      responsive: ["xl"],
      width: 200,
      render: (_, { variants }) => (
        <>
          {variants.map((tag) => {
            return (
              <Tag color={colors.green} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (_, record) => (
        <Space size="small">
          <Popconfirm
            title="Are you sure you want to delete this record?"
            onConfirm={() => dispatch(removeFromPurchaseCart(record))}
            okText="Yes"
            cancelText="No"
            okType="default"
          >
            <Button danger icon={<CloseCircleOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];


  const footer = (record) => {
    return (
      <div className="flex gap-2 justify-end items-end">
        <div className="flex flex-col gap-2">
          <h1 className="font-light text-lg">Total Amount: ₦{subTotal}</h1>
          <PurchaseModal record={record} setLoading={setLoading} />
        </div>
        <Button danger onClick={() => dispatch(clearPurchaseCart(record))}>
          Reset
        </Button>
      </div>
    );
  };

  return (
    <div>
      <Breadcrumb
        items={[
          {
            href: "/",
            title: <HomeOutlined />,
          },
          {
            href: "",
            title: <span>Create Purchase

            </span>,
          },
        ]}
        className="pt-4"
      />
      <div className="flex flex-row pt-8 justify-end">
        <CreateButton setLoading={setLoading} />
      </div>
      <Table
        dataSource={purchaseCartItems}
        columns={columns}
        bordered
        pagination={true}
        loading={loading}
        footer={(record) => footer(record)}
      />
    </div>
  );
}

export default CreatePurchase;
