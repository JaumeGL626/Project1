import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage  from './pages/login-page'
import './App.css'
import HomePage from "./pages/home-page";
import UserProfilePage from "./pages/userProfile-page";
import { UserProvider } from "./components/UserProvider";
function App() {

  return (
    <UserProvider>
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/users/profile" element={<UserProfilePage/>}/>
            </Routes>
        </BrowserRouter>
    </UserProvider>
    );
  
}

export default App
