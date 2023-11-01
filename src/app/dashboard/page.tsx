"use client";

import { Markdown } from "@/components/Markdown";
import React, { useEffect, useState } from "react";

function Page() {
  const [data, setData] = useState("");
  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data: any) => {
        console.log("+++++++++++", data);
        setData(data.content);
      });
  }, []);
  console.log("++++++++++++data", data);
  return (
    <div>
      <div>这是markdown文档</div>
      <Markdown content={data}></Markdown>
    </div>
  );
}

export default Page;
