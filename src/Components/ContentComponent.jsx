
import React, { useState, useContext} from 'react';
import { Col, Row } from 'antd';
import axios from 'axios';
import {Layout, theme } from 'antd';
import MyEditor from './Editor';
import ParametersForm from './ParametersForm';
import NetworkGraph from './NetworkGraph';
import OutputComponent from './Modules/OutputComponent';


const { Content} = Layout;


function ContentComponent() {

    const {
        token: { colorBgContainer, borderRadiusLG },
      } = theme.useToken();
    
    

    const [colorMap, setColorMap] = useState({})
    const [inputGraph, setInputGraph] = useState({})
    const [inputData, setInputData] = useState({
        strGraph: "",
        numColors: 3,
        theory : undefined
    })

    async function fetchSolution(){
        const dataToSend = {
          graph: inputData.strGraph,  // sending the string representation of the graph
          k: inputData.numColors,
          theory: inputData.theory  // as specified, we're using a default value of 3
        };
    
        // Use fetch API to send the POST request
        try {
          // Make the HTTP request and wait for the fetch to complete, then wait for the JSON conversion
          const response = await fetch('http://localhost:8000/graph', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(dataToSend)
          });
          const data = await response.json(); // Wait for the JSON conversion of the response body
    
          // Log the success and perhaps update state or perform other actions with the data
          setColorMap(data.solution)
          return data;  // Optionally return data for further processing
      } catch (error) {
          // If an error occurs, log it
          console.error('Error:', error);
      }
    
      }
    
      function createGraphObj() {
        console.log(inputData)
        if (inputData.strGraph) {
          try {
            let graph = JSON.parse(inputData.strGraph);
            setInputGraph(graph);
            fetchSolution()
            // Prepare the data to be sent
            
          } catch (e) {
            console.log(e);
          }
        }
      }
    

    return ( 
        <Content className='content-page'>
        <Layout
          className='layout'
          style={{
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Content className='content'>
          <Row>
            <Col 
              className="column"
              span={16}>
            <MyEditor strInputGraph={inputData.strGraph} setStrInputGraph= {setInputData}/>
            </Col>
            <Col 
              className="column_small"
              span={8}>
              <ParametersForm numColors={inputData.numColors}  selectedTheory={inputData.theory} renderGraph={createGraphObj} setData={setInputData}/>
              <OutputComponent text={"Hello wWorld!\n sat\n x: True"}/>
            </Col>
          </Row>
          <Row>
            <NetworkGraph nodeColors={colorMap} graphObj= {inputGraph}/>
          </Row>
          </Content>
          
        </Layout>
      </Content>
     );
}

export default ContentComponent;