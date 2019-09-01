import React, { useContext } from "react";
import { Icon } from "antd";
import { ContentContext } from "../../context/Content";

const FolderIcon = props => {
  const { iconSize, children: folderName } = props;
  const context = useContext(ContentContext);
  const { currentPath, changeCurrentPath } = context
  
  return <div style={{ display: "flex", flexDirection: "column" }} onClick={()=> changeCurrentPath(`${currentPath}/${folderName}`)}> 
    <Icon type="folder" theme="twoTone" style={{ fontSize: iconSize }}/>
    <p style={{ textAlign: "center" }}>{folderName}</p>
  </div>;
}

export default FolderIcon;