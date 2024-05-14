
import React, { useState, useEffect} from 'react';
import { Col, Row } from 'antd';
import {Layout, theme } from 'antd';
import MyEditor from './Editor';
import ParametersForm from './ParametersForm';
import NetworkGraph from './NetworkGraph';
import OutputWindowComponent from './Modules/OutputWindowComponent';
import useFetching from '../Hooks/useFetching';
import { read } from 'graphlib-dot';
import FileComponent from './FileComponent';
import { FlashOnOutlined } from '@mui/icons-material';


function InputComponent({createAndFetch}) {
    const defaultValue = 3;
    const [strGraph, setStrInputGraph] = useState("")
    const [inputData, setInputData] = useState({
        numColors: defaultValue,
        theory : undefined,
        mode: 'text',
        file: undefined
    })

    useEffect(()=> {
        console.log(inputData)
        if (inputData.theory && strGraph){
            createAndFetch(strGraph, inputData)
        }
            
    }, [inputData])
   

    return (  
        <Row>
            <Col 
              className="column"
              span={16}>
            <MyEditor strInputGraph={strGraph} setStrInputGraph= {setStrInputGraph}/>
            </Col>
            <Col 
              className="column_small"
              span={8}>
              <ParametersForm setData={setInputData}/>
              {/* <FileComponent/> */}
            </Col>
          </Row>
    );
}

export default InputComponent;
