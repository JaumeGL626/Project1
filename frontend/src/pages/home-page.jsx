import { CircleUser} from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from 'react';
import { CurrentUserContex } from '../components/userContext';
import '../styles/home-page.css'
import AnnouncementCard from '../components/AnnouncementCard'

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


    function handleUserProfile(){
        navigate("/users/profile")
    }
    

    if(loading){
        return<>
               <h3> Loading </h3>
              </> 
    }


    return (
         <>
            <header className="headerHomePage">
                {user?.username ?(
                    <h2> Benvolgut/da {user.username} a la pagina de la UDG</h2>
                ):(
                    <h2> benvolgut/da a la pagina de la UDG</h2>
                )}
                <div className="iconUserCircle">
                    
                    {user?.profilePicture ? (
                        <img 
                            src={user.profilePicture} 
                            alt={`PrilePicture${user.username}`} 
                            onClick={handleUserProfile}
                            className="profilePictureImgHome"
                        />
                    ) : (
                        <CircleUser onClick={handleUserProfile} />
                    )}

                </div>
            </header>
            <nav>
                <ul>
                    <li> Annuncis</li>
                    <li> Forums</li>
                </ul> 
            </nav>
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