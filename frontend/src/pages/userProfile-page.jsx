import { useNavigate } from "react-router-dom";
import { CircleUser} from 'lucide-react'
import "../styles/userProfile-page.css";
import { CurrentUserContex } from "../components/userContext";
import { useContext } from "react";
function UserProfilePage(){

   const navigate=useNavigate();
   const {user,loading,updateUser}=useContext(CurrentUserContex);   

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