import { useState } from 'react';
import {Navigate , Route} from 'react-router-dom'


function PrivateRoute({ children }) {

  const auth = localStorage.getItem("userInfo1");


  return auth ? children : <Navigate to="/login" />;
}

export default  PrivateRoute
