import React from "react";
import { Spin } from "antd";

const ImageFileViewer = ({ fileContent, loading, errored }) => {
  if (loading)
    return <Spin/>
  return <img style={{ display:"block", margin: "auto" }} src={fileContent && URL.createObjectURL(fileContent)} alt="Placeholder" />
}

export default ImageFileViewer;