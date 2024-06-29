import React, { useState } from 'react';
import { useAuthContext } from "../hooks/useAuthContext"
import { useNavigate, useLocation } from 'react-router-dom';

const Update_Profile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { profile } = location.state;
  const [error, setError] = useState(null);
  const [name, setName] = useState(profile ? profile.name : '');
  const [age, setAge] = useState(profile ? profile.age : '');
  const [bio, setBio] = useState(profile ? profile.bio : '');
  const [emptyFields, setEmptyFields] = useState([])
  const [profileImage, setProfileImage] = useState(profile ? profile.profileImage : '');
  const { user } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError('You must be logged in');
      return;
    }

    let base64Image = '';

    if (profileImage && typeof profileImage !== 'string') {
      const reader = new FileReader();
      reader.readAsDataURL(profileImage);
      reader.onloadend = async () => {
        base64Image = reader.result;


        const prof = { name, age, bio, profileImage: base64Image };
        try {
          const response = await fetch('/api/profile', {
            method: 'PUT',
            body: JSON.stringify(prof),
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${user.token}`
            }
          });

          const json = await response.json();

          if (!response.ok) {
            setError(json.error);
            setEmptyFields(json.emptyFields)

          } else {
            setName('');
            setAge('');
            setBio('');
            setProfileImage('');
            setEmptyFields([])

            navigate('/profile');
          }
        } catch (error) {
          setError('Image must be must of size under 70kb. You can also browse images in "/frontend/public/images" folder.');
        }
      };
      reader.onerror = (error) => {
        console.error('Error reading file:', error);
        setError('An error occurred while reading the file');
      };
    } else {
      const prof = { name, age, bio, profileImage };
      try {
        const response = await fetch('/api/profile', {
          method: 'PUT',
          body: JSON.stringify(prof),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
          }
        });
        const json = await response.json();

        if (!response.ok) {
          setError(json.error);
        } else {
          setName('');
          setAge('');
          setBio('');
          setProfileImage('');
          navigate('/profile');
        }
      } catch (error) {
        console.error('Error submitting profile:', error);
        setError('An error occurred while submitting the profile');
      }
    }
  };
  const handleRemoveProfileImage = () => {
    setProfileImage('');
  };
  return (
    <form className="update-profile" onSubmit={handleSubmit}>
      <h3>Add Info for Profile</h3>

      <label>Name:</label>
      <input
        type="text"
        onChange={(e) => setName(e.target.value)}
        value={name}
        className={emptyFields.includes('name') ? 'error' : ''}
      />
      <br />
      <br />

      <label>Age:</label>
      <input
        type="number"
        onChange={(e) => setAge(e.target.value)}
        value={age}
        className={emptyFields.includes('age') ? 'error' : ''}
      />
      <br /><br />

      <label>Bio:</label>
      <input
        type="text"
        onChange={(e) => setBio(e.target.value)}
        value={bio}
        className={emptyFields.includes('bio') ? 'error' : ''}
      />
      <br /><br />

      <label>Profile Image:</label>
      <input
        style={{fontSize: '12px', padding: '10px'}}
        type="file"
        onChange={(e) => setProfileImage(e.target.files[0])}
      />
      <br />
      <br />


      <div style={{ display: 'flex' }}>
        <button style={{ marginRight: '20px' }}>Add Profile</button>
        {profileImage && (
          <div>
            <button type="button" onClick={handleRemoveProfileImage}>Remove Profile Photo</button>
          </div>
        )}
      </div>
      <br /><br />
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Update_Profile;
