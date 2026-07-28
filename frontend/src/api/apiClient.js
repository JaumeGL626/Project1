const BASE_URL="http://localhost:8080/api";



export async function apiClient(endpoint, options={}) {
    const token=localStorage.getItem("token");
    const headers={...options.headers };

    if(token){
        headers["Authorization"]= `Bearer ${token}`;

    }
    if(options.body && !(options.body instanceof FormData)){
        headers["Content-Type"]= "application/json";
    }
    const config={
        ...options,
        headers
    };

    const response = await fetch (`${BASE_URL}${endpoint}`,config);
    if (!response.ok) {
        let errorMessage = `Error HTTP ${response.status}`;
        try {
            const errorData = await response.json();
            errorMessage = errorData.message || errorMessage;
        } catch {
            const textError = await response.text();
            if (textError) errorMessage = textError;
        }
        throw new Error(errorMessage);
    }

    if (response.status === 204) return {};
    
    return await response.json();

}