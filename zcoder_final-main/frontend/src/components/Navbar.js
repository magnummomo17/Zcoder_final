import { Link, Navigate } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
import { VscColorMode } from "react-icons/vsc";
import { AiFillCode } from "react-icons/ai";
import { useEffect, useState } from 'react';


const Navbar = () => {
    const { logout } = useLogout();
    const { user } = useAuthContext();
    const [dark, setDark] = useState(false);


    const handleClick = () => {
        logout()
    }


    useEffect(() => {
        if (dark) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }

    }, [dark])

    return (
        <header className="navbar-container">
            <div className="container">
                <Link to='/'>
                    <h1>Z-Coder</h1>
                </Link>
            </div>

            <nav>
                {user ? (<div>
                    <button title='go to code editor' style={{ marginRight: '20px' }}><Link to='/playground'><AiFillCode size={20} /></Link></button>
                    <button title={dark ? 'enable light mode' : 'enable dark mode'} style={{ marginRight: '20px' }} onClick={() => setDark(!dark)}><VscColorMode size={20} /></button>
                    <span style={{ marginRight: '30px' }}>{user.username}</span>
                    <button style={{ marginRight: '30px' }} onClick={handleClick} className='user-link'><u>log out</u></button>
                </div>) : (<div>
                    <button title='go to code editor' style={{ marginRight: '20px' }} ><Link to='/playground'><AiFillCode size={20} /></Link></button>
                    <button style={{ marginRight: '20px' }} onClick={() => setDark(!dark)}><VscColorMode size={20} /></button>
                    <Link to="/login" style={{ marginRight: '30px' }} className='user-link'><u>login</u></Link>
                    <Link to="/signup" style={{ marginRight: '30px' }} className='user-link'><u>signup</u></Link>
                </div>)
                }
            </nav>
        </header>
    )
}

export default Navbar