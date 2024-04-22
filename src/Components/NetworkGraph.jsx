import React, { useEffect, useRef } from 'react';
import { Network } from 'vis-network';
import { DataSet } from 'vis-data';

const NetworkGraph = ({graphObj}) => {
    const networkRef = useRef(null);
    const graphRef = useRef({})
    // const nodesRef = useRef(null);  // Using ref to persist dataset
    // const edgesRef = useRef(null);
    

    function generateColors(numColors) {
        let colors = [];
        for (let i = 0; i < numColors; i++) {
            let hue = i * 360 / numColors;
            colors.push(`hsl(${hue}, 100%, 50%)`);
        }
        return colors;
      } 

    function createGraph (graph){
        const nodes = new DataSet([]);
        const edges = new DataSet([]);
        const dict_nodes = {}
        let i = 0
        Object.keys(graph).forEach( key =>{
            nodes.add({id: i, label: key})
            dict_nodes[key] = i
            i += 1;
        })
        // console.log(dict_nodes)
        Object.entries(graph).forEach(([key, values]) => {
            values.forEach(neighbor => {
                let v1 = dict_nodes[key]
                let v2 = dict_nodes[neighbor]
                if (v1 < v2)
                    edges.add({from: v1 , to: v2})
                //edges.add({ from: , to: parseInt(value) });
            });
        });
        

        // console.log(Array.from(nodes.get()));  // Log nodes to console
        // console.log(Array.from(edges.get()));  // Log edges to console
        return [nodes, edges]
    
        
    };

    

    useEffect(() => {
        const options = {}; // your network options
        const [nodes, edges] = createGraph(graphObj)
        graphRef.current= {
            nodes: nodes,
            edges: edges
        };
        const network = new Network(networkRef.current, graphRef.current, options);
        // console.log(nodesRef.current)
        // console.log(edgesRef.current)
        return () => {
            if (network) {
              network.destroy();
            }
          };
    }, [graphObj]);

    return <div ref={networkRef} style={{ height: '500px' }} />;
};

export default NetworkGraph;
