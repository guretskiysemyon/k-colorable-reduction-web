import axios from "axios"

export default class ColorableService {
    static async getSolutionString(strGraph, numColors, theory){
        try {
        const dataToSend = {
            graph: strGraph,
            k: numColors,
            theory: theory
        };
        const response = await axios.post('http://localhost:8000/graph', dataToSend, {
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.status !== 200) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        if (!response.data || typeof response.data !== 'object') {
            throw new Error('Unexpected response format');
        }
        
        return response;  
        } catch (error){
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                throw new Error(`Server error: ${error.response.status} ${error.response.data.message || ''}`);
            } else if (error.request) {
                // The request was made but no response was received
                throw new Error('Network error: No response received from server');
            } else {
                // Something happened in setting up the request that triggered an Error
                throw new Error(`Error: ${error.message}`);
            }
        }     
    }

    static async getSolutionFile(file, numColors, theory ) {
        try {
        const formData = new FormData();
        formData.append('file', file); 
        formData.append('reductionInput', JSON.stringify({ k: numColors, theory: theory }));

        const response = await axios.post('http://localhost:8000/graph/file', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        if (response.status !== 200) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        if (!response.data || typeof response.data !== 'object') {
            throw new Error('Unexpected response format');
        }
        
        return response; 
    } catch (error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            throw new Error(`Server error: ${error.response.status} ${error.response.data.message || ''}`);
        } else if (error.request) {
            // The request was made but no response was received
            throw new Error('Network error: No response received from server');
        } else {
            // Something happened in setting up the request that triggered an Error
            throw new Error(`Error: ${error.message}`);
        }
    }
        
    }

   

}