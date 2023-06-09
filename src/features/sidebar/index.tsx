import React, { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { Layout, Menu } from "antd";

import { pages } from "consts/pages";
import { sideBarMenuItems } from "./consts";

import classes from "./sidebar.module.scss";

export const SideBar: React.FC = () => {
  const { pathname } = useLocation();

  const selectedKey = useMemo(() => pathname.replaceAll("/", ""), [pathname]);

  const defaultSelectedKey = useMemo(() => {
    return pages.find((page) => page.default)?.key ?? pages[0].key;
  }, []);
  return (
    <Layout.Sider className={classes["sidebar-container"]}>
      <Menu
        theme="dark"
        mode="vertical"
        items={sideBarMenuItems}
        defaultSelectedKeys={[defaultSelectedKey]}
        selectedKeys={[selectedKey]}
      />
    </Layout.Sider>
  );
};
