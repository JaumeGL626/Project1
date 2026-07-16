import { useState, useEffect } from 'react';
import { CurrentUserContex } from './userContext';


export function UserProvider({children}){
    const [user, setUser]=useState("");
    const [loading, setLoading] =useState(true);
    const [error, setError] = useState("");


    const fetchUser =() =>{
        const token=localStorage.getItem("token");
        if(!token){
            setLoading(false);
            return
        }
        else{
            fetch("http://localhost:8080/api/users/me", {
            headers:{
                Authorization: `Bearer ${token}`
                }
            })
            .then(response=>{
                if(! response.ok){
                    throw new Error("Error al cargar usuari");
                }
                setError("");
                return response.json();
            })
            .then(data=>{
                setUser(data);
                console.log(data);
                setLoading(false);
            })
            .catch(error => {
                 setError(error.message);
                 setLoading(false);
            })
            ;
        }


    };

    useEffect (()=>{
        fetchUser();
    },[]);

    const updateUser= (user)=>{
            if(!user){
                setUser(null);
            }
            fetchUser();
        }


    return(
        <CurrentUserContex.Provider value={{user,loading,updateUser,error}}>
            {children}  
         </CurrentUserContex.Provider>
    )
}

