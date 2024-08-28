
import React, { useState, useContext} from 'react';
import {Layout, theme } from 'antd';
import InputComponent from './InputComponents';
import OutputComponent from './OutputComponent';
import { ErrorContext } from '../App'; // Adjust the import path as necessary
import useStore from '../store';

const { Content} = Layout;


function ContentComponent() {

    const {
        token: { colorBgContainer, borderRadiusLG },
      } = theme.useToken();
    
    
    
      const { inputGraph, coloringGraph, output, error } = useStore();

    
    // const [inputGraph, setInputGraph] = useState(null)

    // // const [numColors, setNumColors] = useState(3)
    // const [coloringGraph, setColoringGraph] = useState({
    //   numColors: 3,
    //   coloring : null
    // })
    // const [output, setOutput] = useState("")
    // // Use the error context instead of useFetching
    // const { error } = useContext(ErrorContext);
    
    
    
    
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
          <InputComponent/>
          <OutputComponent
            outputText={output}
            error={error}
            coloringGraph={coloringGraph}
            inputGraph={inputGraph}
          />
          </Content>
          
        </Layout>
      </Content>
     );
}

export default ContentComponent;