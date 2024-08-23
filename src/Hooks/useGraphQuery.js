// hooks/useGraphQuery.js
import { useQuery, useMutation } from '@tanstack/react-query'
import ColorableService from '../Service/ColorableService'

export function useGraphQuery() {
  const fetchGraph = async ({ mode, graphData, numColors, theory }) => {
    if (mode === "text") {
      return ColorableService.getSolutionString(graphData, numColors, theory)
    } else if (mode === "file") {
      return ColorableService.getSolutionFile(graphData, numColors, theory)
    }
  }

  const mutation = useMutation({
    mutationFn: fetchGraph,
    onSuccess: (data) => {
      // You can handle success here if needed
      console.log('Graph fetched successfully:', data)
    },
    onError: (error) => {
      // Handle error here
      console.error('Error fetching graph:', error)
    }
  })

  return mutation
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