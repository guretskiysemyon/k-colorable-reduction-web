// hooks/useFetchGraph.js
import { useState } from 'react';

function useFetching() {
    const [fetchedData, setFetchedData] = useState(null);
    const [error, setError] = useState(null);

    const fetchGraph = async (strGraph, numColors, theory) => {
        setError(null)
        setFetchedData(null)
        const dataToSend = {
            graph: strGraph,
            k: numColors,
            theory: theory
        };

        try {
            const response = await fetch('http://localhost:8000/graph', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dataToSend)
            });
            const data = await response.json();
            setFetchedData(data);
        } catch (error) {
            console.error('Fetch error:', error);
            setError(error);
        }
    };

    return { fetchedData, error, fetchGraph };
}

export default useFetching;
