import Header from '../components/HeaderComponent';
import Navigation from '../components/NavigatonComponent';
import { useEffect, useState } from 'react';
import ForumCard from '../components/ForumCard'
import { forumService } from '../services/forumService'; 
import { useNavigate } from 'react-router-dom';
import '../styles/Forum-page.css'
function ForumPage(){


    const [searchTerm, setSearchTerm] = useState('');
    const [forums,setForums]=useState([]);
    const [error,setError]=useState("");
    const navigate = useNavigate();

    useEffect (()=> {
        const fetchForums= async () =>{
            try{
                const data= await forumService.getAllForums();
                setForums(data);
                setError("");
                } catch (err) {
                    console.error("Error cargant forums:", err.message);
                    setError(err.message);
                    }
        };
        fetchForums();
    },[]);

    function handleClickForum(id) {
    navigate(`/forums/${id}`);
    }


return(
    <>
        <Header/>
        <Navigation/>
        <div className='userOptions'>
          {/*  <button className='butonCreateForum'> Crear Forum</button>  maybe this in user Options (my adds, my profile...)*/}
            <div className="search-bar-container">
                <input
                    type="search"
                    placeholder="Buscar Forum..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}

                    />
            </div>
        </div>
        

        <div className='forumList'>
          {  forums.length>0 ?(
            forums.map((forum)=>(
                <ForumCard key={forum.id} forum={forum} onNameClick={handleClickForum}/>
            ))
          ):(
            <p> No hi han forums disponibles</p>
          )} 
        </div>
    </>)

}
export default ForumPage