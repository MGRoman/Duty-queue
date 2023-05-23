import React, { useEffect } from "react";
import { Layout, notification } from "antd";

import { Routers } from "../routers";

export const App: React.FC<{ hasError: boolean }> = ({ hasError }) => {
  useEffect(() => {
    if (hasError) {
      console.info("error");

      notification.error({ message: "В приложении возникла ошибка" });
    }
  }, [hasError]);

  return (
    <Layout style={{ minHeight: '100vh', maxHeight: '100vh' }}>
      <div>Hi</div>

      <Routers />
    </Layout>
  );
};
