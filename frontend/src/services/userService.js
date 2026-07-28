import { apiClient } from '../api/apiClient'

export const userService ={
    editOwnProfile: async(username, description)=>{
        return await apiClient("/users/me",{
                     method: "PUT",
                    body: JSON.stringify({
                     username:username, 
                     description:description,
                    })
        
                })
    },
    getOwnProfile:async()=>{
        return await apiClient("/users/me");
    },
    changeProfihePicture: async (imgData)=>{
        return apiClient ("/users/me/profilePicture",{
             method: "PUT",
             body: JSON.stringify({
                profilePicture: imgData.url
            })
        })
    }
};