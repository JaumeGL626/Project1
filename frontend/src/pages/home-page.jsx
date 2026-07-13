import { CircleUser} from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import '../styles/home-page.css'

function HomePage() {

    const navigate = useNavigate();
    const [user,setUser]=useState("");
    const [error, setError]=useState("");


    function handleUserProfile(){
        navigate("/users/profile")
    }

   
    
       useEffect(()=> {
            const token= localStorage.getItem("token");
    
            fetch("http://localhost:8080/api/users/me", {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
            .then(response=>{
                if(! response.ok){
                    throw new Error("Error al cargar perfil");
                }
                setError("");
                return response.json();
                    
    
            })
            .then(data=>{
                setUser(data);
                console.log(data);
            })
            .catch(error => {
                     setError(error.message);
            })
            ;
             
       },[]);


    return (
         <>
            <header className="headerHomePage">
                <h2>Home</h2>
                <div className="iconUserCircle">
                    
                    {user && user.profilePicture ? (
                        <img 
                            src={user.profilePicture} 
                            alt={`PrilePicture${user.username}`} 
                            onClick={handleUserProfile}
                            className="profilePictureImg"
                        />
                    ) : (
                        <CircleUser onClick={handleUserProfile} />
                    )}

                </div>
            </header>
        </>
    )
}

export default HomePage;