
import React, { useState, useEffect} from 'react';
import { Col, Row } from 'antd';
import MyEditor from './Editor';
import ParametersForm from './ParametersForm';
import { read } from 'graphlib-dot';
import { message } from 'antd';
import { useGraphQuery } from '../Hooks/useGraphQuery'; // New import
import useStore from '../store';

function InputComponent() {
    const defaultValue = 3;
    const [strGraph, setStrInputGraph] = useState("")
    const [inputData, setInputData] = useState({
        numColors: defaultValue,
        solver: undefined,
        theory : undefined,
        mode: 'text',
        file: undefined
    })

    const { setColoringGraph, setOutput, setError } = useStore();
     // New: Use the custom hook
    const graphMutation = useGraphQuery();



    useEffect(()=> {
        console.log(inputData)
        let condition = inputData.theory && 
						((inputData.mode === 'text' && strGraph) || (inputData.mode === 'file' && inputData.file) )
        
        if (condition){
            setError("")
            createGraphAndFetchResult(strGraph, inputData)
        }
            
    }, [inputData])
   

    
    function showResult(data){
      //console.log(data)
      let text = "Formula:\n" + data.formula + "\n\n"
      //setColorMap(data.solution)
      if (!data.result){
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

    // New: Effect to handle mutation results
    useEffect(() => {
      if (graphMutation.isSuccess) {
          const data = graphMutation.data.data;
          setColoringGraph({
              numColors: inputData.numColors,
              coloring : data.solution
          })
          showResult(data);
      }
      if (graphMutation.isError) {
          setOutput(`Error: ${graphMutation.error.message}`);
      }
  }, [graphMutation.isSuccess, graphMutation.isError]);


      
    async function createGraphAndFetchResult(strGraph, inputData) {
      setOutput("")
      try {
          // const parsedGraph = parse(inputData.mode === 'file' ? await readFileContent(inputData.file) : strGraph);
          // setInputGraph(parsedGraph);
          
          graphMutation.mutate({
              mode: inputData.mode,
              graphData: inputData.mode === 'file' ? inputData.file : strGraph,
              numColors: inputData.numColors,
              theory: inputData.theory,
              solver : inputData.solver
          });
      } catch (err) {
          setOutput("Failed to process graph!")
          console.error(err)
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
            </Col>
          </Row>
    );
}

export default InputComponent;
