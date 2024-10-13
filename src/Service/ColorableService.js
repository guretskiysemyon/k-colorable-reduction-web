
import axios from "axios"

export default class ColorableService {
    static async processGraph(graphData, numColors, theory, solver) {
        try {
            
            //let endpoint = "http://127.0.0.1:8000/graph";
            let endpoint = "https://fastapi-app-z6osi6yl5q-zf.a.run.app/graph";
            let data = {
                graph: graphData,
                k: numColors,
                theory: theory,
                solver: solver
            };
            let headers = { 'Content-Type': 'application/json' };

            const response = await axios.post(endpoint, data, { headers });

            if (response.status !== 200) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            if (!response.data || typeof response.data !== 'object') {
                throw new Error('Unexpected response format');
            }
            
            return response;
        } catch (error) {
            if (error.response) {
                if (error.response.status === 504){
                    throw new Error("Couldn't solve the input in a given time.")
                }
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                if (error.response.data && error.response.data.detail) {
                    // If the server sent a structured error message, use it
                    throw new Error(error.response.data.detail);
                } else if (error.response.data && typeof error.response.data === 'string') {
                    // If the server sent an unstructured error message, use it
                    throw new Error(error.response.data);
                } else {
                    // Fallback to a generic error message with status code
                    throw new Error(`Server error: ${error.response.status}`);
                }
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

