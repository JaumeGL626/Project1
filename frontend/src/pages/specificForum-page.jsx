import { useState } from "react"
import { forumService } from "../services/forumService";
import { useParams } from "react-router-dom"
import { useEffect } from "react";
function SpecificForumPage(){
    const [forum,setForum]=useState(null);
    const { id } = useParams();
    const [error, setError]=useState(false);

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
    return(
    <>
    <h2>{forum?.name} </h2>
    </>)

} export default SpecificForumPage