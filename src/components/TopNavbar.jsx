import React, { useContext, useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import '../css/Navbar.css';
import userContext from '../context/userContext';
import { doLoggedOut, getCurrentUserDetail, isLoggedIn } from '../auth';

const TopNavbar = () => {
    const userContextData = useContext(userContext);
    
    const navigate = useNavigate();

    const [logIn, setLogIn] = useState(false);
    const [user, setUser] = useState(undefined);

    console.log(user)

    
    useEffect(() => {

        setLogIn(isLoggedIn());
        setUser(getCurrentUserDetail());

    }, [logIn])


    const logout = () => {
        doLoggedOut(() => {
            setLogIn(false);
            userContextData.setUser({
                data: null,
                logIn: false
            })
            console.log("Logout successfully..");
        })
        setTimeout(()=>{
            navigate('/login');
        },1000)
    }
    return (
        <nav>
            <div className='container'>
                <div className='navbar'>
                    <ul className=''>
                        {
                            logIn ?
                                <>
                                    <li>
                                        <NavLink>
                                          {
                                            (user.roles[0].id === 5001) ?
                                            "ADMIN - ":
                                            "USER - "
                                          }
                                        {user.username}
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={'/'} onClick={logout}>Logout</NavLink>
                                    </li>
                                </>
                            
                                :
                                <>
                                    <li>
                                        <NavLink to={'/login'}>Login</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={'/'}>Register</NavLink>
                                    </li>
                                </>
                            
                        }
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default TopNavbar