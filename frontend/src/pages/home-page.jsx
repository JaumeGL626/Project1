import { useContext, useEffect, useState } from 'react';
import { CurrentUserContex } from '../context/UserContext';
import '../styles/home-page.css'
import AnnouncementCard from '../components/AnnouncementCard'
import Header from '../components/HeaderComponent';
import Navigation from '../components/NavigatonComponent';
import { announcementService } from '../services/announcementService';

function HomePage() {

    const {user,loading} =useContext(CurrentUserContex);
    const [announcement,setAnnouncement]=useState([]);
    const [error,setError]=useState("");
    const [popUpOpen,setPopUpOpen]=useState(false);
    const [title,setTitle]=useState("");
    const [description,setDescription]=useState("");

    

    useEffect(()=> {
        const fetchAnnouncements = async () => {
        try{
            const data= await announcementService.getAllAnnouncements();
            setAnnouncement(data);
            setError("");
        } catch (err) {
                console.error("Error cargant anuncis:", err.message);
                setError(err.message);
            }
        };
        fetchAnnouncements();
    },[]);

    function handleForm(){

    }
    

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
            <button className='popUp' onClick={setPopUpOpen(true)}> Penjar anunci </button>

            {popUpOpen  ? (
                  <form className='formAnnouncement' onSubmit={handleForm}>
                <label> Introdueix el titol del anunci que vols publicar</label>
                <input type='text' value={title}> </input>  
                <label> Introduiex la descripcio del anunci:</label>
                <textarea className=' textAreaAnnouncement' name='description' value={description}></textarea>
                <button onClick={setPopUpOpen(false)}>Publicar </button>
                <button onClick={setPopUpOpen(false)}>Cancelar </button>
            </form>

                
            ) }
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