import { CircleUser} from 'lucide-react'
import { useNavigate } from "react-router-dom";
import '../styles/home-page.css'

function HomePage() {

    const navigate = useNavigate();

    function handleUserProfile(){
        navigate("/users/profile")
    }


    return (
         <>
            <header className="headerHomePage">
                <h2>Home</h2>
                <div className="iconUserCircle">
                    <CircleUser onClick={handleUserProfile}/>

                </div>
            </header>
        </>
    )
}

export default HomePage;