
import React, { useState, useEffect} from 'react';
import { Col, Row } from 'antd';
import {Layout, theme } from 'antd';
import MyEditor from './Editor';
import ParametersForm from './ParametersForm';
import NetworkGraph from './NetworkGraph';
import OutputComponent from './Modules/OutputComponent';
import useFetching from '../Hooks/useFetching';
import { read } from 'graphlib-dot';

const { Content} = Layout;


function ContentComponent() {

    const {
        token: { colorBgContainer, borderRadiusLG },
      } = theme.useToken();
    
    

    
    const [inputGraph, setInputGraph] = useState(null)
    const [strGraph, setStrInputGraph] = useState("")
    const [inputData, setInputData] = useState({
        numColors: 3,
        theory : undefined
    })

    
    const [output, setOutput] = useState("")
    const { fetchedData, error, fetchGraph } = useFetching();
    
    
    
    function showResult(data){
      console.log(data)
      
      //setColorMap(data.solution)
      if (data.result === "unsat"){
        setOutput("Not Colorable")
        return
      }
      let text = "Colorable\n"
      console.log(data.solution)
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

    function parse() {
      console.log('Starting parse with strGraph:', strGraph); // Log input
      try {
          const parsedGraph = read(strGraph);
          return parsedGraph
      } catch(err) {
          setOutput('Invalid DOT format or other error parsing the file.');
          console.log('Error parsing DOT file:', err);
      }
    }
  

    useEffect(() => {
      // Define a function inside useEffect to perform the fetch
      async function createGraphObj() {
        
        if (strGraph && inputData.numColors  && inputData.theory) {
          setOutput("")
          try {
            const parsedGraph = parse();
            setInputGraph(parsedGraph);
            console.log(strGraph)
            
            fetchGraph(strGraph, inputData.numColors, inputData.theory);
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
      }// Call the function once the effect is run

      createGraphObj()

  }, [inputData]);
      

    
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
            <MyEditor strInputGraph={strGraph} setStrInputGraph= {setStrInputGraph}/>
            </Col>
            <Col 
              className="column_small"
              span={8}>
              <ParametersForm numColors={inputData.numColors}  selectedTheory={inputData.theory} setData={setInputData}/>
              <OutputComponent text={output}/>
            </Col>
          </Row>
          <Row>
            {error
            ? <p>Error fetching data: {error.message}</p>
            : <NetworkGraph numberColors={inputData.numColors} nodeColors={fetchedData ? fetchedData.solution : null} graphObj= {inputGraph}/>

            }
            
          </Row>
          </Content>
          
        </Layout>
      </Content>
     );
}

export default ContentComponent;