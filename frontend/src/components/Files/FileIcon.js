import React, { useState } from "react";
import { Icon } from "antd";
import FileViewer from "./Viewers/FileViewer";
import FilePopover from "./FilePopover";

const types = type => {
  switch (type) {
    case "png":
    case "jpg":
      return "file-image";

    case "txt":
    case "json":
    case "js":
      return "file-text";

    case "md": 
      return "file-markdown";
    case "pdf": 
      return "file-pdf";

    case "zip": 
    case "rar": 
    case "7z": 
      return "file-zip";

    default:
      return "file"
  }
};

const FileIcon = ({ iconSize, children: text, fileDetail = {} }) => {
  const [ fileViewerVisible, setFileViewerVisible ] = useState(false);
  const fileExtension = text.split(".").pop();
  const handleOk = () => setFileViewerVisible(false);
  const handleCancel = () => setFileViewerVisible(false);

  return <>
    <FilePopover fileDetail={fileDetail} >
      <div 
        style={{ display: "flex", flexDirection: "column" }} 
        onClick={() => setFileViewerVisible(true)
      }>
        <Icon type={types(fileExtension) || "file"} theme="twoTone" style={{ padding: "10px", fontSize: iconSize }} />
        <p style={{ textAlign: "center" }}>{text}</p>
      </div>
    </FilePopover>
    <FileViewer 
      modalVisible={fileViewerVisible} 
      filename={text} 
      handleOk={handleOk} 
      handleCancel={handleCancel}
      fileExtension={fileExtension} 
    />
  </>
};

export default FileIcon;