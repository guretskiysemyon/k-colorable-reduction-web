import React, { useState,useEffect, useRef } from 'react';
import { Network } from 'vis-network';
import { DataSet } from 'vis-data';

const NetworkGraph = ({graphObj, coloringGraph}) => {
    const networkRef = useRef(null);
    const graphRef = useRef({nodes: null, edges: null})
    const [graphFinished, setGraphFinished] = useState(false)
    
    
    // Function that generates colors.
    function generateColors(numColors) {
        const colors = [];
        for (let i = 0; i < numColors; i++) {
            let hue = i * 360 / numColors;
            colors.push(`hsl(${hue}, 50%, 50%)`);
        }
        return colors;
      } 

    

    function createGraph (){
        setGraphFinished(false)
        
        
        
        const nodes = new DataSet(
            graphObj.nodes().map(nodeId => {
              const nodeDetails = graphObj._nodes[nodeId]; // Access node details from the _nodes object
          
              return {
                id: nodeId,
                label: nodeDetails.label || nodeId, // Use label from node details or default to nodeId if label is missing
                font: {
                  color: '#ffffff' // Set the font color to white
                }
              };
            })
          );
  
        const edges = new DataSet(
        graphObj.edges().map(edge => ({
            from: edge.v,
            to: edge.w,
            color: "#2a84de"
        }))
        );
  
        
   
        return [nodes, edges]
    
        
    };

    useEffect(() => {
        
        if (!coloringGraph.coloring || !graphFinished || !graphRef.current.nodes) return;
         
        
        const colors = generateColors(coloringGraph.numColors)
        
        const updates = Object.keys(coloringGraph.coloring).map(key => ({
            id: key,
            color: colors[coloringGraph.coloring[key]]
        }));
        
        graphRef.current.nodes.update(updates);  // Efficiently update colors
    }, [coloringGraph, graphFinished]);  // Re-run this effect only when nodeColors changes

    useEffect(() => {
        



        const options = {}; // your network options
        if (!graphObj)
            return
        
        const [nodes, edges] = createGraph()

        graphRef.current= {
            nodes: nodes,
            edges: edges
        };
        console.log(graphObj)
        const network = new Network(networkRef.current, graphRef.current, options);
        setGraphFinished(true)
        // console.log(nodesRef.current)
        // console.log(edgesRef.current)
        return () => {
            if (network) {
              network.destroy();
            }
            setGraphFinished(false);
          };
    }, [graphObj]);

    return <div ref={networkRef} style={{ height: '500px' }} />;
};

export default NetworkGraph;
