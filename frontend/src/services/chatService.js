import { apiClient } from '../api/apiClient';


export const chatService={

    postNormalChat:async(name,description, participantIds, chatType, subForumId)=> {
        return await apiClient("/chats",{
            method: "POST",
            body: JSON.stringify({ 
                    name: name,
                    description: description,
                    participantIds: participantIds,
                    chatType: chatType,
                    idSubForum: subForumId
                })   
        })
    },


    getAllMyChats:async()=> {
            return await apiClient("/chats/me");
    },

    getAllChatsBySubForumId:async(subforumId)=>{
        return await apiClient(`/chats/subforum/${subforumId}`)
    },

    postSubForumChat:async(forumId, subForumId, name, description, participantIds, chatType)=>{
        return await apiClient(`/chats/forum/${forumId}/subforum/${subForumId}`,{
            method:"POST",
            body: JSON.stringify({ 
                    name: name,
                    description: description,
                    participantIds: participantIds,
                    chatType: chatType,
                    subForumId: subForumId
                })   
        })
    }
};
