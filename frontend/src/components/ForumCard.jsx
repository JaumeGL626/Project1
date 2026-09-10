import React from "react";
import '../styles/ForumCardStyle.css'
export const ForumCard=({forum, onNameClick = () => {}, isEditing, editForum=()=>{}})=>{
    const{id, name, description, createdByUserId, createdAt}= forum;
    return(
        <div className="cardForum" onClick={() => onNameClick(forum.id)}>
             
            <h3>{name}</h3>
            <div className="forumBody">
                <p> {description}</p>
                <p><i>{createdAt}</i></p>
            </div>
            {isEditing &&(
                <button onClick={()=>editForum(forum)}> Editar</button>
            )}
            
        </div>
    )

}
export default ForumCard