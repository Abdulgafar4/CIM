import { Card } from "antd";
import { useState } from "react";
import SignUp from "./SignUp";
import Login from "./Login";

function Auth() {
  const [activeTab, setActiveTab] = useState("login");

  const onTabChange = (key) => {
    setActiveTab(key);
  };

  const tabList = [
    {
      key: "login",
      tab: "Login",
    },
    {
      key: "signup",
      tab: "Sign Up",
    },
  ];

  const tabContents = {
    login: (
      <Login />
    ),
    signup: (
      <SignUp />
    ),
  };
  return (
    <>
    <Card
      className="flex flex-col max-w-[500px] mt-28  mx-auto items-center justify-center"
      tabList={tabList}
      activeTabKey={activeTab}
      onTabChange={onTabChange}
    >
      {tabContents[activeTab]}
    </Card>
    </>
  );
}

export default Auth;
