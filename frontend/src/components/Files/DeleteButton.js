import React, { useContext } from "react";
import { Button, message } from "antd";
import { ContentContext } from "../../context/Content";
import { deleteFile } from "../../apis/backend";

const DeleteButton = ({ filename }) => {
  const context = useContext(ContentContext);
  const { currentPath } = context;

  const onClick = async () => {
    try {
      await deleteFile(currentPath, filename);
      message.success(`Successfully deleted ${filename}`);
    } catch (error) {
      message.error(`Cannot delete file ${filename}`); 
    }
  }

  return <Button 
    onClick={onClick} 
    shape="round"
    block={true}
    type="danger"
    icon="delete"
    ghost
  >Delete</Button>;
};

export default DeleteButton;