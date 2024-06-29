import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuthContext } from "../hooks/useAuthContext"
import QnaDetails from "../components/QnaDetails"
import LoadingIcons from 'react-loading-icons'




const OtherProfile = () => {
    const [loading, setLoading] = useState(true);
    const { usenam } = useParams(); // Destructure the username from the URL
    const [error, setError] = useState(null);
    const [profile, setProfile] = useState(null);
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [bio, setBio] = useState('');
    const [username, setUsername] = useState('');
    const [userNam, setUserNam] = useState('');
    const [qna, setQna] = useState([]);
    const [profileImage, setProfileImage] = useState('');
    const { user } = useAuthContext();
    const navigate = useNavigate();
    
    useEffect(() => {
        const fetchProfile = async () => {
            if (!user) {
                setError('You must be logged in')
                setLoading(false)
                return
            }
            try {
                const response = await fetch(`/api/profile/${usenam}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                })
                // console.log()
                if (response.ok) {
                    // console.log("dj")
                    const { profileData, qnas, userName } = await response.json();
                    setQna(qnas);
                    setProfile(profileData);
                    setUserNam(userName)
                    if (profileData) {
                        setName(profileData.name);
                        setAge(profileData.age);
                        setBio(profileData.bio);
                        setUsername(profileData.username)
                        setProfileImage(profileData.profileImage);
                    }
                } else {
                    setProfile(null);
                    setQna([]);
                }
            } catch (error) {
                console.error('Error fetching profile:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, [name, usenam, user]);

    const Back = () => {
        navigate('/profile')
    }
    if (loading) {
        return <div className="profile">Loading <LoadingIcons.BallTriangle style={{ marginLeft: '-15px' }} height={'18px'} fill="var(--batch)" stroke='var(--batch)' /></div>;
    }
    return (
        <div className='profile'>
            <h2>Profile</h2>
            {profile && user ? (
                <div>
                    {profileImage && (
                        <img
                            src={profileImage}
                            alt="Profile"
                            style={{
                                display: 'block',
                                margin: '0 auto',
                                maxWidth: '200px', 
                                maxHeight: '200px', 
                                width: 'auto', 
                                height: 'auto', 
                            }}
                        />
                    )}
                    <p>Usermame: {username}</p>
                    <p>Name: {name}</p>
                    <p>Age: {age}</p>
                    <p>Bio: {bio}</p>
                    <button onClick={Back}>Back</button>
                </div>
            ) : (
                <div>
                    {
                        user ? (
                            <div>
                                <p>Username: {userNam}</p>
                                <p>this user has not completed his profile</p>
                                <button onClick={Back}>Back</button>
                            </div>
                        ) : (
                            <p>you must be logged in to view profile</p>
                        )
                    }
                </div>
            )}
            <br /><br />
            {
                user && (
                    <div className="profile-problems">
                        <div>
                            <hr />
                            <h2 style={{ color: 'var(--third)' }}>{userNam} 's recent posts...</h2>
                            {qna ? qna?.map((qna, i) => (
                                <QnaDetails qna={qna} key={i} />
                            )) : (
                                <p>yo no problimo is added here yet</p>
                            )}
                        </div>
                    </div>
                )
            }
        </div >
    );
};

export default OtherProfile;
