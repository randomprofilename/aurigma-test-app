import React, { useContext, useState } from "react";
import { Menu, Button } from "antd";
import { ContentContext } from "../context/Content";
import UploadModal from "./Upload/UploadModal";

const NavBar = () =>{
  const context = useContext(ContentContext);
  const { currentPath, changeCurrentPath } = context;
  const [ showUploadModal, setShowUploadModal ] = useState(false);

  const items = () => currentPath.split("/")
    .filter(el => el)
    .map((folder, index, origArr) => {
      const path = origArr.slice(0, index+1).join("/")
      return <Menu.Item key={index} onClick={() => changeCurrentPath(path)}> {`${folder}`} </Menu.Item>
    });

  return <>
    <Menu mode="horizontal" selectable={false}>
      <Menu.Item disabled>Current folder:</Menu.Item>
      <Menu.Item onClick={() => changeCurrentPath("")}> / </Menu.Item>
      {items()}
      <Menu.Item style={{ float:"right" }} onClick={() => setShowUploadModal(true)}><Button type="primary" > Upload Files</Button></Menu.Item>
    </Menu>
    <UploadModal modalVisible={showUploadModal} onCancel={() => setShowUploadModal(false)}/>
  </>
};

export default NavBar;