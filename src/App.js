

import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';

import MyHeader from './Components/MyHeader';
import FooterComponent from './Components/FooterComponent';
import ContentComponent from './Components/ContentComponent';
import AboutComponent from './Components/AboutComponent';


const App = () => {
  return (
    <Router>
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
};

export default App;
