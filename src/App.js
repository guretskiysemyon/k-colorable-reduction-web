

import './App.css';
import React from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useGlobalError } from './Hooks/useGlobalError';
import RouterComponent from './Components/RouterComponent';


// const queryClient = new QueryClient()



// export const ErrorContext = React.createContext(null);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      onError: (error) => {
        // You can handle global query errors here
        console.error('Query error:', error);
      },
    },
    mutations: {
      onError: (error) => {
        // You can handle global mutation errors here
        console.error('Mutation error:', error);
      },
    },
  },
});

const App = () => {
  const errorState = useGlobalError();
  return (
   
    <QueryClientProvider client={queryClient}>
      <RouterComponent/>
    </QueryClientProvider>
   
  );
};

export default App;
