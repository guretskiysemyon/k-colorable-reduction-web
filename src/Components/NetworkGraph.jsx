import React, { useState,useEffect, useRef } from 'react';
import { Network } from 'vis-network';
import useStore from '../store';
import { Spin } from 'antd';


const NetworkGraph = ({isLoadingData}) => {
    const networkRef = useRef(null);
    const { graphData, coloringGraph } = useStore();
    const [isNetworkInitializing, setIsNetworkInitializing] = useState(false);


      useEffect(() => {
        if (!graphData) return;
    
		setIsNetworkInitializing(true);
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
		network.on('stabilizationIterationsDone', () => {
			setIsNetworkInitializing(false);
		  });
    
        return () => {
          if (network) {
            network.destroy();
          }
        };
      }, [graphData, coloringGraph]);


	return (
		<div style={{ position: 'relative', height: '800px', width: '100%' }}>
		  <div ref={networkRef} style={{ height: '100%', width: '100%' }} />
		  {(isLoadingData || isNetworkInitializing) && (
			<div
			  style={{
				position: 'absolute',
				top: 0,
				left: 0,
				right: 0,
				bottom: 0,
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				backgroundColor: 'rgba(255, 255, 255, 0.7)',
				zIndex: 1,
			  }}
			>
			  <Spin size="large" tip="Loading graph..." />
			</div>
		  )}
		</div>
	  );
};


export default NetworkGraph;
