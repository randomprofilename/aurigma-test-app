import React from "react";
import { Button } from "antd";

const DeleteButton = ({ visible, onClick }) => {
  return <Button 
    style={{ position:"absolute", margin:"5px", display: visible ? "" : "none" }} 
    type="danger" 
    ghost 
    icon="delete"
    onClick={onClick}
  />
};

export default DeleteButton;