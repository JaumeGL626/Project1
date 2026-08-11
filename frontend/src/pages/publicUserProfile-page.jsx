import { useEffect, useState } from "react";
import {userService} from "../services/userService"
import { useParams } from "react-router-dom"
import Navigation from "../components/NavigatonComponent";
import { CircleUser} from 'lucide-react'

function PublicUserProfile(){

    const { id } = useParams();
    const[user,setUser]=useState(null);
    const[error,setError]=useState(false);


    useEffect(()=> {
        const fetchPublicUser = async () => {
        try{
            const dataUser= await userService.getPublicProfile(id);
            setUser(dataUser);
            setError("");
        } catch (err) {
                console.error("Error cargant usuari desitjat:", err.message);
                setError(err.message);
            }
        };
        fetchPublicUser();
    },[id]);

    return(
        <>
            <header className="headerPublucUser">
           <h2> Aquest es el perfil de {user?.username}</h2>
            </header>
            <Navigation/>
            <section className="userInfromation">

                    {user && user?.profilePicture ? (
                        <img 
                            src={user.profilePicture} 
                            alt={`PrilePicture${user?.username}`} 
                           
                            className="profilePictureImg"

                        />
                    ) : (
                        <CircleUser size={200} />
                    )}
                            <p className="user-name"><strong> {user?.username}</strong> </p>
                            <p className="user-email"> {user?.email} </p>
                            <p className='user-study'> Grau Estudi:</p>
                            <p className='user-description'>{user?.description} </p>
                            <p className='user-role'>{user?.role} </p>
                        
                        
                    

                </section>
            <div className=" optionsUserToUSer">
                <ul>
                    <li> Invitar a un grup</li>
                    <li> Comernçar xat</li>
                    <li> Invitar a forum </li>
                    <li> Future updates...</li>
                </ul>
            </div>
        </>
    )


}export default PublicUserProfile;