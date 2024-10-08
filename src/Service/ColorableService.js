import axios from "axios"

export default class ColorableService {
    static async processGraph(mode, graphData, numColors, theory, solver) {
        try {
            let endpoint = 'https://fastapi-app-z6osi6yl5q-zf.a.run.app/graph';
            //let endpoint = "http://127.0.0.1:8000/graph";
            let data;
            let headers;

            if (mode === 'text') {
                data = {
                    graph: graphData,
                    k: numColors,
                    theory: theory,
                    solver: solver
                };
                headers = { 'Content-Type': 'application/json' };
            } else if (mode === 'file') {
                endpoint += '/file';
                const formData = new FormData();
                formData.append('file', graphData);
                formData.append('reductionInput', JSON.stringify({ k: numColors, theory: theory , solver: solver}));
                data = formData;
                headers = { 'Content-Type': 'multipart/form-data' };
            } else {
                throw new Error('Invalid mode');
            }

            const response = await axios.post(endpoint, data, { headers });

            if (response.status !== 200) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            if (response.status === 504) {
                throw new Error(`Timeout`);
            }
            
            if (!response.data || typeof response.data !== 'object') {
                throw new Error('Unexpected response format');
            }
            
            return response;
        } catch (error) {
            // console.log('Full error:', error);
            // console.log('Response:', error.response);
            // console.log('Request:', error.request);
            if (error.response) {
                if (error.response.status === 504){
                    throw new Error("Couldn't solve the input in a given time.")
                }
                throw new Error(`Server error: ${error.response.status} ${error.response.data.message || ''}`);
            } else if (error.request) {
                throw new Error('Network error: No response received from server');
            } else {
                throw new Error(`Error: ${error.message}`);
            }
        }
    }


    // static async getSolutionString(strGraph, numColors, theory){
    //     try {
    //     const dataToSend = {
    //         graph: strGraph,
    //         k: numColors,
    //         theory: theory
    //     };
    //     const response = await axios.post('http://localhost:8000/graph', dataToSend, {
    //         headers: { 'Content-Type': 'application/json' }
    //     });
    //     if (response.status !== 200) {
    //         throw new Error(`HTTP error! status: ${response.status}`);
    //     }
        
    //     if (!response.data || typeof response.data !== 'object') {
    //         throw new Error('Unexpected response format');
    //     }
        
    //     return response;  
    //     } catch (error){
    //         if (error.response) {
    //             // The request was made and the server responded with a status code
    //             // that falls out of the range of 2xx
    //             throw new Error(`Server error: ${error.response.status} ${error.response.data.message || ''}`);
    //         } else if (error.request) {
    //             // The request was made but no response was received
    //             throw new Error('Network error: No response received from server');
    //         } else {
    //             // Something happened in setting up the request that triggered an Error
    //             throw new Error(`Error: ${error.message}`);
    //         }
    //     }     
    // }

    // static async getSolutionFile(file, numColors, theory ) {
    //     try {
    //     const formData = new FormData();
    //     formData.append('file', file); 
    //     formData.append('reductionInput', JSON.stringify({ k: numColors, theory: theory }));

    //     const response = await axios.post('http://localhost:8000/graph/file', formData, {
    //         headers: {
    //             'Content-Type': 'multipart/form-data',
    //         },
    //     });
    //     if (response.status !== 200) {
    //         throw new Error(`HTTP error! status: ${response.status}`);
    //     }
        
    //     if (!response.data || typeof response.data !== 'object') {
    //         throw new Error('Unexpected response format');
    //     }
        
    //     return response; 
    // } catch (error) {
    //     if (error.response) {
    //         // The request was made and the server responded with a status code
    //         // that falls out of the range of 2xx
    //         throw new Error(`Server error: ${error.response.status} ${error.response.data.message || ''}`);
    //     } else if (error.request) {
    //         // The request was made but no response was received
    //         throw new Error('Network error: No response received from server');
    //     } else {
    //         // Something happened in setting up the request that triggered an Error
    //         throw new Error(`Error: ${error.message}`);
    //     }
    // }
        
    // }

   

}