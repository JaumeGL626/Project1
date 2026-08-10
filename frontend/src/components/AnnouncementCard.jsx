import React from "react";
import Slider from "./SliderComponent";
import { CircleUser} from 'lucide-react';
import '../styles/AnnouncementCardStyle.css'
export const AnnouncementCard =({announcement, isEditing, onEdit,onDelete})=> {
    const {urlPhotos, date, description, owner, ownerProfilePicture,ownerId,title, id}= announcement;
    
    return(
        <div className="Announcementcard">
            <div className="headerCard">
                
                <div className=" headerCenter">
                    <h3>{title}</h3>
                </div>
                <div className="headerLeft">
                    <p> {owner}</p>
                    {ownerProfilePicture ? (
                    <img 
                        src={ownerProfilePicture} 
                        alt={`Foto de perfil de ${owner}`} 
                        className="profilePicture"
                    />
                ) : (
                    <CircleUser className="defaultProfileIcon" />
                )}

                </div>
                
                
                
            </div>
            <Slider photos={urlPhotos}/>             
            
            
            <div className="bodyCard">
                <p>{description}</p>
                <small className="datePublication"> {date}</small>

                {isEditing && ( 
                   <div className="optionsAnnoucement">
                        <button onClick={() => onEdit(announcement)}> Editar</button>
                        <button onClick={() => onEdit(announcement.id)}> Eliminar</button>
                    </div>

                )}
            </div>

        </div>
    );

};

export default AnnouncementCard