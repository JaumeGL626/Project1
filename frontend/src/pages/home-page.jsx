import { CircleUser} from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from 'react';
import { CurrentUserContex } from '../components/userContext';
import '../styles/home-page.css'
import AnnouncementCard from '../components/AnnouncementCard'
import Header from '../components/HeaderComponent';
import Navigation from '../components/NavigatonComponent';
function HomePage() {

    const {user,loading} =useContext(CurrentUserContex);
    const navigate = useNavigate();
    const [announcement,setAnnouncement]=useState("");
    const [error,setError]=useState([]);
    

    useEffect(()=> {
        fetch("http://localhost:8080/api/announcements")
        .then(response=> {
            if(! response.ok){
                throw new Error("Error al cargar anuncis");
            }
            setError("");
            return response.json();
        })
        .then(resposne=>{
            setAnnouncement(resposne);
            
        })
        .catch(error=>{setError(error.message)})
        ;
    },[]);
    

    if(loading){
        return<>
               <h3> Loading </h3>
              </> 
    }

    return (
         <>
            <Header/>
            <Navigation/>
            {error && <p className="errorMessage">{error}</p>}
            <div className="announcementBody">
                    {announcement.length>0 ? (
                        announcement.map((announcement)=>(
                            <AnnouncementCard key={announcement.id} announcement={announcement} />
                        ))
                    ):(
                        <p>No hi han anuncis publicats</p>
                    )}
            </div>
        </>
    )
}

export default HomePage;