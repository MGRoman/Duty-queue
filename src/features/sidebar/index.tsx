import React, { useMemo } from "react";
import { Layout, Menu } from "antd";

import { pages } from "consts/pages";
import { sideBarMenuItems } from "./consts";

export const SideBar: React.FC = () => {
  const defaultSelectedKey = useMemo(() => {
    return pages.find((page) => page.default)?.key ?? pages[0].key;
  }, []);
  return (
    <Layout.Sider>
      <Menu
        theme="dark"
        mode="vertical"
        items={sideBarMenuItems}
        defaultSelectedKeys={[defaultSelectedKey]}
      />
    </Layout.Sider>
  );
};
