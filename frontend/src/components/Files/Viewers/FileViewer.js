import React, { useContext, useEffect } from "react";
import { Modal, Button, Icon } from "antd";
import { ContentContext } from "../../../context/Content";
import { FileContentContext } from "../../../context/FileContent";
import TextFileViewer from "./TextFileViewer";
import ImageFileViewer from "./ImageFileViewer";
import UnsupportedFileViewer from "./UnsupportedFileViewer";

const FileViewer = ({ modalVisible = false, handleOk, handleCancel, filename, fileExtension }) => {
  const contentContext = useContext(ContentContext);
  const { currentPath } = contentContext;

  const canBePreviewed = fileExtension => [ "txt", "js", "json", "md", "lua", "bat", "yml", "xml", "cmd", "jpg", "png", "ico", "webp" ].includes(fileExtension);

  const fileContentContext = useContext(FileContentContext);
  const { fileContent, fetchFile, downloadFile, loading, errored } = fileContentContext;
  const renderFileContentComponent = () => {
    if (errored)
      return <Icon style={{ color: 'red' }} type="close-circle" />

    switch (fileExtension) {
      case "txt":
      case "js":
      case "json":
      case "md":
      case "bat":
      case "yml":
      case "xml":
      case "cmd":
        return <TextFileViewer loading={loading} fileContent={fileContent} />
      case "jpg":
      case "webp":
      case "png":
      case "ico":
        return <ImageFileViewer loading={loading} fileContent={fileContent} />
      default:
        return <UnsupportedFileViewer />
    }
  }

  useEffect(() =>{
    if (modalVisible && canBePreviewed(fileExtension))
      fetchFile(currentPath, filename, true);
      // eslint-disable-next-line
  }, [modalVisible])

  return <>
    <Modal
        title={filename}
        visible={modalVisible}
        onCancel={handleCancel}
        footer={[ <Button key="download" block={true} onClick={() => downloadFile(currentPath, filename, false)}> Download </Button> ]}
        width={1000}
    >
      {renderFileContentComponent()}
    </Modal>
  </>
};

export default FileViewer;