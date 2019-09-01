import React, { useContext, useEffect } from "react";
import { Modal, Button } from "antd";
import { ContentContext } from "../../../context/Content";
import { FileContentContext } from "../../../context/FileContent";
import TextFileViewer from "./TextFileViewer";
import ImageFileViewer from "./ImageFileViewer";
import UnsupportedFileViewer from "./UnsupportedFileViewer";

const FileViewer = ({ modalVisible = false, handleOk, handleCancel, filename, fileExtension }) => {
  const contentContext = useContext(ContentContext);
  const { currentPath } = contentContext;

  const fileContentContext = useContext(FileContentContext);
  const { fileContent, fetchFile, downloadFile, loading, errored } = fileContentContext;
  const renderFileContentComponent = () => {
    switch (fileExtension) {
      case "txt":
      case "js":
      case "json":
      case "md":
      case "lua":
      case "bat":
      case "yml":
      case "xml":
      case "cmd":
        return <TextFileViewer loading={loading} errored={errored} fileContent={fileContent} />
      case "jpg":
      case "png":
      case "ico":
        return <ImageFileViewer loading={loading} errored={errored} fileContent={fileContent} />
      default:
        return <UnsupportedFileViewer />
    }
  }

  useEffect(() =>{
    if (modalVisible)
      fetchFile(currentPath, filename, true);
  }, [modalVisible])

  return <>
    <Modal
        title={filename}
        visible={modalVisible}
        onCancel={handleCancel}
        footer={[ <Button key="download" onClick={() => downloadFile(currentPath, filename, false)}> Download </Button> ]}
        width={1000}
    >
      {renderFileContentComponent()}
    </Modal>
  </>
};

export default FileViewer;