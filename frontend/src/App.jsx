import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import LoginPage  from './pages/login-page'
import './App.css'
import HomePage from "./pages/home-page";
import UserProfilePage from "./pages/userProfile-page";

function App() {

  return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/users/profile" element={<UserProfilePage/>}/>
            </Routes>
        </BrowserRouter>
    );
  
}

export default App
