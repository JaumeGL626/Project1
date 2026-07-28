import {useContext, useState } from 'react'
import { useNavigate } from "react-router-dom";
import '../styles/login-page.css'
import { CurrentUserContex } from '../context/UserContext';
import { apiClient } from '../api/apiClient';

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError]=useState("");
    const navigate = useNavigate();

    const {updateUser}=useContext(CurrentUserContex);

    function handleUsername(e){
        setEmail(e.target.value);
    }
    function handlePassword(e){
        setPassword(e.target.value);
    }

    async function handleSubmit(e){

        e.preventDefault();

        try{
            const loginResponse=await apiClient("/auth/login",{
                method: "POST",
                body: JSON.stringify({
                    email: email, 
                    password: password
                })
            });
            setError("");
            console.log(loginResponse);
            localStorage.setItem("token", loginResponse.token);
            updateUser(loginResponse);
            navigate("/home");
        }catch(err){
            setError("Usuari o contrasenya incorrectes");
        }
        
    }

    
    return(
        <>
            <header> Login to UDG</header>

            <form  onSubmit={handleSubmit}>
                <div className="userLabel">
                    <label htmlFor="username">Email </label>
                    <input id="email" type="text" value={email} onChange={handleUsername} />
                </div>
                <div className="passwordLabel">
                    <label htmlFor="password">Password </label>
                    <input id="password" type="password"value={password} onChange={handlePassword} />
                </div>

                {error && <p className="error">{error}</p>}

                <button type="submit"> 
                    Login
                </button>
                
            </form>
        </>

    )

}
export default LoginPage;