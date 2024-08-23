
import React, { useState, useEffect} from 'react';
import { Col, Row } from 'antd';
import MyEditor from './Editor';
import ParametersForm from './ParametersForm';
import { read } from 'graphlib-dot';
import { message } from 'antd';
import { useGraphQuery } from '../Hooks/useGraphQuery'; // New import

function InputComponent({setOutput, setColoringGraph, setInputGraph}) {
    const defaultValue = 3;
    const [strGraph, setStrInputGraph] = useState("")
    const [inputData, setInputData] = useState({
        numColors: defaultValue,
        theory : undefined,
        mode: 'text',
        file: undefined
    })

     // New: Use the custom hook
     const graphMutation = useGraphQuery();

    useEffect(()=> {
        console.log(inputData)
        let condition = inputData.theory && 
						((inputData.mode === 'text' && strGraph) || (inputData.mode === 'file' && inputData.file) )
        
        if (condition){
        
            createGraphAndFetchResult(strGraph, inputData)
        }
            
    }, [inputData])
   


	// const { fetchedData, fetchGraph } = useFetching();
    
    
    
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

    // function parse(strGraph) {
    //   //console.log('Starting parse with strGraph:', strGraph); // Log input
    //   try {
    //       const parsedGraph = read(strGraph);
    //       return parsedGraph
    //   } catch(err) {
    //       setOutput('Invalid DOT format or other error parsing the file.');
    //       console.log('Error parsing DOT file:', err);
    //       return null;
    //   }
    // }
    function parse(strGraph) {
      try {
          const parsedGraph = read(strGraph);
          if (!parsedGraph || !parsedGraph.nodes().length) {
              throw new Error('Graph is empty or invalid');
          }
          return parsedGraph
      } catch(err) {
          let errorMessage = 'Error parsing graph: ';
          if (err.message.includes('Syntax error')) {
              errorMessage += 'Invalid DOT format. Please check your syntax.';
          } else if (err.message.includes('empty or invalid')) {
              errorMessage += 'The graph is empty or invalid. Please provide a valid graph.';
          } else {
              errorMessage += err.message;
          }
          setOutput(errorMessage);
          console.error('Error parsing DOT file:', err);
          return null;
      }
  }
    /*
    * Function that read .dot file.
    * It recieve file and callback function. 
    * Create reader, define that when file will be loaded the callback function willl be called
    * Define a behaivour when there is error.
    * Read file.
    */
    // const readFileContent = (file, callback) => {
    //   const reader = new FileReader();
    //   reader.onload = e => {
    //     callback(e.target.result);
    //   };
    //   reader.onerror = e => {
    //     message.error('Failed to read file!');
    //   };
    //   reader.readAsText(file);
    // };

    const readFileContent = (file) => {
      return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = e => resolve(e.target.result);
          reader.onerror = e => {
              message.error('Failed to read file: ' + e.target.error.message);
              reject(e);
          };
          reader.readAsText(file);
      });
  };


    // async function createGraphAndFetchResult(strGraph, inputData) {
    //   //console.log("Here")
    //   setOutput("")
      
    async function createGraphAndFetchResult(strGraph, inputData) {
      setOutput("")
      try {
          const parsedGraph = parse(inputData.mode === 'file' ? await readFileContent(inputData.file) : strGraph);
          setInputGraph(parsedGraph);
          
          graphMutation.mutate({
              mode: inputData.mode,
              graphData: inputData.mode === 'file' ? inputData.file : strGraph,
              numColors: inputData.numColors,
              theory: inputData.theory
          });
      } catch (err) {
          setOutput("Failed to process graph!")
          console.error(err)
      }
  }
      
    //   try {
    //     //setNumColors(inputData.numColors)
    //     if (inputData.mode === 'file'){
    //       readFileContent(inputData.file, (content) => {
    //         const parsedGraph = parse(content);
    //         setInputGraph(parsedGraph);
    //       })
    //       await fetchGraph(inputData.mode, inputData.file, inputData.numColors, inputData.theory);
        
    //     } else if (inputData.mode === 'text'){
    //       const parsedGraph = parse(strGraph);
    //       setInputGraph(parsedGraph);
          
    //       await fetchGraph(inputData.mode, strGraph, inputData.numColors, inputData.theory);
    //     }
       

        
    //   } catch (err) {
    //       setOutput("Fail to connect to server!")
    //       console.log(err)
    //   }
      
    // }

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
