import { CircleUser} from 'lucide-react'
import { useNavigate } from "react-router-dom";
import '../styles/home-page.css'

function HomePage() {

    const navigate = useNavigate();

    function handleUserProfie(){
        navigate("/profile")
    }


    return (
         <>
            <header>
                <h2>Home</h2>
                <div className="iconUserCircle">
                    <CircleUser onClick={handleUserProfie}/>

                </div>
            </header>
        </>
    )
}

export default HomePage;