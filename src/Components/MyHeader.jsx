import React from 'react';
import {Layout, Menu} from 'antd';
const {Header} = Layout;



const items1 = ['1', '2', '3'].map((key) => ({
    key,
    label: `nav ${key}`,
  }));

function MyHeader() {
    return ( 
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
     );
}

export default MyHeader;