import { useMutation } from '@tanstack/react-query'
import ColorableService from '../Service/ColorableService'
import useStore from '../store';

export function useGraphQuery() {
  const { setGraphData, setColoringGraph, setOutput, setError, setIsLoading } = useStore();

  return useMutation({
    mutationFn: ({ graphData, numColors, theory, solver }) => 
      ColorableService.processGraph(graphData, numColors, theory, solver),
    onMutate: () => {
      setIsLoading(true);
    },
    onSuccess: (response, variables) => {
      const data = response.data;
      setGraphData(data.graph);
      setColoringGraph({
        numColors: variables.numColors,
        coloring: data.solution
      });
      setOutput(showResult(data));
    },
    onError: (error) => {
      setError(error);
      setOutput(`${error.message}`);
    },
    onSettled: () => {
      setIsLoading(false);
    }
  });
}

function showResult(data){
    let text = "Formula:\n"
    for (let value of data.formula) {
      text += value + "\n"
    }
    text += "\n\n"
    if (!data.result){
      text += "Not Colorable"
      return text
    }
    text += "Colorable\n"
    for (const key in data.solution) {
      if (data.solution.hasOwnProperty(key)) {
        text += key + ": " + data.solution[key] + "\n";
      }
    }
    return text
}




// // hooks/useGraphQuery.js
// import { useQuery, useMutation } from '@tanstack/react-query'
// import ColorableService from '../Service/ColorableService'
// import useStore from '../store';

// export function useGraphQuery() {
//   const { setGraphData, setColoringGraph, setOutput, setError, setIsLoading } = useStore();

//   return useMutation({
//     mutationFn: ({ mode, graphData, numColors, theory, solver }) => 
//       ColorableService.processGraph(mode, graphData, numColors, theory, solver),
//       onMutate: () => {
//         setIsLoading(true); // Set loading to true when the mutation starts
//       },
//     onSuccess: (response, variables) => {
//       const data = response.data;
//       setGraphData(data.graph);
//       setColoringGraph({
//         numColors: variables.numColors,
//         coloring: data.solution
//       });
//       // console.log(data.formula)
//       setOutput(showResult(data));
//     },
//     onError: (error) => {
//       setError(error);
//       setOutput(`${error.message}`);
//     },
//     onSettled: () => {
//       setIsLoading(false); // Set loading to false when the mutation is settled (success or error)
//     }
//   });
// }


// function showResult(data){
//     //console.log(data)
//     let text = "Formula:\n"
//     for (let value of data.formula) {
//       text += value + "\n"
//     }
//     text += "\n\n"
//     //setColorMap(data.solution)
//     if (!data.result){
//       text += "Not Colorable"
//       // setOutput(text)
//       return text
//     }
//     text += "Colorable\n"
//     //console.log(data.solution)
//     for (const key in data.solution) {
//       if (data.solution.hasOwnProperty(key)) {  // This check is necessary to ensure you only access properties defined on the object itself
//         text += key + ": " + data.solution[key] + "\n";
//       }
//     }
//     // text += data.solution
//     // setOutput(text)
//     return text
// }

