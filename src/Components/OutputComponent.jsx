
import React from 'react';
import { Col, Row } from 'antd';
import NetworkGraph from './NetworkGraph';
import OutputWindowComponent from './Modules/OutputWindowComponent';



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