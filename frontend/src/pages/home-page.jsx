import { useContext, useEffect, useState } from 'react';
import { CurrentUserContex } from '../context/UserContext';
import '../styles/home-page.css'
import AnnouncementCard from '../components/AnnouncementCard'
import Header from '../components/HeaderComponent';
import Navigation from '../components/NavigatonComponent';
import { apiClient } from '../api/apiClient';

function HomePage() {

    const {user,loading} =useContext(CurrentUserContex);
    const [announcement,setAnnouncement]=useState([]);
    const [error,setError]=useState("");
    

    useEffect(()=> {
        const fetchAnnouncements = async () => {
        try{
            const data= await apiClient("/announcements");
            setAnnouncement(data);
            setError("");
        } catch (err) {
                console.error("Error cargant anuncis:", err.message);
                setError(err.message);
            }
        };
        fetchAnnouncements();
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