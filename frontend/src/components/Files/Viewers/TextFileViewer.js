import React from "react";
import { Spin } from "antd";

const blobToString = b => {
  const u = URL.createObjectURL(b);
  const x = new XMLHttpRequest();
  x.open('GET', u, false);
  x.send();
  URL.revokeObjectURL(u);
  return x.responseText;
};

const TextFileViewer = ({fileContent = "", loading }) => {
  if (loading || !fileContent)
    return <Spin/>

  const contentAsText = blobToString(fileContent);
  return <div style={{ padding:"10px", backgroundColor:"#e1e5eb", borderRadius: "5px" }}>
    {contentAsText.split("\n").map((line, index) => <pre key={index} style={{ whiteSpace: "pre-wrap" }}  >{line}</pre>)}
  </div>
};

export default TextFileViewer;