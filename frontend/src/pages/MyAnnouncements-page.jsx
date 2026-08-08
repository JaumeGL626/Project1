import { useEffect, useState } from "react";
import { announcementService } from "../services/announcementService";
import Header from "../components/HeaderComponent";
import AnnouncementCard from '../components/AnnouncementCard'
import { CurrentUserContex } from '../context/UserContext';
function MyAnnouncementPage(){
    const[myAnnouncements,setMyAnnouncements]=useState([])
    const [error,setError]=useState("");

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

    return (<>
                <Header/>
                <h3> Mis publicaciones</h3>
                <button className="buttonEditAnnouncements"> Editar Anuncis</button>
                <div className="announcementBody">
                                    {myAnnouncements.length>0 ? (
                                        myAnnouncements.map((announcement)=>(
                                            <AnnouncementCard key={announcement.id} announcement={announcement} />
                                        ))
                                    ):(
                                        <p>No tens cap anunci publicat</p>
                                    )}
                            </div>

            </>)

}
export default MyAnnouncementPage;