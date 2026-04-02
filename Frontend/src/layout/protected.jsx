import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { getAccessToken, setAccessToken } from '../utils/token';
import axios from 'axios'; 
export default function Protected() {
  const [status, setStatus] = useState('checking');

  useEffect(() => {
    const token = getAccessToken();

    if (token) {
      setStatus('ok');
      return
    }

  
    axios.post('http://localhost:3000/api/auth/refresh', {}, {
      withCredentials: true
    })
      .then(res => {
        setAccessToken(res.data.accessToken);
        setStatus('ok');
      })
      .catch(() => {
        setStatus('fail');
      });
  }, []);

  if (status === 'checking') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  if (status === 'fail') {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}