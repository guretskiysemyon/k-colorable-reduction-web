import React, { useState } from 'react';
import { Upload, Button, Switch, Input } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const { TextArea } = Input;

function FileComponent() {
    const [isFileInput, setIsFileInput] = useState(false); // State to track if file input is selected
    const [fileList, setFileList] = useState([]);

    const handleSwitchChange = (checked) => {
        setIsFileInput(checked);
    };

    const handleFileChange = ({ fileList }) => setFileList(fileList);

    return (
        <div>
            <Switch
                checked={isFileInput}
                checkedChildren="File"
                unCheckedChildren="Text"
                onChange={handleSwitchChange}
                style={{ marginBottom: 16 }}
            />
            <Upload
                fileList={fileList}
                onChange={handleFileChange}
                beforeUpload={() => false} // Prevent auto-uploading
                style={{ marginBottom: 16 }}
            >
                <Button icon={<UploadOutlined />} disabled={!isFileInput}>
                    Click to Upload
                </Button>
            </Upload>
        </div>
    );
}

export default FileComponent;
