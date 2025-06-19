import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const buttonStyle = {
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer',
    marginTop: '20px'
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Front Website Page</h1>
      <div className='flex flex-row items-center justify-center gap-6'>

      <button style={buttonStyle} onClick={() => navigate("/user/login")}>
        Login
      </button>
      <button style={buttonStyle} onClick={() => navigate("/user/register")}>
        Register
      </button>
      </div>
    </div>
  );
};

export default Home;
