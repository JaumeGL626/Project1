import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage  from './pages/login-page'
import './App.css'
import HomePage from "./pages/home-page";
import UserProfilePage from "./pages/userProfile-page";
import { UserProvider } from "./context/UserProvider";
import MyAnnouncementPage from"./pages/MyAnnouncements-page";
import PublicUserProfile from "./pages/publicUserProfile-page";
import ForumPage from "./pages/forum-page";
import SpecificForumPage from "./pages/specificForum-page";
function App() {

  return (
    <UserProvider>
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/users/profile" element={<UserProfilePage/>}/>
                <Route path="/announcements/my" element={<MyAnnouncementPage/>}/>
                <Route path="/users/public/:id" element={<PublicUserProfile/>}/>
                <Route path="/forums" element={<ForumPage/>}/>
                <Route path="/forums/:id" element={<SpecificForumPage/>}/>
            </Routes>
        </BrowserRouter>
    </UserProvider>
    );
  
}

export default App
