import { create } from 'zustand'

const useStore = create((set) => ({
  graphData: null,
  coloringGraph: { numColors: 3, coloring: null },
  output: "",
  error: null,

  setGraphData: (data) => set({ graphData: data }),
  setColoringGraph: (graph) => set({ coloringGraph: graph }),
  setOutput: (output) => set({ output }),
  setError: (error) => set({ error }),
  clearError: () => set({ error: null }),
}))

export default useStore