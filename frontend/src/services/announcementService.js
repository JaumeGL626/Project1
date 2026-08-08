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

    
};