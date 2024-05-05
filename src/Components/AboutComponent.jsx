import React from 'react';
import { Typography, Card } from 'antd';

const { Title, Paragraph, Text } = Typography;

const AboutComponent = () => {
  return (
    <div style={{ margin: '20px' }}>
      <Card bordered={false} style={{ backgroundColor: '#fafafa' }}>
        <Title level={2}>About the Graph Coloring Project</Title>
        <Paragraph>
          This project focuses on solving the graph coloring problem, an important problem in the field of computer science and mathematics, particularly applicable in areas such as scheduling, resource allocation, and network coloring. The challenge is to color a graph’s vertices with the minimum number of colors without two adjacent vertices sharing the same color.
        </Paragraph>
        <Title level={4}>Project Objectives</Title>
        <Paragraph>
          The main objectives of this project are to:
          <ul>
            <li>Demonstrate the application of SMT solvers for complex problems.</li>
            <li>Utilize <Text strong>pySMT</Text> to explore different solving strategies and their efficiencies.</li>
            <li>Provide an educational tool for understanding graph coloring and SMT solver capabilities.</li>
          </ul>
        </Paragraph>
        <Title level={4}>Technology Stack</Title>
        <Paragraph>
          This project employs a robust stack of technologies:
          <ul>
            <li><Text strong>pySMT</Text>: A Python library for SMT formulas manipulation and solving, interfacing with multiple SMT solvers.</li>
            <li><Text strong>React</Text>: Used for building the interactive user interface of the application.</li>
            <li><Text strong>antd</Text>: Provides the design framework to build comprehensive interfaces with less effort.</li>
            <li><Text strong>Python Flask</Text>: Serves as the backend, handling the integration with pySMT and solver execution.</li>
          </ul>
        </Paragraph>
        <Paragraph>
          By leveraging these technologies, the project illustrates how modern applications can solve traditional computational problems with significant efficiency and flexibility.
        </Paragraph>
      </Card>
    </div>
  );
};

export default AboutComponent;
