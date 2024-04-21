import React, { useEffect, useRef } from 'react';
import { Network } from 'vis-network';
import { DataSet } from 'vis-data';

const NetworkGraph = ({graphObj}) => {
    const networkRef = useRef(null);

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
        // Nodes and edges data
        // const nodes = new DataSet([
        //     { id: 1, label: 'Node 1' },
        //     { id: 2, label: 'Node 2' },
        //     { id: 3, label: 'Node 3' },
        //     { id: 4, label: 'Node 4' },
        //     { id: 5, label: 'Node 5' }
        // ]);

        // const edges = new DataSet([
        //     { from: 1, to: 3 },
        //     { from: 1, to: 2 },
        //     { from: 2, to: 4 },
        //     { from: 2, to: 5 }
        // ]);

        const options = {}; // your network options
        const [nodes, edges] = createGraph(graphObj)
        const network = new Network(networkRef.current, { nodes, edges }, options);
    }, [graphObj]);

    return <div ref={networkRef} style={{ height: '500px' }} />;
};

export default NetworkGraph;
