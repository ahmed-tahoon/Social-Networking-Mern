import React,{useState , useEffect} from 'react'
import axios from "axios";
import { Button, ButtonGroup } from '@chakra-ui/react'
import {toast} from 'react-toastify';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";


const Login = ({history}) => {
  let [loading, setLoading] = useState(false);
  let [color, setColor] = useState("#000000");

const nav = useNavigate();


 useEffect(()=>{
    if(localStorage.getItem("userInfo1"))
    {
         nav('/s')
    }
  },[history])


const [data,setData] = useState({})
const handleClick = async (event) => {
      event.preventDefault();
    setLoading(true)
    if (!data.email || !data.password) {
      toast.warning('Please Fill all the Feilds',{position: toast.POSITION.TOP_LEFT})
      return;
    }

      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        
    };
    try{
    const response = await fetch('http://localhost:4000/api/users/login', requestOptions);
    const Data = await response.json();
    console.log(Data);
    
    if(Data.success){
    localStorage.setItem("userInfo1", JSON.stringify(Data));
    toast.success('Successful Login',{position: toast.POSITION.TOP_LEFT,autoClose:1000})
    setLoading(false)
    nav('/s')
    }
  else 
  {
    throw Data
  }
  }catch(Data){
      console.log(Data)
      toast.warning(Data.errors,{position: toast.POSITION.TOP_LEFT,autoClose:1000})
      setLoading(false)

  }
    
  }
function handleChange(event)
  {
       const {name,value} = event.target;

       setData((pre)=>{
         return {
         ...pre,
         [name]:value,

         }
       })

  }

  return (
<div class="container mt-5">
  <h1>Login</h1>
  <PulseLoader  color={color} loading={loading} size={15} />
  <div class="row">
    <div class="col-sm-8">
      <div class="card">
        <div class="card-body">
          <form action="/login" method="POST">
            <div class="form-group">
              <label for="email">Email</label>
              <input onChange={handleChange} type="email" class="form-control" name="email"/>
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input onChange={handleChange}  type="password" class="form-control" name="password"/>
              <p>
        <Link to="/register">Don't Have an acount Register</Link>
      </p>
            </div>
            <button onClick={handleClick} class="btn btn-dark">Login</button>
          </form>

        </div>
      </div>
    </div>

    <div class="col-sm-4">
      
    </div>

  </div>
</div>
  )
}
export default Login