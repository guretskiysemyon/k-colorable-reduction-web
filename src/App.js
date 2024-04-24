import './App.css'
import React from 'react';


import {Layout} from 'antd';

import MyHeader from './Components/MyHeader';
import FooterComponent from './Components/FooterComponent';
import ContentComponent from './Components/ContentComponent';







const App = () => {



  return (
    <Layout>
      <MyHeader/>
      <ContentComponent/>
      <FooterComponent/>
    </Layout>
  );
};
export default App;