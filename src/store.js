import { create } from 'zustand'

const useStore = create((set) => ({
  graphData: null,
  coloringGraph: { numColors: 3, coloring: null },
  output: "",
  error: null,
  isLoading: false,
  strInputGraph: `// Please enter an undirected graph in .dot format here.

graph {
    // You can modify it as you want.
    1 -- 2;
    1 -- 3;
    2 -- 3;
}`,

  setGraphData: (data) => set({ graphData: data }),
  setColoringGraph: (graph) => set({ coloringGraph: graph }),
  setOutput: (output) => set({ output }),
  setError: (error) => set({ error }),
  clearError: () => set({ error: null }),
  setIsLoading: (loading) => set({ isLoading: loading }),
  setStrInputGraph: (graph) => set({ strInputGraph: graph }),
}))

export default useStore