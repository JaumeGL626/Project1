import React from "react";
export const AnnouncementCard =({announcement})=> {
    const {urlPhotos, date, description, owner, ownerprofilePicture,ownerId,title, id}= announcement;

    return(
        <div className="Announcementcard">
            <div className="headerCard">
                <h3>{title}</h3>
                <p> {owner}</p>
                <img src={ownerprofilePicture} />
                
            </div>
            {Array.isArray(urlPhotos) && urlPhotos.length>0 ? (    
                <div className="listImages"> 
                    {urlPhotos.map((photoUrl, index) => (
                        <img key={index} src={photoUrl} alt={title}/>
                    ))}
                </div>               
            
            ) : (
                <p>Foto no disponible </p>
            )}
            <div className="bodyCard">
                <p>{description}</p>
                <p> {date}</p>
            </div>

        </div>
    );

};

export default AnnouncementCard