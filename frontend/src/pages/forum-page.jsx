import Header from '../components/HeaderComponent';
import Navigation from '../components/NavigatonComponent';
import { useState } from 'react';
function ForumPage(){
    const [searchTerm, setSearchTerm] = useState('');

return(
    <>
        <Header/>
        <Navigation/>
        <div className="search-bar-container">
            <input
                type="search"
                placeholder="Buscar Forum..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
               
            />
        </div>
    </>)

}
export default ForumPage