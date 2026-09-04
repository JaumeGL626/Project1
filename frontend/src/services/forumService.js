import { apiClient } from '../api/apiClient';


export const forumService={
    getAllForums: async ()=>{
        return await apiClient("/forums");
    },

    postForum: async (name, description)=>{
        return await apiClient ("/forums",{
            method: "POST",
            body: JSON.stringify({ 
                    description: description,
                    name:name
                })
        })
    },
    getForumById: async (id) => {
    return await apiClient(`/forums/${id}`);
    }
};