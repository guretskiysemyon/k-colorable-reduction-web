import './App.css'
import React, { useState,useEffect } from 'react';
import { Col, Row } from 'antd';
import axios from 'axios';

import {Layout, theme } from 'antd';
import MyEditor from './Components/Editor';
import ParametersForm from './Components/ParametersForm';
import NetworkGraph from './Components/NetworkGraph';
import MyHeader from './Components/MyHeader';
import FooterComponent from './Components/FooterComponent';
const { Content} = Layout;





const App = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const num_col = 3
  const [inputGraph, setInputGraph] = useState({})
  const [strInputGraph, setStrInputGraph] = useState("")
  const [colorMap, setColorMap] = useState({})


  // function generateColors(numColors) {
  //   let colors = [];
  //   for (let i = 0; i < numColors; i++) {
  //       let hue = i * 360 / numColors;
  //       colors.push(`hsl(${hue}, 100%, 50%)`);
  //   }
  //   return colors;
  // } 

  async function fetchSolution(){
    const dataToSend = {
      graph: strInputGraph,  // sending the string representation of the graph
      k: num_col  // as specified, we're using a default value of 3
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
      console.log('Success:', data);
      return data;  // Optionally return data for further processing
  } catch (error) {
      // If an error occurs, log it
      console.error('Error:', error);
  }

  }

  function createGraphObj() {
    if (strInputGraph) {
      try {
        let graph = JSON.parse(strInputGraph);
        setInputGraph(graph);
        fetchSolution()
        // Prepare the data to be sent
        
      } catch (e) {
        console.log(e);
      }
    }
  }

  // useEffect(() => {
  //     axios.get('http://localhost:8000/')
  //         .then((response) => {
  //             setData(response.data);
  //             console.log(response.data);
  //         })
  //         .catch((error) => {
  //             console.error('There was an error!', error);
  //         });
  // }, []);

  return (
    <Layout>
      <MyHeader/>
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
            <MyEditor strInputGraph={strInputGraph} setStrInputGraph= {setStrInputGraph}/>
            </Col>
            <Col 
              className="column_small"
              span={8}>
              <ParametersForm renderGraph={createGraphObj}/>
            </Col>
          </Row>
          <Row>
            <NetworkGraph graphObj= {inputGraph}/>
          </Row>
          </Content>
          
        </Layout>
      </Content>
      <FooterComponent/>
    </Layout>
  );
};
export default App;