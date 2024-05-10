import React, { useEffect, useRef } from 'react';
import { Network } from 'vis-network';
import { DataSet } from 'vis-data';

const NetworkGraph = ({graphObj, nodeColors,numberColors}) => {
    const networkRef = useRef(null);
    const graphRef = useRef({nodes: null, edges: null})

    
    const colors = generateColors(numberColors)
    function generateColors(numColors) {
        let colors = [];
        for (let i = 0; i < numColors; i++) {
            let hue = i * 360 / numColors;
            colors.push(`hsl(${hue}, 50%, 50%)`);
        }
        return colors;
      } 

    function createGraph (){


        const nodes = new DataSet(
            graphObj.nodes().map(nodeId => {
              const nodeDetails = graphObj._nodes[nodeId]; // Access node details from the _nodes object
          
              return {
                id: nodeId,
                label: nodeDetails.label || nodeId, // Use label from node details or default to nodeId if label is missing
                // title: nodeDetails.title || '', // Optionally, if you need to include titles and they exist in nodeDetails
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
        //   arrows: 'to',
            color: "#2a84de"
        }))
        );
  
        
        // console.log(Array.from(nodes.get()));  // Log nodes to console
        // console.log(Array.from(edges.get()));  // Log edges to console
        return [nodes, edges]
    
        
    };

    useEffect(() => {
        if (!nodeColors || !graphRef.current.nodes) return;
            

        
        const updates = Object.keys(nodeColors).map(key => ({
            id: key,
            color: colors[nodeColors[key]]
        }));
        console.log(updates)
        graphRef.current.nodes.update(updates);  // Efficiently update colors
    }, [nodeColors]);  // Re-run this effect only when nodeColors changes

    useEffect(() => {
        



        const options = {}; // your network options
        if (!graphObj)
            return
        
        const [nodes, edges] = createGraph()

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
