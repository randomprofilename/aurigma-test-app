import React from "react";
import { Popover } from "antd";
import DeleteButton from "./DeleteButton";

const names = {
  name: "Name",
  createdTime: "Created time",
  lastModified: "Last modified",
  size: "Size",
}
const values = {
  name: value => value,
  createdTime: value => new Date(value).toLocaleString(),
  lastModified: value => new Date(value).toLocaleString(),
  size: value => `${value} bytes`,
}

const FilePopover = ({ children, fileDetail = {} }) => {
  const popoverContent = Object.entries(fileDetail).map(([key,value]) => {
    return <p key={key}><b>{names[key]}</b>: {values[key](value)}</p>
  }).concat(<DeleteButton key="delete button" filename={fileDetail.name} />);
  return <Popover content={popoverContent} >
    {children}
  </Popover>
};

export default FilePopover;