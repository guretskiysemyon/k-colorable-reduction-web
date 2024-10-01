
import React from 'react';
import { Col, Row } from 'antd';
import NetworkGraph from './NetworkGraph';
import OutputWindowComponent from './Modules/OutputWindowComponent';
import useStore from '../store';


function OutputComponent() {
  const { output, error, isLoading} = useStore();


  return ( <>
    <Row>
            <Col
              span={24}
            >
              <OutputWindowComponent text={output} isLoading={isLoading}/>
            </Col>
          </Row>
          <Row>
            {error
            ? <p>Error fetching data: {error.message}</p>
            : <NetworkGraph isLoadingData={isLoading}/>

            }
            
          </Row>
    </>);
}

export default OutputComponent;