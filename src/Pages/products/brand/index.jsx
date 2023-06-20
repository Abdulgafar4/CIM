import { CloseCircleOutlined, HomeOutlined } from "@ant-design/icons"
import { Breadcrumb, Button, Popconfirm, Space, Table, message } from "antd"
import SearchInput from "../../../Components/AppSearch/SearchInput"
import CreateBtn from "./components/createBtn"
import { useState } from "react";
import brandData from './dummyData';
import EditModal, { EditButton } from "./components/editModal";

function ProductBrand() {
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editRecord, setEditRecord] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState("");

  const columns = [
    { title: "ID", dataIndex: "id", key: "id", responsive: ['sm'] },
    { title: "Name", dataIndex: "name", key: "name" },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (_, record) => (
        <Space size="small">
          <EditButton record={record} onEdit={handleEdit} />
          <Popconfirm
            title="Are you sure you want to delete this record?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
            okType="default"
          >
            <Button danger icon={<CloseCircleOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ]

  const handleEdit = (record) => {
    setEditRecord(record);
    setEditModalVisible(true);
  };

  const handleSaveEdit = (values) => {
    console.log("Saved edited record:", values);
    setEditModalVisible(false);
    message.success("Brand edited successfully");
  };

  const handleDelete = (sku) => {
    message.success(`Brand with ID ${sku} deleted`);
  };

  const handleCreate = () => {
    message.success("New Brand Added");

  };
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

  const filteredData = filterTableData(brandData, searchKeyword);

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
            href: "/products",
            title: <span>Products</span>,
          },
          {
            href: "",
            title: <span>Product Brands</span>,
          },
        ]}
        className="pt-4"
      />
      <div className="flex flex-row justify-between pt-8">
      <SearchInput setSearchKeyword={setSearchKeyword} />
      <CreateBtn onCreate={handleCreate} />
      </div>
      <Table
        dataSource={filteredData}
        columns={columns}
        bordered
        pagination={true}
      />
    </div>
  )
}

export default ProductBrand