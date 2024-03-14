import { useState } from "react";

export const useApiCall = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    
    const makeApiCall = async(apiFunction, ...args) => {
        try{
            setIsLoading(true);
            const response = await apiFunction(...args);
            return response;
        }catch(error){
            setError(error.message);
            throw error; // Re-throw the error to propagate it to the calling code
        }finally{
            setIsLoading(false);
        }
    }
    return {makeApiCall, isLoading, error};
}
