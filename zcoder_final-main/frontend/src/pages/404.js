import React from 'react';
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'; 

const NotFoundPage = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1)
  };

  const goHome = () => {
    navigate('/')
  };

  

  return (
    <div className='four-o-four'>
      <h1>Oops! You have found a missing page!</h1>
      <h4>It looks like this page has gone missing, just like the feelings for me in my ex!</h4><br />
      <p><button onClick={goBack}>GO BACK</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button onClick={goHome}>GO HOME</button></p>
    </div>
  )
}

export default NotFoundPage;
