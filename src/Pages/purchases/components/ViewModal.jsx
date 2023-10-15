/* eslint-disable react/prop-types */
import { EyeOutlined, HomeOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Descriptions, Modal, Table, Tag } from "antd";
import { useState } from "react";
import { colors } from "../../../colors";

const ViewButton = ({ record }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleViewClick = () => {
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  const purchaseData = record.purchaseCartItems.map((item) => {
    return item
  })

  const columns = [
    {
      title: "Code", dataIndex: "code",
    },
    {
      title: "Name", dataIndex: "name",
    },
    {
      title: "Cost", dataIndex: "cost",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      responsive: ["lg"],
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
      title: "Variants",
      dataIndex: "variants",
      key: "variants",
      responsive: ["lg"],
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
  ]


  return (
    <>
      <Button onClick={handleViewClick} icon={<EyeOutlined />} />
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
                title: <span>Purchase Detail</span>,
              },
            ]}
          />
        }
        open={isModalVisible}
        onCancel={handleModalClose}
        footer={null}
      >
        <Descriptions bordered column={1} className="pt-5">
          <Descriptions.Item label="ID">{record.id}</Descriptions.Item>
          <Descriptions.Item label="Supplier">
            {record.supplier}
          </Descriptions.Item>
          <Descriptions.Item label="Payment Status">
            <Tag color={colors.green} >
              {record.paymentstatus}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Discount">
            {record.discount}
          </Descriptions.Item>
          <Descriptions.Item label="Tax">
            {record.tax}
          </Descriptions.Item>
          <Descriptions.Item label="SubTotal">
            {record.subtotal}
          </Descriptions.Item>
          <Descriptions.Item label="Date Added">
            {record.createdAt}
          </Descriptions.Item>
        </Descriptions>
        <Table
          columns={columns}
          dataSource={purchaseData}
          scroll={{
            x: 500,
          }}
        />
      </Modal>
    </>
  );
};

export default ViewButton;
