import { apiClient } from '../api/apiClient';

export const announcementService = {

    getAllAnnouncements: async () => {
        return await apiClient("/announcements");
    },

    postAnnouncement: async (title, description, photos) => {
        return await apiClient ("/announcements",{
            method: "POST",
            body: JSON.stringify({
                    title: title, 
                    description: description,
                    urlPhotos:photos
                })
        })

        
    },

    getAllMyAnnouncements: async () => {
        return await apiClient("/announcements/my");
    },

    deleteAnnouncement: async (id)=> {
        return await apiClient(`/announcements/${id}`,{
            method: "DELETE",
        })
    },
    editAnnouncement: async (id, title, description, photos) => {
        return await apiClient(`/announcements/${id}`, {
            method: "PUT",
            body: JSON.stringify({
                title: title, 
                description: description,
                urlPhotos: photos
            })
        })
    }


    
};