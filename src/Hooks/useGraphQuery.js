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

// function showResult(data){
//     let text = "Formula:\n"
//     for (let value of data.formula) {
//       text += value + "\n"
//     }
//     text += "\n\n"
//     if (!data.result){
//       text += "Not Colorable"
//       return text
//     }
//     text += "Colorable\n"
//     for (const key in data.solution) {
//       if (data.solution.hasOwnProperty(key)) {
//         text += key + ": " + data.solution[key] + "\n";
//       }
//     }
//     return text
// }
function showResult(data) {
  let output = `<div style="font-family: monospace; white-space: pre-wrap;">`;

  // Helper function for colored headers
  const coloredHeader = (text, color) => `<h2 style="color: ${color}; margin-bottom: 5px; border-bottom: 2px solid ${color};">${text}</h2>`;

  // Formula section
  output += coloredHeader("Formula", "#3498db");
  output += data.formula.map(f => `  ${f}`).join('\n');
  output += '\n\n';

  // Result section
  output += coloredHeader("Result", "#3498db");
  output += data.result 
      ? `<span style="color: #2ecc71;">The graph is colorable!</span>`
      : `<span style="color: #e74c3c;">The graph is not colorable.</span>`;
  output += '\n\n';

  // Solution section (only if colorable)
  if (data.result) {
      output += coloredHeader("Solution", "#3498db");
      output += "Node : Color\n";
      output += "------------\n";
      for (const [node, color] of Object.entries(data.solution)) {
          output += `  ${node}   :   ${color}\n`;
      }
  }

  output += "</div>";
  return output;
}