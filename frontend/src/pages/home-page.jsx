import { CircleUser} from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { useContext } from 'react';
import { CurrentUserContex } from '../components/userContext';
import '../styles/home-page.css'

function HomePage() {

    const {user,loading} =useContext(CurrentUserContex);
    const navigate = useNavigate();

    function handleUserProfile(){
        navigate("/users/profile")
    }

    if(loading){
        return<>
               <h3> Loading </h3>
              </> 
    }


    return (
         <>
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
                            onClick={handleUserProfile}
                            className="profilePictureImgHome"
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