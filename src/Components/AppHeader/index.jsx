/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Popover,
  theme,
} from "antd";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";


function AppHeader(props) {

  const { collapsed, setCollapsed } = props;
  const { dispatch } = useContext(AuthContext)
  const navigate = useNavigate()
  const [open, setOpen] = useState(false);


  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleSignOut = () => {
    signOut(auth).then(() => {
      dispatch({ type: "LOGOUT" })
      navigate("/auth")
    }).catch((error) => {
      console.log(error)
    });
    setOpen(false)
  }

  const {currentUser} = useContext(AuthContext)



  const content = (
    <div >
      <p className=" cursor-pointer" onClick={handleSignOut}>Logout</p>
    </div>
  );

  return (
    <div
      style={{ background: colorBgContainer }}
      className={`${currentUser ? "flex flex-row justify-between items-center px-4 py-2" : "hidden"}`}
    >
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => setCollapsed(!collapsed)}
        style={{
          fontSize: "16px",
          width: 64,
          height: 64,
        }}
      />
      <Popover content={content} trigger="click" open={open} onOpenChange={handleOpenChange}>
        <Avatar className=" cursor-pointer" style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
      </Popover>
    </div>
  );
}
export default AppHeader;
