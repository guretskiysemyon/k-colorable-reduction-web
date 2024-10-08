
import React from 'react';
import {Layout, theme } from 'antd';
import InputComponent from './InputComponents';
import OutputComponent from './OutputComponent';



const { Content} = Layout;


function ContentComponent() {

    const {
        token: { colorBgContainer, borderRadiusLG },
      } = theme.useToken();
    
    

    
    return ( 
        <Content className='content-page'>
        <Layout
          className='layout'
          style={{
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            maxWidth: '1400px',  // Adjust this value as needed
            margin: '0 auto',
            padding: '24px',
          }}
        >
          <Content className='content'>
          <InputComponent/>
          <OutputComponent/>
          </Content>
          
        </Layout>
      </Content>
     );
}

export default ContentComponent;