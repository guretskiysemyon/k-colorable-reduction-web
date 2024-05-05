import React from 'react';
import {Layout, Menu} from 'antd';
import { Link } from 'react-router-dom';
const {Header} = Layout;



const items1 = [
  { key: 'main', label: <Link to="/">Main</Link> },
  { key: 'about', label: <Link to="/about">About</Link> }
];

function MyHeader() {
    return ( 
        <Header className='header'>
            <div className="demo-logo" />
            <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['main']}
            items={items1}
            className='menu'
        />
      </Header>
     );
}

export default MyHeader;