/* eslint-disable react/prop-types */
import { Table, Button, Space, Popconfirm, Breadcrumb, Tag } from "antd";
import { CloseCircleOutlined, HomeOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { useContext, useEffect, useRef, useState } from "react";
import EditModal from "./components/EditModal";
import ViewButton from "./components/ViewModal";
import { colors } from "../../colors";
import SearchInput from "../../Components/AppSearch/SearchInput";
import { AuthContext } from "../../context/AuthContext";
import { fetchData, handleDelete } from "../../API";

function Purchases() {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const userId = currentUser.uid;

  const effectRan = useRef(false)

  useEffect(() => {
    if (effectRan.current === true){
      fetchData(userId, "purchases", setLoading, setData);
    }
    return () => {
      effectRan.current = true
    }
  }, [userId]);


  const columns = [
    { title: "ID", dataIndex: "id", key: "id"},
    {
      title: "Date Added",
      dataIndex: "createdAt",
      key: "date",
      responsive: ["sm"]
    },
    { title: "Supplier", dataIndex: "supplier", key: "supplier", responsive: ["md"] },
    {
      title: "Discount",
      dataIndex: "discount",
      key: "discount",
      responsive: ["md"],
    },
    {
      title: "Tax",
      dataIndex: "tax",
      key: "tax",
      responsive: ["lg"],
      width: 100,
    },
    { title: "Sub Total", dataIndex: "subTotal", key: "subtotal", responsive: ["sm"] },
    {
      title: "Payment Status",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
      responsive: ["xl"],
      render: (_, { paymentstatus }) => (
        <>
              <Tag color={colors.green}>
                {paymentstatus}
              </Tag>

        </>
      ),
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
                "Purchase",
                "purchases",
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
            title: <span>Purchases</span>,
          },
        ]}
        className="pt-4"
      />
      <div className="flex flex-row justify-between pt-8">
        <SearchInput setSearchKeyword={setSearchKeyword} />
        <Button
        type="primary"
        className="bg-green-500 text-white"
        icon={<PlusCircleOutlined />}
        href="/purchases/create-purchase"
      >
        Create Purchase
      </Button>
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

export default Purchases;
