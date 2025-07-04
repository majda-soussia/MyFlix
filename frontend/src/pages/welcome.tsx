import React from 'react';
import { useNavigate} from 'react-router-dom';

const Welcome: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div
      className=" d-flex flex-column justify-content-center align-items-center text-white"
      style={{
        height: '100vh',
        width: '100vw',
        backgroundImage: 'url(/images/Welcome-screen1.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'relative',
        textAlign: 'center',
      }}
    >
      <img
        src="/images/logofilm.png"
        alt="MyFlix Logo"
        className="logo-image mb-3"
        style={{ width: '120px', height: '120px' }}
      />
      <h1>MyFlix</h1>
      <p className="mb-4">Enjoy the newest movies</p>
      <button
        className="btn"
        style={{ backgroundColor: 'purple', color: 'white', border: 'none', width: '180px', height: '50px' }}
        onClick={()=> navigate("/login")}     
      >
        Log in
      </button>
      <p className="mt-3">
        No accounts? <a href="#" style={{ color: 'white', fontWeight: 'bold' }}>Sign Up</a>
      </p>
    </div>
  );
};

export default Welcome;