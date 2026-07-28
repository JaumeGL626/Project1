import { apiClient } from "../api/apiClient";

export const imageService={
    uploadImage:async(formData)=>{
        return await apiClient("/images/upload",{

        method: "POST",
        body: formData
        })
    }
};