import Navigation from '../components/NavigatonComponent';
import Header from '../components/HeaderComponent';
import { useEffect, useState } from 'react';
import ForumCard from '../components/ForumCard';
import { forumService } from '../services/forumService';
import { useNavigate } from 'react-router-dom';

function MyForumPage(){

    const [forums,setForums]=useState([]);
    const [error,setError]=useState("");
    const [isEditing,setIsEditing]=useState(false);
    const [editPopUp, setEditPopUp]=useState(false);
     const[actualTitle,setActualTitle]=useState("");
    const[actualDescription,setActualDescription]=useState("");
    const [actualForum,setActualForum]=useState(null);
    const [popUpChat,setPopUpChat]=useState(false);
    const [popUpSubForum, setPopUpSubForum]=useState(false);
    useEffect(()=>{
        const fetchForums= async() => {
            try{
                const data= await forumService.getAllMyForums();
                setForums(data);
                setError("")
            }
            catch(err){
                console.error("Error cargant anuncis:", err.message);
                setError(err.message);
            }
        };
        fetchForums();

    },[])

    function handleIsEditing(){
        setIsEditing(!isEditing);
    }

    function handelEditForum(forum){
        setActualForum(forum);
        setActualTitle(forum.name)
        setActualDescription(forum.description)
        setEditPopUp(true);

    }
    async function handleSetForum(e){
        e.preventDefault();

        try{
            const forum= await forumService.editForum(actualForum.id, actualTitle, actualDescription);
            setError("");
            setActualForum(null);
            setEditPopUp(false);
        }
        catch(err){
                 setError("Error al editar forum");
        }

    }


    function handlePopUpChat(){
        setPopUpChat(true);
    }

    function handlePopUpSubForum(){
        setPopUpSubForum(true);
    }



    
    return(
    <>
        <Header/>
        <Navigation/>
        <h3> Els meus forums</h3>
        <button className="buttonEditAnnouncements" onClick={handleIsEditing}> Editar Forums</button>
        <div className='myForum'>
        {forums.length >0 ? (
            forums.map((forum)=>
           <ForumCard key={forum.id} forum={forum} isEditing={isEditing} editForum={handelEditForum}/>

        )):(<p> No tens cap forum publicat</p>)}

        </div>
        <div className='forumEdit'>
            {editPopUp && actualForum &&(
                 <form className='formForum' onSubmit={handleSetForum}>
                    <h3>Editar Anunci</h3>
                    <label> Nou nom:</label>
                    <input className='inputForumTittle' type='text' value={actualTitle} onChange={(e) => setActualTitle(e.target.value)}/>
                    <label> Introduiex la nova descripcio del forum:</label>
                    <textarea className=' textAreaForum'  value={actualDescription} onChange={(e) => setActualDescription(e.target.value)}></textarea>
                    <div className='subForumList'>
                        <h3> SubForums</h3>
                        {actualForum.subForums.length> 0 ?(
                            actualForum.subForums.map((subForum)=>
                                <div className='SubForumItem' key={subForum.id}>
                                    <p > {subForum.name }</p>

                                    {subForum.subChats.length>0  ?( subForum.subChats.map((subChat)=>
                                    <div className='sucChatItem'>
                                        <p key={subChat.id}>{subChat.name}</p>
                                    </div>
                                         )):
                                    (<p> No hi han subchats</p>)}
                                    <button type="button"> Afegir subchat</button>
                                    
                                </div>
                            )
                        ):(<p> No hi ha subforums</p>)}
                        <button type="button"> Afegir SubForum</button>
                    </div>
                    <div className='buttonFormForum'>
                        <button onClick={()=> setEditPopUp(false)} type='button' >Cancelar </button>
                        <button  type='submit'>Actualitzar </button>
                    </div>
                </form>
            )}
        </div>
        
        
        
    </>)
}export default MyForumPage