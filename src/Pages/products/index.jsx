/* eslint-disable react/prop-types */
import { Table, Button, Space, Popconfirm, message, Breadcrumb, Tag } from "antd";
import { CloseCircleOutlined, HomeOutlined } from "@ant-design/icons";
import CreateButton from "./components/createButton";
import { useContext, useEffect, useState } from "react";
import EditModal from "./components/editModal";
import ViewButton from "./components/viewModal";
import { colors } from "../../colors";
import SearchInput from "../../Components/AppSearch/SearchInput";
import { AuthContext } from "../../context/AuthContext";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";

function ProductList() {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const userId = currentUser.uid;

  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, `users/${userId}/product`));
        const fetchedData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
        }));
        setData(fetchedData);
        setLoading(false)
      } catch (error) {
        message.error(error.code);
      }
    };

    fetchData();
  }, [userId]);

  const columns = [
    // { title: "ID", dataIndex: "id", key: "id", responsive: ['sm'] },
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
    // { title: "Date Added", dataIndex: "date", key: "date", responsive: ['lg'] },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (_, record) => (
        <Space size="small">
          <ViewButton record={record} />
          <EditModal record={record} />
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


  const handleDelete = (sku) => {
    message.success(`Record with ${sku} deleted`);
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
            title: <span>Products List</span>,
          },
        ]}
        className="pt-4"
      />
      <div className="flex flex-row justify-between pt-8">
        <SearchInput setSearchKeyword={setSearchKeyword} />
        <CreateButton />
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
