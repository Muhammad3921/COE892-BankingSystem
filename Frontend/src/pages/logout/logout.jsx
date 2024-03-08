import React from 'react';
import { useNavigate } from "react-router-dom";


function LogOut() {
  const navigate = useNavigate();
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('userId');

  navigate('/')
  window.location.reload();
}

export default LogOut;