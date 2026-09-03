import { useState } from "react"
import { forumService } from "../services/forumService";
import { useParams } from "react-router-dom"
import { useEffect } from "react";
function SpecificForumPage(){
    const [forum,setForum]=useState(null);
    const { id } = useParams();
    const [error, setError]=useState(false);
    const[actualChat,setActualChat]=useState(null)
    const [actualSubForum,setActualSubForum]=useState(null);

    useEffect(()=> {
            const fetchForum = async () => {
            try{
                const dataForum= await forumService.getForumById(id);
                console.log( dataForum);
                setForum(dataForum);
                setError("");
            } catch (err) {
                    console.error("Error cargant forum desitjat:", err.message);
                    setError(err.message);
                }
            };
            fetchForum();
        },[id]);



    const handleChatName=(chat)=>{
        setActualChat(chat);
        setActualSubForum(null);
    }

    const handleSubForum=(subForum)=>{
        setActualChat(null);
        setActualSubForum(subForum);
    }




   
    return(
    <>
    
    
    <div className="subForums">
         <h1>{forum?.name} </h1>
        {forum?.subForums && forum.subForums.length > 0 ?(
            forum.subForums.map((sub) =>(
            <div className="subForumList" key={sub.id}>
                 <p onClick={()=> handleSubForum(sub)}>{sub?.name}</p>

                <div className="subChats">
                    {sub?.subChats && sub.subChats.length > 0 ? (
                        sub.subChats.map((chats)=>(
                            <div className="subChatsList" key={chats.id}> 
                                 <p onClick={()=> handleChatName(chats)}> {chats.name}</p> 
                            </div>
                           
                        ))
                    ): (<p> No hi ha cap chat </p>)}
                </div>
            </div>
            
           
        ))
        ):(<p>No hi ha subforums</p>)}
       
    </div>

    <div className="principalBody">
        {!actualChat && !actualSubForum && (

       <div className="ForumDescription"> 
            <h1> Benvolguts a {forum?.name}</h1>
            <h3>{forum?.description}</h3>
        </div>
    
        )}
    
        {actualChat && (
            <div className="ForumDescription"> 
                <p>{actualChat.name}</p>
                {actualChat.listMessages.length >0 &&(

                    actualChat.listMessages.map((messages)=>(
                    <div className="messages" key={messages.id}>
                        <p>{messages.content}</p>
                    </div>
                    
                ))
                
                )}
            </div>
        )}
        {actualSubForum && (
            <div className="ForumDescription"> 
                <h2>{actualSubForum.name}</h2>
                <p>{actualSubForum.description}</p>
            </div>
        )}

    </div>

    </>
    );

    

} export default SpecificForumPage