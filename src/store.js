import { create } from 'zustand'

const useStore = create((set) => ({
  graphData: null,
  coloringGraph: { numColors: 3, coloring: null },
  output: "",
  error: null,
  isLoading: false,

  setGraphData: (data) => set({ graphData: data }),
  setColoringGraph: (graph) => set({ coloringGraph: graph }),
  setOutput: (output) => set({ output }),
  setError: (error) => set({ error }),
  clearError: () => set({ error: null }),
  setIsLoading: (loading) => set({ isLoading: loading }), // Add this line
}))

export default useStore