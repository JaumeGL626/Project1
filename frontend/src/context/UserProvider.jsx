import { useState, useEffect } from 'react';
import { CurrentUserContex } from './UserContext';
import { userService } from '../services/userService';

export function UserProvider({children}){
    const [user, setUser]=useState(null);
    const [loading, setLoading] =useState(true);
    const [error, setError] = useState("");


    const fetchUser = async () =>{
        const token=localStorage.getItem("token");
        if(!token){
            setUser(null);
            setLoading(false);
            return
        }
        else{
            try{
                const data= await userService.getOwnProfile();
                setUser(data);
                setError("");
            
            } catch (err) {
            console.error("Error al cargar usuari:", err.message);
            setError(err.message);
            setUser(null);
            localStorage.removeItem("token");
            } finally {
            setLoading(false);
            }
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
    );
}

