import {useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { CircleUser} from 'lucide-react'


function UserProfilePage(){

   const [user,setUser]=useState("");
   const [error,setError]=useState("");

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
        });
         
   },[]);
   


    return(
        <>
            <h1>Profile</h1>
            {user &&(
                <>

                    <div className="iconUserCircle">
                        <CircleUser/>
                    </div>

                    <strong> <p> {user.username} </p> </strong>
                    <p> {user.email} </p>
                    <p> Grau Estudi:</p>
                    <p>{user.description} </p>
                    <p>{user.role}</p>

                </>
            )}
        </>
    )
}
export default UserProfilePage