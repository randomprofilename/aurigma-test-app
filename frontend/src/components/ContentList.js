import React, { useContext } from "react";
import { Row, Col, Divider, Spin, Alert, Skeleton, Empty } from 'antd';
import FileIcon from "./Files/FileIcon";
import FolderIcon from "./Folders/FolderIcon";
import GridItem from "./GridItem";
import { ContentContext } from "../context/Content";

const ContentList = ({ iconSize = "100px" }) => {
  const context = useContext(ContentContext);
  const { files, folders, loading, errored } = context;

  const renderFolders = () => <>
    <Divider>Folders</Divider>
    <Row gutter={10}>
      {folders.map((dir, index) => (
        <Col key={index} lg={4} md={5} sm={6} xs={7}>
          <GridItem>
            <FolderIcon iconSize={iconSize}>{dir.name}</FolderIcon>
          </GridItem>
        </Col>
      ))}
    </Row>
  </>;

  const renderFiles = () => <>
    <Divider>Files</Divider>
    <Row gutter={10}>
      {files.map((file, index) => (
        <Col key={index} lg={4} md={5} sm={6} xs={7}>
          <GridItem>
            <FileIcon iconSize={iconSize} fileDetail={file} >{file.name}</FileIcon>
          </GridItem>
        </Col>
      ))}
    </Row>
  </>;

  if (errored)
    return <Alert type="error" message="Backend is unavailable. Look in console for details" />
    
  return <> <Spin spinning={loading} size="large" style={{ textAlign: "center" }}>
    {folders.length > 0 ? renderFolders() : ""}
    {files.length > 0 ? renderFiles(): ""}
    {folders.length <1 && files.length < 1 ? 
      loading ?
        <Skeleton /> : 
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={<><p>Folder is empty</p><p>Just upload something</p></>}/>
    : ""}
    </Spin>
  </>
};

export default ContentList;