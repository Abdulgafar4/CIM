import { Table, Button, Space, Popconfirm, Breadcrumb } from "antd";
import { CloseCircleOutlined, HomeOutlined } from "@ant-design/icons";
import CreateButton from "./components/CreateButton";
import { useContext, useEffect, useState } from "react";
import EditModal from "./components/EditModal";
import SearchInput from "../../../Components/AppSearch/SearchInput";
import { AuthContext } from "../../../context/AuthContext";
import { fetchData, handleDelete } from "../../../API";

function Suppliers() {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const userId = currentUser.uid;

  useEffect(() => {
    fetchData(userId, "suppliers", setLoading, setData);
  }, [userId]);

  const columns = [
    {
      title: "Date Added",
      dataIndex: "createdAt",
      key: "date",
      responsive: ["sm"]
    },
    { title: "First Name", dataIndex: "value", key: "value" },
    { title: "Last Name", dataIndex: "label", key: "label" },
    {
      title: "Phone Number",
      dataIndex: "tel",
      key: "tel",
      responsive: ["md"],
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      responsive: ["md"],
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (_, record) => (
        <Space size="small">
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
                "Suppliers",
                "supliers",
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
            title: <span>Suppliers</span>,
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

export default Suppliers