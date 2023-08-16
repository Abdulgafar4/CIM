import { CloseCircleOutlined, HomeOutlined } from "@ant-design/icons"
import { Breadcrumb, Button, Popconfirm, Space, Table } from "antd"
import SearchInput from "../../../Components/AppSearch/SearchInput"
import CreateBtn from "./components/createBtn"
import { useContext, useEffect, useState } from "react";
import EditModal from "./components/editModal";
import { AuthContext } from "../../../context/AuthContext";
import { fetchData, handleDelete } from "../../../API";

function ProductCategory() {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const userId = currentUser.uid;

  useEffect(() => {
    fetchData(userId, "productCategory", setLoading, setData);
  }, [userId]);

  const columns = [
    { title: "ID", dataIndex: "id", key: "id", responsive: ['sm'] },
    { title: "Name", dataIndex: "name", key: "name" },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (_, record) => (
        <Space size="small">
          <EditModal record={record} setLoading={setLoading} setData={setData} />
          <Popconfirm
            title="Are you sure you want to delete this record?"
            onConfirm={() => handleDelete(record.id, userId, "Category", "productCategory", setLoading, setData)}
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

  return (
    <div>
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
            title: <span>Product Categories</span>,
          },
        ]}
        className="pt-4"
      />
      <div className="flex flex-row justify-between pt-8">
      <SearchInput setSearchKeyword={setSearchKeyword} />
      <CreateBtn setLoading={setLoading} setData={setData}/>
      </div>
      <Table
        dataSource={filteredData}
        columns={columns}
        bordered
        pagination={true}
        loading={loading}
      />
    </div>
  )
}

export default ProductCategory