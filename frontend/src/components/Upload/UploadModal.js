import React, { useContext, useState } from "react";
import { Modal, message } from "antd";
import { postFile } from "../../apis/backend";
import { ContentContext } from "../../context/Content";
import UploadForm from "./UploadForm";

const UploadModal = ({ modalVisible= false, onCancel, setModalVisible }) => {
  const context = useContext(ContentContext);
  const { currentPath } = context;

  const [ files, setFiles ] = useState([]);
  const [ uploading, setUploading ] = useState(false);

  const onFileChoosed = file => {
    setFiles([...files, file]);
    return false;
  };

  const onFileRemoved = file => {
    setFiles(files.filter(f => f.uid !== file.uid));
  };

  const onSubmit = async () => {
    setUploading(true);
    await postFile(currentPath, files);
    message.success("Uploaded successfully!");
    setTimeout(() => {
      setUploading(false);
      setFiles([]);
      onCancel();
    }, 1000);
  }

  return <>
    <Modal
        title="Upload File"
        visible={modalVisible}
        onCancel={onCancel}
        footer={[]}
        width={1000}
    >
      <UploadForm
        files={files}
        uploading={uploading} 
        onSubmit={onSubmit} 
        currentPath={currentPath} 
        beforeUpload={onFileChoosed} 
        onRemove={onFileRemoved} 
      />
    </Modal>
  </>
};

export default UploadModal;