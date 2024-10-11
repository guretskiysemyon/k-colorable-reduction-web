import React, { useState, useEffect } from "react";
import { Button, Form, InputNumber, Select, Upload, Row, Col, message } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import useStore from '../store';

const ParametersForm = ({ setData}) => {
  const [form] = Form.useForm();
  const [componentSize, setComponentSize] = useState("default");
  const [selectedSolver, setSelectedSolver] = useState(null);
  const [availableTheories, setAvailableTheories] = useState([]);
  
  const {setStrInputGraph, strInputGraph, isLoading } = useStore();
  const defaultNumColors = 3;

  const solver = ["z3", "yices", "btor", "cvc5"];

  const SOLVER_THEORY_MAP = {
    "z3": ["LIA", "NLA", "AUF", "AINT", "ABV", "BV"],
    "yices": ["LIA"], 
    "btor": ["BV", "ABV"], 
    "cvc5": ["LIA", "NLA", "AUF", "AINT", "ABV", "BV", "SUF", "SINT", "SBV"],
  };

  const MAX_FILE_SIZE = 4 * 1024;
  const powerOfTwoTheories = ['BV', 'SUF', 'SINT', 'SBV'];

  const isPowerOfTwo = (num) => {
    return num && (num & (num - 1)) === 0;
  };

  useEffect(() => {
    if (selectedSolver && SOLVER_THEORY_MAP[selectedSolver]) {
      setAvailableTheories(SOLVER_THEORY_MAP[selectedSolver]);
      
      const currentTheory = form.getFieldValue('theory');
      if (currentTheory && !SOLVER_THEORY_MAP[selectedSolver].includes(currentTheory)) {
        form.setFieldsValue({ theory: undefined });
      }
    } else {
      setAvailableTheories([]);
      form.setFieldsValue({ theory: undefined });
    }
  }, [selectedSolver, form]);

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const onFinish = values => {
    setData({
      numColors: values.numColors,
      solver: values.solver,
      theory: values.theory,
    });
  };

  const handleFileUpload = async (file) => {
    if (file.size > MAX_FILE_SIZE) {
      message.error('File must be smaller than 4KB!');
      return Upload.LIST_IGNORE;
    }

    try {
      const content = await readFileContent(file);
      console.log(content)
      setStrInputGraph(content);
      console.log(strInputGraph)
      message.success('File uploaded successfully');
    } catch (error) {
      message.error('Failed to read file content');
    }

    return false; // Prevent default upload behavior
  };

  const readFileContent = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => resolve(event.target.result);
      reader.onerror = (error) => reject(error);
      reader.readAsText(file);
    });
  };

  return (
    <Form
      form={form}
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
        dependencies={['theory']}
        rules={[
          { required: true, message: 'Please input the number of colors!', type: 'number', min: 1 },
          ({ getFieldValue }) => ({
            validator(_, value) {
              const theory = getFieldValue('theory');
              if (powerOfTwoTheories.includes(theory)) {
                if (!isPowerOfTwo(value)) {
                  return Promise.reject(new Error('For the selected theory, number of colors must be a power of 2'));
                }
              }
              return Promise.resolve();
            },
          }),
        ]}
      >
        <InputNumber min={3} max={100} />
      </Form.Item>
      <Form.Item
        name="solver"
        label="Select Solver"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 12 }}
        rules={[{ required: true, message: "Please select a solver!" }]}
      >
        <Select
          placeholder="Please select a solver"
          allowClear
          onChange={(value) => {
            setSelectedSolver(value);
            form.validateFields(['theory']);
          }}
        >
          {solver.map(s => <Select.Option key={s} value={s}>{s}</Select.Option>)}
        </Select>
      </Form.Item>
      <Form.Item
        name="theory"
        label="Select Theory"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 12 }}
        rules={[{ required: true, message: "Please select a theory!" }]}
      >
        <Select
          placeholder="Please select a theory"
          allowClear
          disabled={!selectedSolver || availableTheories.length === 0}
        >
          {availableTheories.map(t => <Select.Option key={t} value={t}>{t}</Select.Option>)}
        </Select>
      </Form.Item>
      <Form.Item
        label="Upload File"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
      >
        <Upload
          accept=".dot"
          beforeUpload={handleFileUpload}
          maxCount={1}
        >
          <Button icon={<UploadOutlined />}>
            Select File (Max 4KB)
          </Button>
        </Upload>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" disabled={isLoading}> 
          {isLoading ? 'Solving...' : 'Solve'}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ParametersForm;