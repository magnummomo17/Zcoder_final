import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from "../hooks/useAuthContext"
import QnaDetails from '../components/QnaDetails';
import LoadingIcons from 'react-loading-icons';


const Profile = () => {

    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const [error, setError] = useState(null)
    const [profile, setProfile] = useState(null);
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [bio, setBio] = useState('');
    const [profileImage, setProfileImage] = useState('');
    const [username, setUsername] = useState('');
    const { user } = useAuthContext()

    const [qna, setQna] = useState([])


    useEffect(() => {
        const fetchProfile = async () => {
            if (!user) {
                setError('You must be logged in')
                setLoading(false)
                return
            }
            try {
                const response = await fetch('/api/profile/', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                })

                if (response.ok) {
                    const { profileData, qnas } = await response.json();
                    setQna(qnas)
                    setProfile(profileData);
                    if (profileData) {
                        setName(profileData.name);
                        setAge(profileData.age);
                        setBio(profileData.bio);
                        setUsername(profileData.username)
                        setProfileImage(profileData.profileImage);
                    }
                } else {
                    setProfile(null);
                    setQna([])
                }
            } catch (error) {
                console.error('Error fetching profile:', error);
            } finally {
                setLoading(false)
            }
        };
        fetchProfile();
    }, [user]);

    const handleEditProfile = () => {
        navigate('/profile/edit');
    };
    const handleUpdateProfile = () => {
        navigate('/profile/update', { state: { profile } })
    }

    if (loading) {
        return <div className="profile">Loading <LoadingIcons.BallTriangle style={{ marginLeft: '-15px' }} height={'18px'} fill="var(--batch)" stroke='var(--batch)' /></div>;
    }

    return (
        <div className="profile">
            {profile ? (
                <div>
                    {profileImage && (
                        <img
                            src={profileImage}
                            alt="Profile"
                            style={{
                                display: 'block',
                                margin: '0 auto',
                                maxWidth: '300x',
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
                    <button onClick={handleUpdateProfile}>Edit Profile</button>
                </div>
            ) : (
                <div>
                    {
                        user ? (
                            <div>
                                <p>Username: {user.username}</p>
                                <p>you have not completed your profile</p>
                                <button onClick={handleEditProfile}>Create Profile</button>
                            </div>
                        ) : (
                            <p>you must be logged in to view profile</p>
                        )
                    }
                </div>
            )}
            <br /><br />
            <div className="profile-problems">
                <div>
                    <hr />
                    <h2 style={{ color: 'var(--third)' }}>your recent posts....</h2>
                    {qna ? qna?.map((qna, i) => (
                        <QnaDetails qna={qna} key={i} />
                    )) : (
                        <p>yo no problimo is added here yet</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
