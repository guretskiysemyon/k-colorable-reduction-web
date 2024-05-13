
import React, { useState, useEffect} from 'react';
import { Col, Row } from 'antd';
import {Layout, theme } from 'antd';
import MyEditor from './Editor';
import ParametersForm from './ParametersForm';
import NetworkGraph from './NetworkGraph';
import OutputWindowComponent from './Modules/OutputWindowComponent';
import useFetching from '../Hooks/useFetching';
import { read } from 'graphlib-dot';
import InputComponent from './InputComponents';


function OutputComponent({outputText, error, coloringGraph, inputGraph}) {
    return ( <>
    <Row>
            <Col
              span={24}
            >
              <OutputWindowComponent text={outputText}/>
            </Col>
          </Row>
          <Row>
            {error
            ? <p>Error fetching data: {error.message}</p>
            : <NetworkGraph coloringGraph={coloringGraph} graphObj= {inputGraph}/>

            }
            
          </Row>
    </>);
}

export default OutputComponent;