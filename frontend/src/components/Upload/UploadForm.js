import React from "react";
import { Upload, Icon, Button, Form, Input } from "antd";

const UploadForm = ({ files, uploading, currentPath, beforeUpload, onRemove, onSubmit }) => <>
  <Input label={"Uploading to directory:"} value={currentPath} placeholder="/" disabled/>
  <Form.Item label="Choose Files:">
    <Upload fileList={files} beforeUpload={beforeUpload} onRemove={onRemove}>
      <Button disabled={uploading}>
        <Icon type="upload" /> Select File
      </Button>
    </Upload>  
  </Form.Item>

  <Form.Item >
    <Button loading={uploading} type="primary" block={true} onClick={onSubmit} htmlType="submit"> Submit </Button>
  </Form.Item>
</>
export default UploadForm;