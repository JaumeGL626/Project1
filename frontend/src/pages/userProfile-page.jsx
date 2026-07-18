import { useNavigate } from "react-router-dom";
import { CircleUser} from 'lucide-react'
import "../styles/userProfile-page.css";
import { CurrentUserContex } from "../components/userContext";
import { useContext, useState } from "react";
function UserProfilePage(){

   const navigate=useNavigate();
   const [editing,setEditing]=useState(false);
   const [error,setError]=useState("");
   const {user,loading,updateUser}=useContext(CurrentUserContex); 
   const [username, setUsername] = useState("");
   const [description, setDescription] = useState("");  

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
   function handleSave(){
    const token =localStorage.getItem("token");
    const requestOptions={
        method: "PUT",

        headers: {
            Authorization: `Bearer ${token}` ,
             "Content-Type": "application/json"},
         body: JSON.stringify({
                username:username, 
                description:description,
        })
    };
    fetch("http://localhost:8080/api/users/me", requestOptions)
   .then(response=> {
    if(!response.ok){
        throw new Error ("error al editar perfil")
    }
    return response.json();
   })
   .then(response=> {
    updateUser(response);
    setEditing(false);
   })
   .catch(error=> setError(error.message));

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

                    {editing ? (
                        <div className="edit-form">
                            <label> Username:</label>
                            <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                            <label>Descripcio:</label>
                            <textarea name="description" value={description} onChange={(e) => setDescription(e.target.value)} />
                            <div className="editButtons">
                                <button className="cancelbutton" onClick={handleCancel}>Cancelar </button>
                                <button className="ssaveButton" onClick={handleSave}> Guardar</button>

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
export default UserProfilePage