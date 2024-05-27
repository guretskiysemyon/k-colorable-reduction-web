import axios from "axios"

export default class ColorableService {
    static async getSolutionString(strGraph, numColors, theory){
        const dataToSend = {
            graph: strGraph,
            k: numColors,
            theory: theory
        };
        const response = await axios.post('http://localhost:8000/graph', dataToSend, {
            headers: { 'Content-Type': 'application/json' }
        });
        return response;
       
    }

    static async getSolutionFile(file, numColors, theory ) {
        const formData = new FormData();
        formData.append('file', file); 
        formData.append('reductionInput', JSON.stringify({ k: numColors, theory: theory }));

        const response = await axios.post('http://localhost:8000/graph/file', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return response;
    }

   

}