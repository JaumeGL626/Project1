import { useEffect, useState } from "react";
import { announcementService } from "../services/announcementService";
import Header from "../components/HeaderComponent";
import AnnouncementCard from '../components/AnnouncementCard'
import { CurrentUserContex } from '../context/UserContext';
function MyAnnouncementPage(){
    const[myAnnouncements,setMyAnnouncements]=useState([])
    const [error,setError]=useState("");

    const[isEditing,setIsEditing]=useState(false);
    const [onDelete,setOnDelete]=useState(null);
    const[actualTitle,setActualTitle]=useState("");
    const[actualDescription,setActualDescription]=useState("");
    const[myEditingActualAnnouncement,setMyEditingActualAnnouncement]=useState(null)
    const[popUp,setPopUp]=useState(false);

    useEffect(()=> {
        const fetchAnnouncements = async () => {

                try{
                    const data= await announcementService.getAllMyAnnouncements();
                    setMyAnnouncements(data);
                    setError("");
                } catch (err) {
                        console.error("Error cargant anuncis:", err.message);
                        setError(err.message);
                    }
                };
                fetchAnnouncements();
    },[])

    function handleIsEditing(){
        setIsEditing(!isEditing);
    }

    function handleEdit(announcement){
        setActualTitle(announcement.title);
        setActualDescription(announcement.description);
        setMyEditingActualAnnouncement(announcement);
        setPopUp(true);

    }
    async function handleSetAnnouncement(){
        try{
            
            const announcement = await announcementService.editAnnouncement(myEditingActualAnnouncement.id,actualTitle,actualDescription,myEditingActualAnnouncement.urlPhotos)

            setError("");
            setMyEditingActualAnnouncement(null);
            setPopUp(false);
        }catch(err){
                setError("Error al editar anunci");
        }

    }



    return (<>
                <Header/>
                <h3> Els meus anuncis</h3>
                <button className="buttonEditAnnouncements" onClick={handleIsEditing}> Editar Anuncis</button>
                <div className="announcementBody">
                                    {myAnnouncements.length>0 ? (
                                        myAnnouncements.map((announcement)=>(
                                            <AnnouncementCard key={announcement.id} announcement={announcement} isEditing={isEditing} onEdit={handleEdit} onDelete={onDelete}/>
                                        ))
                                    ):(
                                        <p>No tens cap anunci publicat</p>
                                    )}

                                    {popUp &&(
                                        
                                        <form className='formAnnouncement' onSubmit={handleSetAnnouncement}>
                                            <h3>Editar Anunci</h3>
                                            <label> Nou nom:</label>
                                            <input className='inputAnnouncecmentTittle' type='text' value={actualTitle} onChange={(e) => setActualTitle(e.target.value)}/>
                                            <label> Introduiex la nova descripcio del anunci:</label>
                                            <textarea className=' textAreaAnnouncement'  value={actualDescription} onChange={(e) => setActualDescription(e.target.value)}></textarea>
                                            <div className='buttonFormAnnouncement'>
                                                <button onClick={()=> setPopUp(false)} type='button' >Cancelar </button>
                                                <button  type='submit'>Actualitzar </button>
                                            </div>
                
                                        </form>
                                    )}

                </div>
               

            </>)

}
export default MyAnnouncementPage;