/* eslint-disable react/prop-types */
import { Table, Button, Space, Popconfirm, Breadcrumb, Tag } from "antd";
import { CloseCircleOutlined, HomeOutlined } from "@ant-design/icons";
import CreateButton from "./components/CreateButton";
import { useContext, useEffect, useState } from "react";
import EditModal from "./components/EditModal";
import ViewButton from "./components/ViewModal";
import { colors } from "../../colors";
import SearchInput from "../../Components/AppSearch/SearchInput";
import { AuthContext } from "../../context/AuthContext";
import { fetchData, handleDelete } from "../../API";

function ProductList() {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const userId = currentUser.uid;

  useEffect(() => {
    fetchData(userId, "product", setLoading, setData);
  }, [userId]);

  const columns = [
    {
      title: "Date Added",
      dataIndex: "createdAt",
      key: "date",
      responsive: ["sm"]
    },
    { title: "Code", dataIndex: "code", key: "code"},
    { title: "Name", dataIndex: "name", key: "name", responsive: ["sm"] },
    {
      title: "(₦) Price",
      dataIndex: "price",
      key: "price",
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
      title: "Supplier",
      dataIndex: "supplier",
      key: "supplier",
      responsive: ["xl"],
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (_, record) => (
        <Space size="small">
          <ViewButton record={record} />
          <EditModal
            record={record}
            setLoading={setLoading}
            setData={setData}
          />
          <Popconfirm
            title="Are you sure you want to delete this record?"
            onConfirm={() =>
              handleDelete(
                record.id,
                userId,
                "Product",
                "product",
                setLoading,
                setData
              )
            }
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

  //update cart handler
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
            title: <span>Products List</span>,
          },
        ]}
        className="pt-4"
      />
      <div className="flex flex-row justify-between pt-8">
        <SearchInput setSearchKeyword={setSearchKeyword} />
        <CreateButton setLoading={setLoading} setData={setData} />
      </div>
      <Table
        dataSource={filteredData}
        columns={columns}
        bordered
        pagination={true}
        loading={loading}
      />
    </div>
  );
}

export default ProductList;
