import { Italic } from "lucide-react";
import React from "react";

export const ForumCard=({forum, onNameClick = () => {}})=>{
    const{id, name, description, createdByUserId, createdAt}= forum;
    return(
        <div className="cardForum" onClick={() => onNameClick(forum.id)}>
             
            <h3>{name}</h3>
            <div className="forumBody">
                <p> {description}</p>
                <p><i>{createdAt}</i></p>
            </div>
            
        </div>
    )

}