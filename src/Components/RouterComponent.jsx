import React from 'react';



import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';

import MyHeader from './MyHeader';
import FooterComponent from './FooterComponent';
import ContentComponent from './ContentComponent';
import AboutComponent from './AboutComponent';



function RouterComponent() {
    return ( 
        <Router basename="/k-colorable-reduction-web">
        <Layout>
          <MyHeader />
          <Routes>
            <Route path="/" element={<ContentComponent />} />
            <Route path="/about" element={<AboutComponent />} />
          </Routes>
          <FooterComponent />
        </Layout>
      </Router>
     );
}

export default RouterComponent;