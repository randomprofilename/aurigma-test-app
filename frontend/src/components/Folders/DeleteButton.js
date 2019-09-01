import React from "react";
import { Button } from "antd";

const DeleteButton = ({ visible, onClick }) => {
  return <Button 
    style={{ position:"absolute", display: visible ? "" : "none" }} 
    type="danger" 
    ghost 
    icon="delete"
    onClick={onClick}
  />
};

export default DeleteButton;