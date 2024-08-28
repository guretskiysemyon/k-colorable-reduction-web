// hooks/useGraphQuery.js
import { useQuery, useMutation } from '@tanstack/react-query'
import ColorableService from '../Service/ColorableService'
import useStore from '../store';

export function useGraphQuery() {
  const { setGraphData, setColoringGraph, setOutput, setError } = useStore();

  return useMutation({
    mutationFn: ({ mode, graphData, numColors, theory }) => 
      ColorableService.processGraph(mode, graphData, numColors, theory),
    onSuccess: (response, variables) => {
      const data = response.data;
      setGraphData(data.graph);
      setColoringGraph({
        numColors: variables.numColors, // Use the original numColors
        coloring: data.solution
      });
      setOutput(data.formula);
    },
    onError: (error) => {
      setError(error);
      setOutput(`Error: ${error.message}`);
    }
  });
}



// // hooks/useFetchGraph.js
// import { useState } from 'react';
// import ColorableService from '../Service/ColorableService';

// function useFetching() {
//     const [fetchedData, setFetchedData] = useState(null);
//     const [error, setError] = useState(null);

//     const fetchGraph = async (mode, graphData, numColors, theory) => {
//         setError(null)
//         setFetchedData(null)

//         try {
//             // const response = await fetch('http://localhost:8000/graph', {
//             //     method: 'POST',
//             //     headers: { 'Content-Type': 'application/json' },
//             //     body: JSON.stringify(dataToSend)
//             // });
//             // const data = await response.json();
//             var response;
//             if (mode === "text"){
//                 response = await ColorableService.getSolutionString(graphData, numColors, theory)
//             } else if (mode === "file") {
//                 response = await ColorableService.getSolutionFile(graphData, numColors, theory)
//             }
            
            
            
//             console.log(response.data)
//             setFetchedData(response.data);
//         } catch (error) {
//             console.error('Fetch error:', error);
//             setError(error);
//         }
//     };

//     return { fetchedData, error, fetchGraph };
// }

// export default useFetching;



// import { useState } from "react"

// export const useFetching =  (callback) => {
//     const [isLoading, setIsLoading] = useState(false);
//     const [error, setError] = useState('')
//     const fetching = async (...args) => {
//         try {
//             setIsLoading(true);
//             await callback(...args);
//         } catch (e) {
//             setError(e.message);
//         } finally {
//             setIsLoading(false);
//         }
//     }

//     return [fetching, isLoading, error]
//}