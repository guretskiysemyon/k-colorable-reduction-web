
import React, { useState, useEffect} from 'react';
import { Col, Row } from 'antd';
import {Layout, theme } from 'antd';
import MyEditor from './Editor';
import ParametersForm from './ParametersForm';
import NetworkGraph from './NetworkGraph';
import OutputComponent from './Modules/OutputComponent';
import useFetching from '../Hooks/useFetching';
import { read } from 'graphlib-dot';
import InputComponent from './InputComponents';

const { Content} = Layout;


function ContentComponent() {

    const {
        token: { colorBgContainer, borderRadiusLG },
      } = theme.useToken();
    
    

    
    const [inputGraph, setInputGraph] = useState(null)
    // const [strGraph, setStrInputGraph] = useState("")
    // const [inputData, setInputData] = useState({
    //     numColors: 3,
    //     theory : undefined
    // })

    const [coloringGraph, setColoringGraph] = useState({
      numColors: 3,
      coloring : null
    })
    const [output, setOutput] = useState("")
    const { fetchedData, error, fetchGraph } = useFetching();
    
    
    
    function showResult(data){
      //console.log(data)
      let text = data.formula + "\n"
      //setColorMap(data.solution)
      if (data.result === "unsat"){
        text += "Not Colorable"
        setOutput(text)
        return
      }
      text += "Colorable\n"
      //console.log(data.solution)
      for (const key in data.solution) {
        if (data.solution.hasOwnProperty(key)) {  // This check is necessary to ensure you only access properties defined on the object itself
          text += key + ": " + data.solution[key] + "\n";
        }
      }
      // text += data.solution
      setOutput(text)
    }

    useEffect(() => {
      
      if (fetchedData)
          showResult(fetchedData);
    },[fetchedData])

    function parse(strGraph) {
      //console.log('Starting parse with strGraph:', strGraph); // Log input
      try {
          const parsedGraph = read(strGraph);
          return parsedGraph
      } catch(err) {
          setOutput('Invalid DOT format or other error parsing the file.');
          console.log('Error parsing DOT file:', err);
      }
    }
  
    async function createGraphAndFetchResult(strGraph, inputData) {
      
      if (strGraph && inputData.numColors  && inputData.theory) {
        setOutput("")
        try {
          const parsedGraph = parse(strGraph);
          setInputGraph(parsedGraph);
          console.log(parsedGraph)
          
          await fetchGraph(strGraph, inputData.numColors, inputData.theory);
          console.log(fetchedData.solution)
          setColoringGraph({
            numColors: inputData.numColors,
            coloring : fetchedData ? fetchedData.solution : null
          })
          // console.log(fetchedData)  
          // showResult(data);
          // showResult(fetchedData); // Call showResult only when both conditions are met

          //setFetchedData(data)
          // Prepare the data to be sent
          
        } catch (err) {
            setOutput("Fail to connect to server!")
            console.log(err)
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
          <InputComponent createAndFetch={createGraphAndFetchResult} />
          <Row>
            <Col
              span={16}
            >
              <OutputComponent text={output}/>
            </Col>
          </Row>
          <Row>
            {error
            ? <p>Error fetching data: {error.message}</p>
            : <NetworkGraph coloringGraph={coloringGraph} graphObj= {inputGraph}/>

            }
            
          </Row>
          </Content>
          
        </Layout>
      </Content>
     );
}

export default ContentComponent;