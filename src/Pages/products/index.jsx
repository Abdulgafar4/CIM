/* eslint-disable react/prop-types */
import { Table, Button, Space, Popconfirm, message, Breadcrumb, Tag } from "antd";
import { CloseCircleOutlined, HomeOutlined } from "@ant-design/icons";
import CreateButton from "./components/createButton";
import { useState } from "react";
import EditModal, { EditButton } from "./components/editModal";
import ViewButton from "./components/viewModal";
import data from "./dummyData";
import { colors } from "../../colors";
import SearchInput from "../../Components/AppSearch/SearchInput";

function ProductList() {
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editRecord, setEditRecord] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState("");

  const columns = [
    { title: "SKU", dataIndex: "sku", key: "sku", responsive: ['sm'] },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Price", dataIndex: "price", key: "price", responsive: ['sm'] },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      responsive: ['md'],
      width: 100,
      render: (_, { category }) => (
        <>
          {category.map((tag) => {
            return (
              <Tag color={colors.green}  key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    { title: "Brand", dataIndex: "brand", key: "brand", responsive: ['lg'] },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      responsive: ['md'],
    },
    {
      title: "Variants", 
      dataIndex: "variants",
      key: "variants",
      responsive: ['xl'],
      width: 200,
      render: (_, { variants }) => (
        <>
          {variants.map((tag) => {
            return (
              <Tag color={colors.green}  key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "supplier",
      dataIndex: "supplier",
      key: "supplier",
      responsive: ["xl"],
    },
    { title: "Date Added", dataIndex: "date", key: "date", responsive: ['lg'] },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (_, record) => (
        <Space size="small">
          <ViewButton record={record} />
          <EditButton record={record} onEdit={handleEdit} />
          <Popconfirm
            title="Are you sure you want to delete this record?"
            onConfirm={() => handleDelete(record.sku)}
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

  const filterTableData = (data, keyword) => {
    if (!keyword) {
      return data;
    }
    keyword = keyword.toLowerCase();
    return data.filter((item) => {
      return Object.values(item).some((value) =>
        String(value).toLowerCase().includes(keyword)
      );
    });
  };

  const filteredData = filterTableData(data, searchKeyword);

  const handleEdit = (record) => {
    setEditRecord(record);
    setEditModalVisible(true);
  };

  const handleSaveEdit = (values) => {
    console.log("Saved edited record:", values);
    setEditModalVisible(false);
    message.success("Record edited successfully");
  };

  const handleDelete = (sku) => {
    message.success(`Record with ${sku} deleted`);
  };

  const handleCreate = () => {
    message.success("New Record Added");

  };

  return (
    <div>
      <EditModal
        record={editRecord}
        visible={editModalVisible}
        onCancel={() => setEditModalVisible(false)}
        onSave={handleSaveEdit}
      />
      <Breadcrumb
        items={[
          {
            href: "/",
            title: <HomeOutlined />,
          },
          {
            href: "",
            title: <span>Products List</span>,
          },
        ]}
        className="pt-4"
      />
      <div className="flex flex-row justify-between pt-8">
        <SearchInput setSearchKeyword={setSearchKeyword} />
        <CreateButton onCreate={handleCreate} />
      </div>
      <Table
        dataSource={filteredData}
        columns={columns}
        bordered
        pagination={true}
      />
    </div>
  );
}

export default ProductList;
