import {useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { CircleUser} from 'lucide-react'
import "../styles/userProfile-page.css";


function UserProfilePage(){

   const [user,setUser]=useState("");
   const [error, setError]=useState("");
   const navigate=useNavigate("");

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

   function handleLogout(){
    localStorage.removeItem("token");
    navigate("/login")

   }
   


    return(
        <>
            
            <header className='header'>My Profile</header>

            <div className="profileFullContainer">

                <section className="userInfromation">


                    {user && user.profilePicture ? (
                        <img 
                            src={user.profilePicture} 
                            alt={`PrilePicture${user.username}`} 
                           
                            className="profilePictureImg"
                        />
                    ) : (
                        <CircleUser size={200} />
                    )}

                    <p className="user-name"><strong> {user.username}</strong> </p>
                            <p className="user-email"> {user.email} </p>
                            <p className='user-study'> Grau Estudi:</p>
                            <p className='user-description'>{user.description} </p>
                            <p className='user-role'>{user.role} </p>

                            <button className='editProfile'> Editar Perfil</button>
                            <button className='logout' onClick={handleLogout}> Tancar Sessio</button>

                    

                
                </section>

                <aside className="otherContainer">
                    <p>Aqui va el horari</p>
                </aside>

            </div>
        </>
    )
}
export default UserProfilePage