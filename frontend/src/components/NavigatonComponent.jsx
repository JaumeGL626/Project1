import { NavLink } from 'react-router-dom';

function Navigation(){
    return(
        <nav>
            <ul>
                <li>
                    <NavLink to="/home" className={({isActive,isPending})=> 
                    isPending ? "pending" :isActive ? "active" :""}> Annuncis </NavLink> 
                </li>
                <li>
                    <NavLink to="/forums" className={({isActive,isPending})=> 
                    isPending ? "pending" :isActive ? "active" :""}> Forums </NavLink> 
                </li>
                <li> Future updates...</li>
            </ul> 
        </nav>
    )
    
}

export default Navigation