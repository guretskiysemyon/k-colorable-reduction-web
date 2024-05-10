
import React, { useState, useEffect} from 'react';
import { Col, Row } from 'antd';
import {Layout, theme } from 'antd';
import MyEditor from './Editor';
import ParametersForm from './ParametersForm';
import NetworkGraph from './NetworkGraph';
import OutputComponent from './Modules/OutputComponent';
import useFetching from '../Hooks/useFetching';


const { Content} = Layout;


function ContentComponent() {

    const {
        token: { colorBgContainer, borderRadiusLG },
      } = theme.useToken();
    
    

    
    const [inputGraph, setInputGraph] = useState({})
    const [strGraph, setStrInputGraph] = useState("")
    const [inputData, setInputData] = useState({
        numColors: 3,
        theory : undefined
    })

    const [mapIdLabel, setMapIdLabel] = useState([])
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
      let n = mapIdLabel.length
      console.log(mapIdLabel)
      console.log(data.solution)
      for (let i = 0; i < n; i++) {
        text += mapIdLabel[i] + ": " + data.solution[i] + "\n"
      }
      setOutput(text)
    }

    useEffect(() => {
      // Ensure this effect runs only when there's new data to be processed
      if (fetchedData && mapIdLabel.length > 0) {
          showResult(fetchedData); // Call showResult only when both conditions are met
      }
    }, [fetchedData, mapIdLabel]);


    useEffect(() => {
      // Define a function inside useEffect to perform the fetch
      async function createGraphObj() {
        console.log(inputData)
        
        if (strGraph && inputData.numColors  && inputData.theory) {
          setMapIdLabel([])
          try {
            let graph = JSON.parse(strGraph);
            setInputGraph(graph);
            console.log(inputData)
            fetchGraph(strGraph, inputData.numColors, inputData.theory)
            //setFetchedData(data)
            // Prepare the data to be sent
            
          } catch (e) {
            
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
            : <NetworkGraph setMapIdLabel={setMapIdLabel} numberColors={inputData.numColors} nodeColors={fetchedData ? fetchedData.solution : null} graphObj= {inputGraph}/>

            }
            
          </Row>
          </Content>
          
        </Layout>
      </Content>
     );
}

export default ContentComponent;