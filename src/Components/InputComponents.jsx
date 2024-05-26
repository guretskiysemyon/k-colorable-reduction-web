
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
import { message } from 'antd';

function InputComponent({setOutput, setColoringGraph, setInputGraph}) {
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
        let condition = inputData.theory && 
						((inputData.mode === 'text' && strGraph) || (inputData.mode === 'file' && inputData.file) )
        if (condition){
            createGraphAndFetchResult(strGraph, inputData)
        }
            
    }, [inputData])
   


	const { fetchedData, fetchGraph } = useFetching();
    
    
    
    function showResult(data){
      //console.log(data)
      let text = "Formula:\n" + data.formula + "\n\n"
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
      
      if (fetchedData){
        console.log(fetchedData)
        setColoringGraph({
          numColors: inputData.numColors,
          coloring : fetchedData.solution
        })
        showResult(fetchedData);
      }
          
    },[fetchedData])

    function parse(strGraph) {
      //console.log('Starting parse with strGraph:', strGraph); // Log input
      try {
          const parsedGraph = read(strGraph);
          return parsedGraph
      } catch(err) {
          setOutput('Invalid DOT format or other error parsing the file.');
          console.log('Error parsing DOT file:', err);
          return null;
      }
    }
    
    // Function to read file content
    const readFileContent = (file, callback) => {
      const reader = new FileReader();
      reader.onload = e => {
        callback(e.target.result);
      };
      reader.onerror = e => {
        message.error('Failed to read file!');
      };
      reader.readAsText(file);
    };
  


    async function createGraphAndFetchResult(strGraph, inputData) {
      //console.log("Here")
      setOutput("")
      

      
      try {
        //setNumColors(inputData.numColors)
        if (inputData.mode === 'file'){
          readFileContent(inputData.file, (content) => {
            const parsedGraph = parse(content);
            setInputGraph(parsedGraph);
          })
          await fetchGraph(inputData.mode, inputData.file, inputData.numColors, inputData.theory);
        
        } else if (inputData.data === 'text'){
          const parsedGraph = parse(strGraph);
          setInputGraph(parsedGraph);
          
          await fetchGraph(inputData.mode, strGraph, inputData.numColors, inputData.theory);
        }
       

        
      } catch (err) {
          setOutput("Fail to connect to server!")
          console.log(err)
      }
      
    }

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
