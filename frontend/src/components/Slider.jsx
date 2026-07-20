import React, { useState } from "react";

function Slider ({ photos}){
    const [actualPhoto,setActualPhoto]=useState(0)
    const length =photos.length;
    const handleNextPhoto=()=>{
        if(actualPhoto===length-1){
            setActualPhoto(0);
        }
        else{
            setActualPhoto(actualPhoto+1);
        }
    };

    const handlePreviousPhoto=()=>{
        if(actualPhoto===0){
            setActualPhoto(length-1);
        }
        else{
            setActualPhoto(actualPhoto-1);
        }
    };


    if(! Array.isArray(photos) || length === 0){
        return <p> Imatges no disponibles</p>;
    }

    return (
        <div className="styleSlider"> 

            {length>1 &&(
                <button onClick={handlePreviousPhoto}> ← </button>  
            )}
            <img src={photos[actualPhoto]} alt={`Foto ${actualPhoto + 1}`} />

            {length>1 &&(
               <button onClick={handleNextPhoto}> →  </button>  
            )}
            


            


        </div>
        
    )
    

}

export default Slider;