import React, { useState } from "react";
import { Button, Form, InputNumber, Select, Switch, Upload, Row, Col } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import FileComponent from "./FileComponent";

const ParametersForm = ({ setData }) => {
  const [componentSize, setComponentSize] = useState("default");
  const [isFileMode, setIsFileMode] = useState(false);
  const defaultNumColors = 3;

  const theories = ["LIA", "NLA", "Array"];
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const onSwitchChange = (checked) => {
    setIsFileMode(checked);
  };

  const onFinish = values => {
    console.log("called")
    setData({
      numColors: values.numColors,
      theory: values.theory,
      mode: isFileMode ? 'file' : 'text',
      file: isFileMode ? values.file[0].originFileObj : null,
    });
  };

  
  // const onFileChange = info => {
  //   let newFileList = info.fileList.slice(-1); // Only keep the last file uploaded
  //   setFileList(newFileList);
  // };

  return (
    <Form
      labelCol={{ span: 5 }}
      wrapperCol={{ span: 14 }}
      layout="horizontal"
      initialValues={{ size: componentSize, numColors: defaultNumColors }}
      onValuesChange={onFormLayoutChange}
      size={componentSize}
      style={{ maxWidth: 600 }}
      onFinish={onFinish}
    >
      <Form.Item
        name="numColors"
        label="Number of Colors"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 8 }}
        rules={[{ required: true, message: 'Please input the number of colors!', type: 'number', min: 1 }]}
      >
        <InputNumber min={1} max={10} />
      </Form.Item>
      <Form.Item
        name="theory"
        label="Select Theory"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 12 }}
        rules={[{ required: true, message: "Please select a theory!" }]}
      >
        <Select placeholder="Please select a theory" allowClear>
          {theories.map(t => <Select.Option key={t} value={t}>{t}</Select.Option>)}
        </Select>
      </Form.Item>
      <Form.Item
        label="Mode"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
      >
        <Row align="middle" style={{ width: '100%' }}>
          <Col span={8}>
            <Switch
              checkedChildren="File"
              unCheckedChildren="Text"
              onChange={onSwitchChange}
              defaultChecked={false}
              style={{ marginRight: 16 }}
            />
          </Col>
          <Col span={16}>
            <Form.Item
              name="file"
              valuePropName="fileList"
              getValueFromEvent={e => (Array.isArray(e) ? e : e && e.fileList)}
              dependencies={['file']}
              rules={[
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!isFileMode) {
                      return Promise.resolve(); // No need to validate if not in file mode
                    }
                    if (value && value.length > 0) {
                      return Promise.resolve(); // Validation passed
                    }
                    return Promise.reject(new Error('Please upload a file!')); // No file uploaded
                  },
                }),
              ]}
              
              noStyle
            >
              <Upload
                name="file"
                beforeUpload={() => false} // Prevent automatic upload
                disabled={!isFileMode}
                // onChange={onFileChange}
                maxCount={1}
                accept=".dot" // Only accept .dot files
              >
                <Button
                  icon={<UploadOutlined />}
                  disabled={!isFileMode}
                  style={{ opacity: isFileMode ? 1 : 0.5 }}
                >
                  Select File
                </Button>
              </Upload>
            </Form.Item>
          </Col>
        </Row>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">Solve</Button>
      </Form.Item>
    </Form>
  );
};

export default ParametersForm;
