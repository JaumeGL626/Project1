import { useNavigate } from "react-router-dom";
import { CircleUser} from 'lucide-react'
import "../styles/userProfile-page.css";
import { CurrentUserContex } from "../context/UserContext";
import { useContext, useState } from "react";
import { useRef } from "react";
import { apiClient } from '../api/apiClient'
function UserProfilePage(){

   const navigate=useNavigate();
   const [editing,setEditing]=useState(false);
   const [error,setError]=useState("");
   const {user,loading,updateUser}=useContext(CurrentUserContex); 
   const [username, setUsername] = useState("");
   const [description, setDescription] = useState("");  
   const fileRef=useRef(null);

    if(loading){
        return <>
            <h3>Loading</h3>
        </>
    }



   function handleLogout(){
    localStorage.removeItem("token");
    updateUser("");

    navigate("/login")
   }

   function handleEdit(){
    setEditing(true);
    setUsername(user.username);
    setDescription(user.description);
   }
   function handleCancel(){
    setEditing(false);
   }
   async function handleSave(){
    
    try{
        const user= await apiClient("/users/me",{
             method: "PUT",
            body: JSON.stringify({
             username:username, 
             description:description,
            })

        })
        setError("");
        updateUser(user);
        setEditing(false);
    }catch(err){
        setError("Error al editar perfil");
    }
    }

    
   function handleChangeProfilePicture(){
    if (fileRef.current) {
        fileRef.current.click();
    }
   }

   async function handelChangeNewPicutre(e) {
    const file = e.target.files[0];
    if (!file) return;
    
    const formData = new FormData();
    formData.append("file", file); 
    try{
        const imgData= await apiClient("/images/upload",{

        method: "POST",
        body: formData
        })

        const user=await apiClient ("/users/me/profilePicture",{
             method: "PUT",
             body: JSON.stringify({
                profilePicture: imgData.url
            })
        })
        updateUser(user);
        setError("");
    } catch(err){
        setError("Error al actualizar la foto de perfil");
    }

    

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
                            onClick={handleChangeProfilePicture}
                        />
                    ) : (
                        <CircleUser size={200} onClick={handleChangeProfilePicture}/>
                    )}
                    <input className="newProfilePicture"
                    type="file" ref={fileRef} onChange={handelChangeNewPicutre} accept="image/*"
                    style={{display:"none"}}/>

                    {editing ? (
                        <div className="editForm">
                            <label> Username:</label>
                            <input className="inputProfile" type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                            <label>Descripcio:</label>
                            <textarea className="textareaProfile" name="description" value={description} onChange={(e) => setDescription(e.target.value)} />
                            <div className="editButtons">
                                <button className="cancelbutton" onClick={handleCancel}>Cancelar </button>
                                <button className="saveButton" onClick={handleSave}> Guardar</button>

                            </div>
                        </div>
                    ): (
                        <>
                            <p className="user-name"><strong> {user.username}</strong> </p>
                            <p className="user-email"> {user.email} </p>
                            <p className='user-study'> Grau Estudi:</p>
                            <p className='user-description'>{user.description} </p>
                            <p className='user-role'>{user.role} </p>

                            <button className='editProfile' onClick={handleEdit}> Editar Perfil</button>
                            <button className='logout' onClick={handleLogout}> Tancar Sessio</button>
                        </>
                        
                    )}

                </section>

                <aside className="otherContainer">
                    <p>Aqui va el horari</p>
                </aside>

            </div>
        </>
    )
}
export default UserProfilePage;