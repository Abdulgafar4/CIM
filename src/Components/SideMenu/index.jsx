/* eslint-disable react/prop-types */
"use client"
import { BsPeople } from "react-icons/bs";
import { BsBoxArrowLeft } from "react-icons/bs";
import { BsBoxArrowRight } from "react-icons/bs";
import { RxDashboard } from "react-icons/rx";
import { BsBoxSeam } from "react-icons/bs";
import { BsMinecartLoaded } from "react-icons/bs";
import { MdOutlineSell } from "react-icons/md";
import { GiPayMoney } from "react-icons/gi";
import { GrUserManager } from "react-icons/gr";
import Sider from "antd/es/layout/Sider";
import { Menu } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }
  const items = [
    getItem('Dashboard', '/', <RxDashboard />),
    getItem('Products', 'sub1', <BsBoxSeam />, [
        getItem("Products", "/products"),
        getItem("Categories", "/products/categories"),
        getItem("Variants", "/products/variants"),
    ]),
    getItem('Sales', 'sub5', <MdOutlineSell />, [
      getItem('Sales', '/sales'),
      getItem('POS', '/sales/pos'),
    ]),
    getItem('Purchase', '/purchases', <BsMinecartLoaded />),
    getItem('Expenses', '/expenses', <GiPayMoney />),
    getItem('People', 'sub3', <BsPeople />, [
      getItem("Customers", "/customers"),
      getItem("Suppliers", "/suppliers"),
  ]),
    getItem('HRM', 'sub4', <GrUserManager />, [
      getItem("Attendance", "/attendance"),
      getItem("Employee", "/employees"),
  ]),
    getItem('Sales Return', '/sales/sales_return', <BsBoxArrowLeft />),
    getItem('Purchase Return', '/purchases/purchase_return', <BsBoxArrowRight />),
  ];


function SideBar(props) {
    const { collapsed } = props;
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState("/");

  useEffect(() => {
    const pathName = location.pathname;
    setSelectedKeys(pathName);
  }, [location.pathname]);

  const navigate = useNavigate();

    return (
        <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        breakpoint="md"
        theme="light"
        style={{}}
      >
        <div className="flex justify-center mt-7 cursor-pointer text-xl text-green-500">
          CIM
        </div>
        <Menu style={{ minHeight: '100vh' }}
          className="mt-10"
          theme="light" 
          defaultSelectedKeys={['1']} 
          mode="vertical" 
          items={items} 
          onClick={(item) => {
            navigate(item.key);
          }}
          selectedKeys={[selectedKeys]}

          />
      </Sider>
    )
}

export default SideBar