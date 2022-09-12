import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

const Home = ({history}) => {

const nav = useNavigate();
 useEffect(()=>{
    if(localStorage.getItem("userInfo1"))
    {
         nav('/s')
    }
  },[history])

  return (
    <div>
    <div class="jumbotron centered align-items-center">
    <div class="container  ">
    <h1 class="display-3 mt-3 mb-3">Piqosocial</h1>
    <a class="btn btn-light btn-lg mr-2" href="/register" role="button">Register</a>
    <a class="btn btn-dark btn-lg" href="/login" role="button">Login</a>
  </div>
  </div>
</div>
  )
}
export default Home;