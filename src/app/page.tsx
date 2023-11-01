"use client";

import React from "react";
import { Button, ConfigProvider } from "antd";
import { useRouter } from "next/navigation";
import theme from "@/theme/themeConfig";

const HomePage = () => {
  const router = useRouter();

  return (
    <ConfigProvider theme={theme}>
      <div className="App">
        <Button
          onClick={() => {
            router.push("/dashboard");
          }}
          type="primary"
        >
          Button
        </Button>
      </div>
    </ConfigProvider>
  );
};

export default HomePage;
