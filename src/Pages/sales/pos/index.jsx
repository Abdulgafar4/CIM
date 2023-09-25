import {
  CloseCircleOutlined,
  HomeOutlined,
  MinusCircleOutlined,
  PlusCircleOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  clearCart,
  decreaseAmount,
  removeFromCart,
} from "../../../redux/cartSlice";
import { Breadcrumb, Button, Table } from "antd";
import { useContext, useEffect, useState } from "react";
import { fetchData } from "../../../API";
import { AuthContext } from "../../../context/AuthContext";
import SearchInput from "../../../Components/AppSearch/SearchInput";
import GenerateInvoiceBtn from "./components/GenerateInvoiceBtn";
import { useCallback } from "react";

function Pos() {
  const [data, setData] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const userId = currentUser.uid;
  const [loading, setLoading] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [subTotal, setSubTotal] = useState(0);

  const { cartItems } = useSelector((store) => store.cart);
  const dispatch = useDispatch();


  const calculateSubTotal = useCallback(() => {
    let temp = 0;
    cartItems.forEach((item) => (temp += item.price * item.cartQuantity));
    setSubTotal(temp);
  },[cartItems]);

  useEffect(() => {
    fetchData(userId, 'product', setLoading, setData);
    calculateSubTotal();
  }, [userId, cartItems, calculateSubTotal]);

  const handleDecrease = (record) => {
    dispatch(decreaseAmount(record));
  };

  const handleIncrease = (record) => {
    dispatch(addToCart(record));
  };

  const columns = [
    { title: "Name", dataIndex: "name" },
    { title: "(₦) Price", dataIndex: "price" },
    {
      title: "Quantity",
      dataIndex: "quantity",
      responsive: ["sm"],
      render: (_, record) => (
        <div>
          {
            Number(record.quantity)}
        </div>
      ),
    },
    {
      title: "Action",
      dataIndex: "actions",
      render: (_, record) => (
        <Button
          type="primary"
          className="bg-green-500 text-white"
          icon={<ShoppingCartOutlined />}
          onClick={() => handleIncrease(record)}
        />
      ),
    },
  ];

  const posColumns = [
    { title: "Name", dataIndex: "name" },
    { title: "(₦) Price", dataIndex: "price", responsive: ["sm"] },
    {
      title: "Quantity",
      dataIndex: "quantity",
      render: (_, record) => (
        <div>
          <MinusCircleOutlined
            className="mx-3"
            style={{ cursor: "pointer" }}
            onClick={() => handleDecrease(record)}
          />
          <b>{record.cartQuantity}</b>
          <PlusCircleOutlined
            className="mx-3"
            style={{ cursor: "pointer" }}
            onClick={() => handleIncrease(record)}
          />
        </div>
      ),
    },
    {
      title: "Sub Total",
      dataIndex: "price",
      responsive: ["sm"],
      render: (_, record) => <>{Number(record.price) * record.cartQuantity} </>,
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (_, record) => (
        <Button
          danger
          icon={<CloseCircleOutlined />}
          onClick={() => dispatch(removeFromCart(record))}
        />
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

  const footer = (record) => {
    return (
      <div className="flex gap-2 justify-end items-end">
        <div className="flex flex-col gap-2">
          <h1 className="font-light text-lg">Total Amount: ₦{subTotal}</h1>
          <GenerateInvoiceBtn subTotal={subTotal} record={record} />
        </div>
        <Button danger onClick={() => dispatch(clearCart(record))}>
          Reset
        </Button>
      </div>
    );
  };

  return (
    <div className="w-full flex flex-col lg:flex-row gap-8">
      <div className="w-full lg:w-1/2">
        <Breadcrumb
          items={[
            {
              href: "/",
              title: <HomeOutlined />,
            },
            {
              href: "/sales",
              title: <span>Sales</span>,
            },
            {
              href: "/sales/pos",
              title: <span>POS</span>,
            },
          ]}
          className="pt-4"
        />
        <div className=" pt-8">
          <SearchInput setSearchKeyword={setSearchKeyword} />
        </div>
        <Table
          dataSource={filteredData}
          columns={columns}
          bordered
          pagination={true}
          loading={loading}
        />
      </div>
      <div className="w-full lg:w-1/2 pt-[7.5rem] ">
        <Table
          columns={posColumns}
          dataSource={cartItems}
          pagination={false}
          footer={(record) => footer(record)}
        />
      </div>
    </div>
  );
}

export default Pos;
