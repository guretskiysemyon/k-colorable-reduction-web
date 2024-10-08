import React from 'react';
import { Typography, Card } from 'antd';

const { Title, Paragraph } = Typography;

const AboutComponent = () => {
  return (
    <div style={{ margin: '20px' }}>
      <Card bordered={false} style={{ backgroundColor: '#fafafa' }}>
        <Title level={2}>About the Project</Title>
        <Paragraph>
          This project is based on the method described in "Colors Make Theories Hard" by Roberto Sebastiani 
          <a href='https://www.researchgate.net/publication/303912889_Colors_Make_Theories_Hard'>[1]</a>, 
          specifically on proving NP-hardness in various theories such as arithmetic and arrays through satisfiability problems. 
          The article introduces reductions from the k-color graph problem to satisfiability problems in certain theories, providing 
          various algorithms for graph coloring challenges using these reductions. Our work implements these reductions using PySMT 
          and CVC solvers, allowing us to solve the k-colorability problem in this manner.
        </Paragraph>
        
        <Title level={2}>How to Use</Title>
        <Paragraph>
          <div>
            <h3>Graph Input</h3>
            There are 2 options:
            <ul>
              <li>Enter input as text</li>
              <li>Upload a file (maximum file size is 4KB)</li>
            </ul>
            Note: The graph should be undirected.
          </div>

          <div>
            <h3>Solvers</h3>
            The available solvers are Z3, CVC5, Yices, and Boolector (BTOR). You can choose one from the list.
          </div>

          <div>
            <h3>Theories</h3>
            After choosing a solver, you can select a theory implemented by the solver. The available theories are:
            <ul>
              <li>LIA - Linear Integer Arithmetic</li>
              <li>NLA - Non-Linear Arithmetic</li>
              <li>BV - Bit Vectors</li>
              <li>A - Array Theory
                <ul>
                  <li>AUF - Array theory with Uninterpreted Functions: Arrays where elements and indexes have an uninterpreted type (custom type)</li>
                  <li>AINT - Array theory with Integers: Arrays where elements and indexes are of integer type</li>
                  <li>ABV - Array theory with Bit Vectors: Arrays where elements and indexes are of BV type</li>
                </ul>
              </li>
              <li>S - Sets Theory
                <ul>
                  <li>SUF - Set theory with Uninterpreted Functions</li>
                  <li>SINT - Set theory with Integers: Sets where elements are of integer type</li>
                  <li>SBV - Set theory with Bit Vectors: Sets where elements are of BV type</li>
                </ul>
              </li>
            </ul>
          </div>

          <div>
            <h3>Number of Colors</h3>
            This represents the number of colors to color the graph's nodes.
            Note:
            <ul>
              <li>The minimum number is 3</li>
              <li>For Bit Vectors (BV) and all Set theories, the number of colors must be a power of 2. An explanation can be found in the article.</li>
            </ul>
          </div>

          <div>
            <h3>Output</h3>
            Once the input is submitted, a reduction formula will be created, and the system will attempt to solve it. 
            Since some instances cannot be solved efficiently, there is a 10-second time limit for computation.
            If the input is solved, the reduction formula and the solution will be returned.
            If the graph is k-colorable, the assignments for the vertices (encoded as integers) will be provided; otherwise, 
            "Not Colorable" will be displayed.
            Additionally, a graph visualization will be created. If the graph is k-colorable, the vertices will be colored; 
            otherwise, all vertices will be displayed with the same color.
            Note that graph rendering may take some time.
          </div>
        </Paragraph>
        
        <Title level={2}>Additional Information</Title>
        <Paragraph>
          The code for the reduction, along with the results of tests we conducted on benchmarks, can be found in the { }
           <a href="https://github.com/guretskiysemyon/k-coloringReduction">project's repository</a>. Feel free to explore and experiment with it.
        </Paragraph>
      </Card>
    </div>
  );
};

export default AboutComponent;
