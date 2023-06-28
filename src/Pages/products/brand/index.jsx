import { CloseCircleOutlined, HomeOutlined } from "@ant-design/icons"
import { Breadcrumb, Button, Popconfirm, Space, Table, message } from "antd"
import SearchInput from "../../../Components/AppSearch/SearchInput"
import CreateBtn from "./components/createBtn"
import { useContext, useEffect, useState } from "react";
import EditModal from "./components/editModal";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "../../../config/firebase";
import { AuthContext } from "../../../context/AuthContext";

function ProductBrand() {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const userId = currentUser.uid;
  

  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, `users/${userId}/productBrand`));
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
    { title: "ID", dataIndex: "id", responsive: ['sm'] },
    { title: "Name", dataIndex: "name" },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (_, record) => (
        <Space size="small">
          <EditModal record={record} />
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
  const handleDelete = async (id) => {
    try {
      const docRef = doc(db, `users/${userId}/productBrand/${id.toString()}`);
      await deleteDoc(docRef);
      message.success('Brand deleted successfully');
      window.location.reload();
    } catch (error) {
      message.error(error.code);
    }
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
            title: <span>Product Brands</span>,
          },
        ]}
        className="pt-4"
      />
      <div className="flex flex-row justify-between pt-8">
      <SearchInput setSearchKeyword={setSearchKeyword} />
      <CreateBtn />
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

export default ProductBrand