import React, { useState, useEffect } from 'react';
import { Col, Row } from 'antd';
import MyEditor from './Editor';
import ParametersForm from './ParametersForm';
import { useGraphQuery } from '../Hooks/useGraphQuery';
import useStore from '../store';

function InputComponent() {
    const defaultValue = 3;
    const [inputData, setInputData] = useState({
        numColors: defaultValue,
        solver: undefined,
        theory: undefined,
    });

    const { 
        setColoringGraph, 
        setOutput, 
        setError, 
        strInputGraph 
    } = useStore();
    
    const graphMutation = useGraphQuery();

    useEffect(() => {
        let condition = inputData.theory && inputData.solver && strInputGraph;
        
        if (condition) {
            setError("");
            createGraphAndFetchResult(strInputGraph, inputData);
        }
    }, [inputData]);

    useEffect(() => {
      if (graphMutation.isSuccess) {
          const data = graphMutation.data.data;
          setColoringGraph({
              numColors: inputData.numColors,
              coloring: data.solution
          });
      }
      if (graphMutation.isError) {
          setOutput(`Error: ${graphMutation.error.message}`);
      }
    }, [graphMutation.isSuccess, graphMutation.isError]);

    async function createGraphAndFetchResult(strGraph, inputData) {
      setOutput("");
      try {
          graphMutation.mutate({
              graphData: strGraph,
              numColors: inputData.numColors,
              theory: inputData.theory,
              solver: inputData.solver
          });
      } catch (err) {
          setOutput("Failed to process graph!");
          console.error(err);
      }
    }
      
    return (  
        <Row>
            <Col 
              className="column"
              span={16}>
                <MyEditor />
            </Col>
            <Col 
              className="column_small"
              span={8}>
                <ParametersForm setData={setInputData} />
            </Col>
        </Row>
    );
}

export default InputComponent;