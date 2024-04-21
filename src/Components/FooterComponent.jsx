import React from "react";

import {Layout} from 'antd';
const {Footer} = Layout;

function FooterComponent() {
  return (
    <Footer className="footer">
      Ant Design ©{new Date().getFullYear()} Created by Ant UED
    </Footer>
  );
}

export default FooterComponent;
