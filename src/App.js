import './App.css'
import React, { useState } from 'react';
import { Col, Row } from 'antd';


import {Layout, Menu, theme } from 'antd';
import MyEditor from './Components/Editor';
import ParametersForm from './Components/ParametersForm';
import NetworkGraph from './Components/NetworkGraph';
const { Header, Content, Footer} = Layout;


const items1 = ['1', '2', '3'].map((key) => ({
  key,
  label: `nav ${key}`,
}));


const App = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();


  const [inputGraph, setInputGraph] = useState({})
  const [strInputGraph, setStrInputGraph] = useState("")

  function createGraphObj() {
    if (strInputGraph){
      setInputGraph(JSON.parse(strInputGraph))
      console.log(JSON.parse(strInputGraph))
    }
  }

  

  return (
    <Layout>
      <Header className='header'>
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          items={items1}
          className='menu'
        />
      </Header>
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
            <MyEditor/>
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
      <Footer className='footer'>
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>
  );
};
export default App;