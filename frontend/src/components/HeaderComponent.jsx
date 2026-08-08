import { CircleUser} from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { useContext } from 'react';
import { CurrentUserContex } from '../context/UserContext';
import { useState } from 'react';
import '../styles/HeaderStyle.css';
import Navigation from './NavigatonComponent';
function Header(){
    const {user} =useContext(CurrentUserContex);
    const navigate = useNavigate();
    const [menuOpen,setMenuOpen]=useState(false);   

    function handleUserProfile(){
        setMenuOpen(false);
        navigate("/users/profile")
    }
    function setTrueMenuUser(){
        
        setMenuOpen(!menuOpen)
    }

    return(
        <header className="headerHomePage">
                {user?.username ?(
                    <h2> Benvolgut/da {user.username} a la pagina de la UDG</h2>
                ):(
                    <h2> benvolgut/da a la pagina de la UDG</h2>
                )}
                <div className="iconUserCircle">
                    
                    {user?.profilePicture ? (
                        <img 
                            src={user.profilePicture} 
                            alt={`PrilePicture${user.username}`} 
                            onClick={setTrueMenuUser}
                            className="profilePictureImgHome"
                        />
                    ) : (
                        <CircleUser onClick={setTrueMenuUser} />
                    )}

                </div>
                {menuOpen && (
                    <div className='choseOptionsUser'>
                        <ul>
                            <li onClick={handleUserProfile} >
                                 Mi perfil
                        
                            </li>
                            <li>
                                Mis publicaciones
                            </li>
                        </ul>
                        
                    </div>
                )}
            </header>
    )
    

}
export default Header;