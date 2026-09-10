import Navigation from '../components/NavigatonComponent';
import Header from '../components/HeaderComponent';
import { useEffect, useState } from 'react';
import ForumCard from '../components/ForumCard';
import { forumService } from '../services/forumService';
import { useNavigate } from 'react-router-dom';
import '../styles/MyForum-PageStyle.css'
import {chatService} from '../services/chatService'
import {subForumService} from'../services/subForumService'
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
    const [actualsubForum,setActualSubForum]=useState(null);
    const[newNameChat,setNewNameChat]=useState("");
    const[newNameSubForum,setnewNameSubForum]=useState("");
    const[newDescriptionSubForum,setNewDescriptionSubForum]=useState("");


    const fetchForums = async () => {
        try {
            const data = await forumService.getAllMyForums();
            setForums(data);
            setError("");
        } catch (err) {
            console.error("Error cargant anuncis:", err.message);
            setError(err.message);
        }
    };

    useEffect(() => {
        fetchForums();
    }, []);

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
            await fetchForums();
        }
        catch(err){
                 setError("Error al editar forum");
        }

    }
    function handleChatName(e){
       
        setNewNameChat(e.target.value);

    }

    function handleSubForumName(e){
       
        setnewNameSubForum(e.target.value);
    

    }

     function handleSubForumDescription(e){
       
        setNewDescriptionSubForum(e.target.value);
    

    }




    function handlePopUpChat(subForum){
        setPopUpChat(!popUpChat);
        setActualSubForum(subForum);
        setPopUpSubForum(false);
    }

    function handlePopUpSubForum(){
        setPopUpSubForum(!popUpSubForum);
        setPopUpChat(false);

    }

    async function handleCreateChat(e) {
        
        e.preventDefault();
        e.stopPropagation();

         try{
                    
            const chat= await chatService.postSubForumChat(actualForum.id,actualsubForum.id,newNameChat,"",[],"SUBFORUM");

            setActualForum((prevForum) => {
                
                return {
                    ...prevForum,
                    subForums: prevForum.subForums.map((sf) => {
                        if (sf.id === actualsubForum.id) {
                            return {
                                ...sf,
                                subChats: [...(sf.subChats || []), chat]
                            };
                        }
                        return sf;
                    })
                };
            });
            await fetchForums();
            setError("");
            setActualSubForum(null);
            setNewNameChat("");
            setPopUpChat(false);
            
            }catch(err){
                setError("Error al crear chat");
            }
        
        

        
    }
    async function handlecreateSubForum(e) {
        e.preventDefault();
        e.stopPropagation();

         try{
                    
            const subForum= await subForumService.postSubForum(actualForum.id, newNameSubForum, newDescriptionSubForum);


            const formattedSubForum = {
                ...subForum,
                subChats: subForum.subChats || []
            };

            setActualForum((prevForum) => {

                return {
                    ...prevForum,
                    subForums: [...(prevForum.subForums || []), formattedSubForum]
                };
            });


            await fetchForums();
            setActualSubForum(null);
            setNewDescriptionSubForum("");
            setnewNameSubForum("");
            setPopUpSubForum(false);
            
            }catch(err){
                setError("Error al crear subForum");
            }
        
        
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
                                    <h2 > {subForum.name }</h2>

                                    {subForum.subChats.length>0  ?( subForum.subChats.map((subChat)=>
                                    <div className='sucChatItem' key={subChat.id}>
                                        <p>{subChat.name}</p>
                                    </div>
                                         )):
                                    (<p> No hi han subchats</p>)}
                                    <button type="button" onClick={() => handlePopUpChat(subForum)}> Afegir subchat</button>
                                    
                                </div>
                            )
                        ):(<p> No hi ha subforums</p>)}
                        <button type="button" onClick={ handlePopUpSubForum}> Afegir SubForum</button>
                    </div>
                    <div className='buttonFormForum'>
                        <button onClick={()=> setEditPopUp(false)} type='button' >Cancelar </button>
                        <button  type='submit'>Actualitzar </button>
                    </div>
                </form>
            )}
        </div>
       
        {popUpChat &&(
        <div className='createChatPopUp'>
            <form className='chatForm' onSubmit={handleCreateChat}>
                <h3> Crear un chat</h3>
                <label> Nom del chat que vols crear:</label>
                <input type='text' onChange={handleChatName}/>
                <div className='buttonFormChat'>
                    <button onClick={()=> setPopUpChat(false)} type='button'> Cancelar</button>
                    <button type='submit'> Crear</button>
                </div>
                

            </form>
        </div>
        )}
    
       

        {popUpSubForum &&(
            <div className='createSubForumPopUp' >
                <form className='chatForm' onSubmit={handlecreateSubForum}>
                    <h3> Crear un SubForum</h3>
                    <label> Nom del SubForum que vols crear:</label>
                    <input type='text' onChange={handleSubForumName}/>

                    <label> Descripcio del Suborum que vols crear:</label>
                    <textarea className=' textAreaForum'  onChange={(e) => setNewDescriptionSubForum(e.target.value)}></textarea>
                    <div className='buttonFormChat'>
                        <button onClick={()=> setPopUpSubForum(false)} type='button'> Cancelar</button>
                        <button type='submit'> Crear</button>
                    </div>
                

                </form>
            </div>

        )}
        

        
        
        
    </>)
}export default MyForumPage