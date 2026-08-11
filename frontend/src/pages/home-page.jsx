import { useContext, useEffect, useState } from 'react';
import { CurrentUserContex } from '../context/UserContext';
import '../styles/home-page.css'
import AnnouncementCard from '../components/AnnouncementCard'
import Header from '../components/HeaderComponent';
import Navigation from '../components/NavigatonComponent';
import { announcementService } from '../services/announcementService';
import { imageService } from '../services/imageService';
import { useNavigate } from 'react-router-dom';

function HomePage() {

    const {user,loading} =useContext(CurrentUserContex);
    const [announcement,setAnnouncement]=useState([]);
    const [error,setError]=useState("");
    const [popUpOpen,setPopUpOpen]=useState(false);
    const [title,setTitle]=useState("");
    const [description,setDescription]=useState("");
    const [selectedFiles, setSelectedFiles] = useState([]);
    const[onEdit, setOnEdit]=useState("");
    const[isEditing,setIsEditing]=useState(false);
    const [onDelete,setOnDelete]=useState("");
    const navigate = useNavigate();
    

    

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
    function handleTitle(e){
        setTitle(e.target.value);
    }
    function handleDescription(e){
        setDescription(e.target.value);
    }


   async function handleForm(e) {
    e.preventDefault();

    try {
     
        const uploadPromises = selectedFiles.map(async (file) => {
            const formData = new FormData();
            formData.append("file", file);

            const imgData = await imageService.uploadImage(formData);

            return typeof imgData === "object" ? (imgData.url || imgData.imageUrl) : imgData;
        });


        const photoUrls = await Promise.all(uploadPromises);

        const newAnnouncement = await announcementService.postAnnouncement(title, description, photoUrls);

      
        setAnnouncement([newAnnouncement, ...announcement]);
        setDescription("");
        setTitle("");
        setError("");
        setPopUpOpen(false);
        setSelectedFiles([]);
    } catch (error) {
        console.error("Error al publicar", error);
        setError("Error al publicar anunci");
    }

        
    }
    function handlePhotosAnnouncement(e) {
        if (e.target.files) {
            setSelectedFiles(Array.from(e.target.files));
        }
    }

    function handleUserPublicProfile(ownerId){
        navigate(`/users/public/${ownerId}`);
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
            <button className='popUp' onClick={()=> setPopUpOpen(true)}> Penjar anunci </button>

            {popUpOpen  && (
                <form className='formAnnouncement' onSubmit={handleForm}>
                    <h3>Publicar Anunci</h3>
                    <label> Introdueix el titol del anunci que vols publicar:</label>
                    <input className='inputAnnouncecmentTittle' type='text' value={title} onChange={handleTitle}/>
                    <label> Introduiex la descripcio del anunci:</label>
                    <textarea className=' textAreaAnnouncement' name='description' value={description} onChange={handleDescription}></textarea>
                    <input className="photosAnnounccement" type="file"  onChange={handlePhotosAnnouncement} accept="image/*" multiple/>
                        <div className='buttonFormAnnouncement'>
                            <button onClick={()=> setPopUpOpen(false)} type='button' >Cancelar </button>
                            <button  type='submit'>Publicar </button>
                    
                        </div>
                
                </form>

                
            ) }
            <div className="announcementBody">
                    {announcement.length>0 ? (
                        announcement.map((announcement)=>(
                            <AnnouncementCard key={announcement.id} announcement={announcement} isEditing={isEditing} onEdit={onEdit} onDelete={onDelete} onProfileClick={handleUserPublicProfile}/>
                        ))
                    ):(
                        <p>No hi han anuncis publicats</p>
                    )}
            </div>
        </>
    )
}

export default HomePage;