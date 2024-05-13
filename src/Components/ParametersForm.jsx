// import React, { useState } from "react";
// import {
//   Button,
//   Cascader,
//   DatePicker,
//   Form,
//   Input,
//   InputNumber,
//   Select,
//   Switch,
//   TreeSelect,
// } from "antd";

// const ParametersForm = ({ renderGraph, numColors, selectedTheory, setData}) => {
//   const [componentSize, setComponentSize] = useState("default");
  
  


//   const theories = ["LIA", "NLA",  "Array"]
//   const onFormLayoutChange = ({ size }) => {
//     setComponentSize(size);
//   };

//   const handleChangeTreory = (value) => {
//     setData(prevState => ({
//       ...prevState,
//       theory: value
//     }));
//   };
//   const handleChangeNumColor = (value) => {
//     setData(prevState => ({
//       ...prevState,
//       numColors: value
//     }));
//   };
  
//   const onFinish = values => {
//     console.log('Received values of form: ', values);
//   };


//   return (
//     <Form
//       labelCol={{
//         span: 5,
//       }}
//       wrapperCol={{
//         span: 14,
//       }}
//       layout="horizontal"
//       initialValues={{
//         size: componentSize,
//       }}
//       onValuesChange={onFormLayoutChange}
//       size={componentSize}
//       style={{
//         maxWidth: 600,
//       }}
//       onFinish={onFinish}
//     >
//       <Form.Item
//         name="numColors"
//         label="Number of Colors"
//         labelCol={{ span: 8 }} // Increase the label column width
//         wrapperCol={{ span: 8 }} // Adjust the wrapper column accordingly
//       >
//         <InputNumber
//           min={1}
//           max={10}
//           defaultValue={3}
//           onChange={handleChangeNumColor}
//         />
//       </Form.Item>
//       <Form.Item
//         name = "theory"
//         label="Select Theory"
//         labelCol={{ span: 8 }} // Increase the label column width
//         wrapperCol={{ span: 12 }} // Adjust the wrapper column accordingly
//         rules={[{ required: true, message: "Please select a theory!" }]}
//         hasFeedback
//       >
//         <Select
//           placeholder="Please select a theory" // This is the placeholder text
//           allowClear // This allows the user to clear the selected value
//           onChange={handleChangeTreory}
//         >
//           {theories.map( t => 
//             <Select.Option key={t} value={t}>{t}</Select.Option>
//           )}
//         </Select>
//       </Form.Item>

//       <Form.Item label="Button">
//         <Button onClick={renderGraph}>Solve</Button>
//       </Form.Item>
//     </Form>
//   );
// };
// export default ParametersForm;


import React, { useState } from "react";
import { Button, Form, InputNumber, Select } from "antd";
import FileComponent from "./FileComponent";

const ParametersForm = ({ setData}) => {
  const [componentSize, setComponentSize] = useState("default");
  const  defaultNumColors = 3;

  const theories = ["LIA", "NLA", "Array"];
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const onFinish = values => {
    setData({
      numColors: values.numColors,
      theory : values.theory
    });
    //console.log('Received values of form: ', values);
    // createGraphObj();
  };

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
        <InputNumber min={1} max={10}  />
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
      <Form.Item>
        <FileComponent/>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">Solve</Button>
      </Form.Item>
    </Form>
  );
};

export default ParametersForm;
