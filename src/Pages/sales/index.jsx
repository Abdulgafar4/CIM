/* eslint-disable react/prop-types */
import { Table, Space, Breadcrumb, Tag } from "antd";
import {  HomeOutlined } from "@ant-design/icons";
import { useContext, useEffect, useState } from "react";
import ViewButton from "./components/viewModal";
import { colors } from "../../colors";
import SearchInput from "../../Components/AppSearch/SearchInput";
import { AuthContext } from "../../context/AuthContext";
import { fetchData } from "../../API";

function Sales() {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const userId = currentUser.uid;

  useEffect(() => {
    fetchData(userId, "bill", setLoading, setData);
  }, [userId]);

  // console.log(data)

  const columns = [
    { title: "ID", dataIndex: "id", key: "id", responsive: ['sm'] },
    // { title: "Date Added", dataIndex: "createAt", key: "createAt", responsive: ['sm'] },
    { title: "Added by", dataIndex: "addedby", key: "addedby", responsive: ['sm'] },
    { title: "Customer Name", dataIndex: "name", key: "name" },
    { title: "(₦) Grand Total", dataIndex: "subTotal", key: "subTotal", responsive: ['lg'] },
    {
      title: "(₦) Paid",
      dataIndex: "amountpaid",
      key: "amountpaid",
      responsive: ['md'],
    },
    {
      title: "(₦) Due",
      dataIndex: "remainingamount",
      key: "remainingamount",
      responsive: ['md'],
    },
    {
      title: "Payment Method", 
      dataIndex: "paymentmethod",
      key: "paymentmethod",
      responsive: ['xl'],
      width: 200,
      render: (_, { paymentmethod }) => (
        <>
              <Tag color={colors.green}>
                {paymentmethod.toUpperCase()}
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
        </Space>
      ),
    },
  ];

  const filterTableData = (data) => {
    return searchKeyword.toLowerCase() === '' ? data : data.filter((item) => {
      return Object.values(item).some((value) =>
        String(value).toLowerCase().includes(searchKeyword)
      );
    })
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
            href: "",
            title: <span>Sales</span>,
          },
        ]}
        className="pt-4"
      />
      <div className="flex flex-row justify-between pt-8">
        <SearchInput setSearchKeyword={setSearchKeyword} filterData={filteredData} />
        {/* <Button type='primary' className='bg-green-500 text-white' icon={<PlusCircleOutlined />} href="/sales/pos">Create</Button> */}
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

export default Sales;
