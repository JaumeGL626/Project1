import { apiClient } from '../api/apiClient';

export const authService={
    login: async(email, password)=>{
        return await apiClient("/auth/login",{
                method: "POST",
                body: JSON.stringify({
                    email: email, 
                    password: password
                })
            });
    },
};