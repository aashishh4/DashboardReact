import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthLogin';
import { useNavigate } from 'react-router-dom';


function Header() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const sidebarRef = useRef(null);
    const menuButtonRef = useRef(null);
    const { Logout, isAuth } = useAuth();
    const navigate=useNavigate();

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                sidebarRef.current &&
                !sidebarRef.current.contains(event.target) &&
                !menuButtonRef.current.contains(event.target)
            ) {
                setIsSidebarOpen(true);
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);


    const handleLogout = () => {
        Logout();
        alert(" Logout  Page")
    }
   const handleLogo=()=>{
    console.log("homepage")
    {isAuth?(navigate("/")):(navigate("/login"))}
   }

    return (
        <div className='top-header'>
           
            
            <div className="button-container">
            
            <button onClick={handleLogo}>
                <img src='image/br3.jpg' alt='image'/>Logo
            </button>
            
                <button ref={menuButtonRef} onClick={toggleSidebar}>
                    <img src='image/menu.png' alt='image' />
                </button>
            </div>

            {isSidebarOpen && (
                <>

                    <div className="sidebar" ref={sidebarRef}>

                        <h3>Welcome</h3>

                        {isAuth ? (
                            <ul>
                                <li>
                                    <a href="/dasboard" aria-hidden="true">
                                        <slot name="start"></slot>
                                        <span aria-hidden="true" icon="personOutline"></span>
                                        <label>Dasboard</label>
                                    </a>
                                </li>
                                <li>
                                    <a href="/about" aria-hidden="true">
                                        <slot name="start"></slot>
                                        <span aria-hidden="true" icon="personOutline"></span>
                                        <label>About</label>
                                    </a>
                                </li>
                                <li>
                                    <a href="/contact" aria-hidden="true">
                                        <slot name="start"></slot>
                                        <span aria-hidden="true" icon="personOutline"></span>
                                        <label>Contact</label>
                                    </a>
                                </li>


                                <li>
                                    <a href="/page" aria-hidden="true">
                                        <slot name="start"></slot>
                                        <span aria-hidden="true" icon="personOutline"></span>
                                        <label>Page</label>
                                    </a>
                                </li>
                                <li>
                                    <a onClick={handleLogout} aria-hidden="true">
                                        <slot name="start"></slot>
                                        <span aria-hidden="true" icon="personOutline"></span>
                                        <label>Logout</label>
                                    </a>
                                </li>

                            </ul>
                        ) : (
                            <ul>
                                <li>
                                    <a href="/login" aria-hidden="true">
                                        <slot name="start"></slot>
                                        <span aria-hidden="true" icon="personOutline"></span>
                                        <label>Login</label>
                                    </a>
                                </li>
                                <li>
                                    <a href="/register" aria-hidden="true">
                                        <slot name="start"></slot>
                                        <span aria-hidden="true" icon="personOutline"></span>
                                        <label>Register</label>
                                    </a>
                                </li>
                            </ul>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}

export default Header;
