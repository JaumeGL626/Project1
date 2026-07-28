import { apiClient } from '../api/apiClient';

export const announcementService = {

    getAllAnnouncements: async () => {
        return await apiClient("/announcements");
    },

    
};