import React from "react";
import { Upload, Icon, Button, Form, Input } from "antd";

const UploadForm = ({ files, uploading, uploadDirectory, onChange, beforeUpload, onRemove, onSubmit }) => <>
  <p>Set directory to upload. New folder will be created(if requires):</p>
  <Input value={uploadDirectory} onChange={e => onChange(e.target.value)} placeholder="/"/>
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