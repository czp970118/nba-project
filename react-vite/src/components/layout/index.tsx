import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
   MenuFoldOutlined,
   MenuUnfoldOutlined,
   UploadOutlined,
   UserOutlined,
   TeamOutlined,
   CrownOutlined,
   FlagOutlined,
   ContactsOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import BaseStoreContext from "@/context/base-store-context";
import { Layout, Menu, Button, theme, Avatar, Dropdown } from "antd";
import nablogo from "../../assets/nbalogo.jpg";
import { clearCookie } from "../../utils";
import "./index.scss";

const { Header, Sider, Content } = Layout;

interface IProp {
   children: any;
}
const BaseLayout: React.FC<IProp> = (props: IProp) => {
   const baseStore = useContext(BaseStoreContext);
   const { userInfo } = baseStore || {};
   console.log("顶部的userInfo", userInfo);
   const { children } = props;
   const [collapsed, setCollapsed] = useState(false);
   const navigate = useNavigate();
   const {
      token: { colorBgContainer },
   } = theme.useToken();

   const dropdownItems: MenuProps["items"] = [
      {
         label: "个人信息",
         key: "1",
         onClick: () => {
            navigate("user/info");
         },
      },
      {
         label: "权限申请",
         key: "2",
      },
      {
         label: "退出登陆",
         key: "3",
         onClick: () => {
            clearCookie("userStatus");
            navigate("/");
         },
      },
   ];

   return (
      <Layout style={{ width: "100vw", height: "100vh" }}>
         <Sider trigger={null} collapsible collapsed={collapsed} id="sider">
            <div className="conten-logo">
               <img src={nablogo} alt="" />
            </div>
            <Menu
               theme="light"
               mode="inline"
               defaultSelectedKeys={["/team"]}
               onClick={(value: any) => {
                  const { key } = value;
                  navigate(key);
               }}
               items={[
                  {
                     key: "team/center",
                     icon: <FlagOutlined />,
                     label: "球队管理",
                  },
                  {
                     key: "/player",
                     icon: <TeamOutlined />,
                     label: "球员管理",
                     children: [
                        {
                           key: "player/center",
                           label: "球员中心",
                           icon: <ContactsOutlined />,
                        },
                        {
                           key: "player/cards",
                           label: "球员卡片",
                           icon: <UserOutlined />,
                        },
                     ],
                  },
                  {
                     key: "data",
                     icon: <UploadOutlined />,
                     label: "数据中心",
                  },
                  {
                     key: "study",
                     icon: <UploadOutlined />,
                     label: "学习中心",
                     children: [
                        {
                           key: "study/context",
                           label: "context学习",
                           icon: <UserOutlined />,
                        },
                     ],
                  },
               ]}
            />
         </Sider>
         <Layout>
            <Header className="header" style={{ padding: 0, background: colorBgContainer }}>
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
               <Dropdown menu={{ items: dropdownItems }} className="menu">
                  <Avatar size={48} icon={<UserOutlined />} src={userInfo?.avatar} />
               </Dropdown>
            </Header>
            <Content
               style={{
                  margin: "24px 16px",
               }}
            >
               {children}
            </Content>
         </Layout>
      </Layout>
   );
};

export default BaseLayout;
