import { useState,useEffect } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { FiSearch } from "react-icons/fi";

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState('');
    const { user } = useAuthContext();

    const navigate = useNavigate();
    const location = useLocation();

    const handleSearchProfile = async (event) => {
        event.preventDefault();
        setError(''); // Clear previous errors
        if (searchTerm.trim() === '') {
            return;
        }

        try {
            const response = await fetch(`/api/search/${searchTerm}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });

            const data = await response.json();
            if (response.ok) {
                navigate(`/profile/${searchTerm}`);
            } else if (response.status === 404) {
                navigate('/404');
            } else {
                setError(data.error || 'An error occurred. Please try again.');
                setTimeout(() => {
                    setError('');
                }, 5000); 
            }
            
        } catch (error) {
            console.error('Error fetching profile:', error);
            setError('An error occurred. Please try again.');
            setTimeout(() => {
                setError('');
            }, 5000);
        }

        setSearchTerm('');
    };
    useEffect(() => {
        return () => {
            setError('');
            setSearchTerm('')
        };
    }, [location.pathname]);

    if(!user){
        return (<></>)
    }
    
    return (
        <div className="search-bar">
            <form onSubmit={handleSearchProfile}>
                <input
                    style={{ paddingLeft: '10px' }}
                    type="text"
                    placeholder="Search by username"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button type="submit"><FiSearch /></button>
            </form>
            {error && <p className="error">{error}</p>}
        </div>
    );
};

export default SearchBar;
