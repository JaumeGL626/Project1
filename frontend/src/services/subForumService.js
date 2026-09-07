import { apiClient } from '../api/apiClient';


export const subForumService={

    getAllSubForumsbyForum: async(id)=> {
        return await apiClient(`/subForums/forum/${id}`);

    },
    editSubForum: async (idForum, idSubForum, name, description)=> {
        return await apiClient(`/subForums/forums/${idForum}/${idSubForum}`,{
            method:"PUT",
            body: JSON.stringify({ 
                    name:name,
                    description: description,
                    idForum: idForum
                })
        })
    },

    postSubForum: async (forumId, name, description)=>{
        return await apiClient(`/subForums/forums/${forumId}`,{
            method:"POST",
            body: JSON.stringify({ 
                    name:name,
                    description: description,
                    idForum: forumId
                })
        })
    }




};