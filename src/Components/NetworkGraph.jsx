import React, { useState,useEffect, useRef } from 'react';
import { Network } from 'vis-network';
import useStore from '../store';

const NetworkGraph = () => {
    const networkRef = useRef(null);
    const { graphData, coloringGraph } = useStore();
    


      useEffect(() => {
        if (!graphData) return;
    
        const container = networkRef.current;
        const options = {
          nodes: {
              shape: 'circle',
              font: {
                  color: '#ffffff'
              }
          },
          physics: {
              enabled: true,
              barnesHut: {
                  gravitationalConstant: -2000,
                  centralGravity: 0.3,
                  springLength: 95,
                  springConstant: 0.04,
                  damping: 0.09,
                  avoidOverlap: 0.1
              }
          }
      };
    
        const network = new Network(container, graphData, options);
    
    
        return () => {
          if (network) {
            network.destroy();
          }
        };
      }, [graphData, coloringGraph]);


    return <div ref={networkRef} style={{ height: '500px', width: '100%' }} />;
};

export default NetworkGraph;
