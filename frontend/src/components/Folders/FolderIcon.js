import React, { useContext, useState } from "react";
import { Icon, message } from "antd";
import DeleteButton from "./DeleteButton";
import { ContentContext } from "../../context/Content";
import { deleteDirectory } from "../../apis/backend";

const FolderIcon = ({ iconSize, children: folderName }) => {
  const context = useContext(ContentContext);
  const { currentPath, changeCurrentPath } = context;
  const [ hovered, setHovered ] = useState(false);
  
  const link = `${currentPath}/${folderName}`; 

  const onClick = async () => {
    try {
      await deleteDirectory(link);
      message.success(`Folder ${folderName} deleted`);
    } catch (error) {
      message.error(`Folder "${folderName}" don't deleted. Only empty folders can be deleted.`);
      
    }
  };

  return <div 
    onMouseEnter={() => setHovered(true)} 
    onMouseLeave={() => setHovered(false)} 
  >
    <DeleteButton onClick={onClick} visible={hovered} />
    <div style={{ display: "flex", flexDirection: "column" }} onClick={()=> changeCurrentPath(link)}> 
      <Icon type="folder" theme="twoTone" style={{ fontSize: iconSize }}/>
      <p style={{ textAlign: "center" }}>{folderName}</p>
    </div>
  </div>;
}

export default FolderIcon;