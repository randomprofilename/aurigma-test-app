import React from "react";
import { Spin } from "antd";

function blobToString(b) {
  var u, x;
  u = URL.createObjectURL(b);
  x = new XMLHttpRequest();
  x.open('GET', u, false); // although sync, you're not fetching over internet
  x.send();
  URL.revokeObjectURL(u);
  return x.responseText;
}

const TextFileViewer = ({fileContent = "", loading, errored}) => {
  if (loading || !fileContent)
    return <Spin/>

  const contentAsText = blobToString(fileContent);
  return <div style={{ padding:"10px", backgroundColor:"#e1e5eb" }}>
    { contentAsText.split("\n").map((line, index) => <pre key={index} style={{ whiteSpace: "pre-wrap" }}  >{line}</pre>) }
  </div>
};

export default TextFileViewer;