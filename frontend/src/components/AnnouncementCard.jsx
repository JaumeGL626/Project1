import React from "react";
import Slider from "./Slider";

export const AnnouncementCard =({announcement})=> {
    const {urlPhotos, date, description, owner, ownerprofilePicture,ownerId,title, id}= announcement;
    
    return(
        <div className="Announcementcard">
            <div className="headerCard">
                <h3>{title}</h3>
                <p> {owner}</p>
                <img src={ownerprofilePicture} />
                
            </div>
            <Slider photos={urlPhotos}/>             
            
            
            <div className="bodyCard">
                <p>{description}</p>
                <small> {date}</small>
            </div>

        </div>
    );

};

export default AnnouncementCard