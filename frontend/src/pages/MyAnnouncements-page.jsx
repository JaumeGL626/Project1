import { useEffect, useState } from "react";
import { announcementService } from "../services/announcementService";
import Header from "../components/HeaderComponent";
import AnnouncementCard from '../components/AnnouncementCard'
import { CurrentUserContex } from '../context/UserContext';
function MyAnnouncementPage(){
    const[myAnnouncements,setMyAnnouncements]=useState([])
    const [error,setError]=useState("");
    const[onEdit, setOnEdit]=useState(false);
    const[isEditing,setIsEditing]=useState(false);
    const [onDelete,setOnDelete]=useState(false);

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

    return (<>
                <Header/>
                <h3> Mis publicaciones</h3>
                <button className="buttonEditAnnouncements" onClick={handleIsEditing}> Editar Anuncis</button>
                <div className="announcementBody">
                                    {myAnnouncements.length>0 ? (
                                        myAnnouncements.map((announcement)=>(
                                            <AnnouncementCard key={announcement.id} announcement={announcement} isEditing={isEditing} onEdit={onEdit} onDelete={onDelete}/>
                                        ))
                                    ):(
                                        <p>No tens cap anunci publicat</p>
                                    )}
                            </div>

            </>)

}
export default MyAnnouncementPage;