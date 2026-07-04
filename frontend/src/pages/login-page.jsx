import {useState } from 'react'
function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleUsername(e){
        setEmail(e.target.value);
    }
    function handlePassword(e){
        setPassword(e.target.value);
    }
    function handleSubmit(e){
        e.preventDefault();
        console.log(email);
        console.log(password);
    }

    
    return(
        <>
            <h1> Login</h1>

            <form  onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Email: </label>
                    <input id="email" type="text" value={email} onChange={handleUsername} />
                </div>
                <div>
                    <label htmlFor="password">Password: </label>
                    <input id="password" type="password"value={password} onChange={handlePassword} />
                </div>
                <button type="submit"> 
                    Login
                </button>
                
            </form>
        </>

    )

}
export default LoginPage;