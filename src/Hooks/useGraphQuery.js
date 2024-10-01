// hooks/useGraphQuery.js
import { useQuery, useMutation } from '@tanstack/react-query'
import ColorableService from '../Service/ColorableService'
import useStore from '../store';

export function useGraphQuery() {
  const { setGraphData, setColoringGraph, setOutput, setError, setIsLoading } = useStore();

  return useMutation({
    mutationFn: ({ mode, graphData, numColors, theory, solver }) => 
      ColorableService.processGraph(mode, graphData, numColors, theory, solver),
      onMutate: () => {
        setIsLoading(true); // Set loading to true when the mutation starts
      },
    onSuccess: (response, variables) => {
      const data = response.data;
      setGraphData(data.graph);
      setColoringGraph({
        numColors: variables.numColors,
        coloring: data.solution
      });
      // console.log(data.formula)
      setOutput(showResult(data));
    },
    onError: (error) => {
      setError(error);
      setOutput(`Error: ${error.message}`);
    },
    onSettled: () => {
      setIsLoading(false); // Set loading to false when the mutation is settled (success or error)
    }
  });
}


function showResult(data){
    //console.log(data)
    let text = "Formula:\n"
    for (let value of data.formula) {
      text += value + "\n"
    }
    text += "\n\n"
    //setColorMap(data.solution)
    if (!data.result){
      text += "Not Colorable"
      // setOutput(text)
      return text
    }
    text += "Colorable\n"
    //console.log(data.solution)
    for (const key in data.solution) {
      if (data.solution.hasOwnProperty(key)) {  // This check is necessary to ensure you only access properties defined on the object itself
        text += key + ": " + data.solution[key] + "\n";
      }
    }
    // text += data.solution
    // setOutput(text)
    return text
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