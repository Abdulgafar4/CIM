/* eslint-disable react/prop-types */
import { EyeOutlined, HomeOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Descriptions, Modal, Tag } from "antd";
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
          <Descriptions.Item label="Code">{record.code}</Descriptions.Item>
          <Descriptions.Item label="Product Name">
            {record.name}
          </Descriptions.Item>
          <Descriptions.Item label="Cost">{record.cost}</Descriptions.Item>
          <Descriptions.Item label="Category">
            {record.category.map((tag) => {
              return (
                <Tag color={colors.green} key={tag}>
                  {tag.toUpperCase()}
                </Tag>
              );
            })}
          </Descriptions.Item>
          <Descriptions.Item label="Quantity">
            {record.quantity}
          </Descriptions.Item>
          <Descriptions.Item label="Variants">
            {record.variants.map((tag) => {
              return (
                <Tag color={colors.green} key={tag}>
                  {tag.toUpperCase()}
                </Tag>
              );
            })}
          </Descriptions.Item>
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
      </Modal>
    </>
  );
};

export default ViewButton;
