import { Link } from 'react-router-dom'
import SearchBar from './SearchBar';


const Menubar = () => {
    return (
        <div className="menu">
            <ul className="ul-menu">
                <li className='li-menu'><Link className='link-menu' to = '/'>Home</Link></li>
                <li className='li-menu'><Link className='link-menu' to ='/contest'>contest</Link></li>
                <li className='li-menu'><Link className='link-menu' to = '/problem'>problem set</Link></li>
                <li className='li-menu'><Link className='link-menu' to ='/saved'>saved</Link></li>
                <li className='li-menu'><Link className='link-menu' to ='/profile'>profile</Link></li>

            </ul>
            <SearchBar />
        </div>
    )
}

export default Menubar;