import {useState } from 'react'
import '../styles/login-page.css'
function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError]=useState("")

    function handleUsername(e){
        setEmail(e.target.value);
    }
    function handlePassword(e){
        setPassword(e.target.value);
    }

    function handleSubmit(e){
        e.preventDefault();
        const requestOptions={
            method:"POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                email:email, 
                password:password
            })
        };
        fetch("http://localhost:8080/api/auth/login", requestOptions)
        .then(response=> {
            if(!response.ok){
                throw new Error("Usuari o contrasenya incorrectes");
            }
            setError("");
            return response.json();
        })
        .then(loginResponse=>{

            console.log(loginResponse);
            localStorage.setItem("token", loginResponse.token);

        })
        .catch(error => {
                 setError(error.message);
        })
        ;
       
        
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