import React from 'react';
import {Layout, Menu} from 'antd';
import { Link } from 'react-router-dom';
const {Header} = Layout;



const items = [
  { key: 'main', label: <Link to="/k-colorable-reduction-web/">Main</Link> },
  { key: 'about', label: <Link to="/k-colorable-reduction-web/about">About</Link> }
];

function MyHeader() {
    return ( 
        <Header className='header'>
            <div className="demo-logo" />
            <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['main']}
            items={items}
            className='menu'
        />
      </Header>
     );
}

export default MyHeader;