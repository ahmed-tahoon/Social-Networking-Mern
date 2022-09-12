import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react';
import auth from './../auth/auth-help'
import jwt1 from 'jwt-decode' // import dependency
import logo from "../images/IMG-20201113-WA0051.jpg"; // with import
import { read } from '../api/api-post';
import {toast} from 'react-toastify';
import PulseLoader from "react-spinners/PulseLoader";
import BarLoader from "react-spinners/PulseLoader";
import { useParams } from "react-router";
import {update} from "../api/api-post"
import NavBar from './NavBar';
import { useNavigate } from "react-router-dom";

const EditProfile = () => {

const nav=useNavigate();
    const params = useParams();
    console.log(params)

  const [picLoading, setPicLoading] = useState(false);
  const [picLoading1, setPicLoading1] = useState(false);
   const [values, setValues] = useState({
  })

  const jwt = auth.isAuthenticated()
  const user1 = jwt1(jwt.token);

  console.log(user1);


  useEffect(()=>{

     read( {userId: user1.id
    },{
      t: jwt.token
    },).then((data)=>{
        if(data)
        console.log(data)
        setValues({...values,name:data.name , email:data.email , image:data.image , about:data.about,update:data.updated});
    })
    
  },[])




const ImageHander=(pics)=>
  {
     setPicLoading1(true)
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "chat-app");
      data.append("cloud_name", "dwjy0lwss");
      fetch("https://api.cloudinary.com/v1_1/dwjy0lwss/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setValues({...values,image:data.url.toString()})
          console.log(data.url.toString());
          setPicLoading1(false);
          return 
        })
        .catch((err) => {
          toast.error('Some Thing Wron1g',{position: toast.POSITION.TOP_LEFT,autoClose:1000})
          setPicLoading1(false);
        });
    } else {
          toast.error('Photo is invalid',{position: toast.POSITION.TOP_LEFT,autoClose:1000})
      setPicLoading1(false);
      return;
    }
  };
    
  const clickSubmit = () => {
    update({
      userId: params.id
    }, {
      t: jwt.token
    }, values).then((data) => {
      if (data) {
        {
       toast.success('Data Updated',{position: toast.POSITION.TOP_LEFT,autoClose:1000})
       nav('/user/'+user1.id)

        }
      } 
    })

  }



  return (
    <div>
     <NavBar/>
   
  {/*-------------------------------------------------------------- body -------------------------------------------------------------*/}
 
  <div className="d-flex flex-column py-5 align-items-center mt-5">
    <div className="d-flex flex-column align-items-center flex-lg-row align-items-lg-start m-auto">
      <div className="position-relative">
        <img
          src={values.image}
          alt=""
          className="rounded"
          style={{ width: 280 }}
        />
        <BarLoader loading={picLoading1} size={15} />
        <label htmlFor="file-input">
          <i className="fa-solid fa-camera fs-2 camera_icon" />
        </label>
       <input id="file-input" onChange={(e)=>ImageHander(e.target.files[0])} 
               accept="image/*" name="photo"
               type="file" className="d-none" />
      </div>
      <div style={{ width: 450 }} className="px-5 pt-4 pt-lg-0">
        <div className="mb-3">
          <label htmlFor="formGroupExampleInput" className="form-label">
            Name
          </label>
          <input
            onChange={(e)=>setValues({...values,name:e.target.value})}
            value={values.name}
            type="text"
            className="form-control"
            id="formGroupExampleInput"
            placeholder="name..."
          />
        </div>
        <div className="mb-3">
          <label htmlFor="formGroupExampleInput2" className="form-label">
            About
          </label>
          <input
           value={values.about!=''? values.about:''}
           onChange={(e)=>setValues({...values,about:e.target.value})}
            type="text"
            className="form-control"
            id="formGroupExampleInput2"
            placeholder="about.."
          />
        </div>
        <div className="mb-3">
          <label htmlFor="formGroupExampleInput3" className="form-label">
            Email
          </label>
          <input
            value={values.email}
           onChange={(e)=>setValues({...values,email:e.target.value})}
            type="email"
            className="form-control"
            id="formGroupExampleInput3"
            placeholder="email.."
          />
        </div>
        <div className="mb-3">
          <label htmlFor="formGroupExampleInput4" className="form-label">
            Password
          </label>
          <input
            type="password"
            value={values.password}
            onChange={(e)=>setValues({...values,password:e.target.value})}
            className="form-control"
            id="formGroupExampleInput4"
            placeholder="password.."
          />
        </div>
        <div className=" d-flex justify-content-center">
          <button onClick={()=>{nav(-1)}} type="button" className="btn btn-dark mt-2 px-4">
            Back To Profile
          </button>
          <button onClick={clickSubmit} type="button" className="btn btn-primary ml-2 mt-2 px-4">
            <i className="fa-solid fa-pen me-2" />
            Update
          </button>
        </div>
        <p className="mt-2 d-flex justify-content-center">last update : {new Date(values.update).toLocaleString()} </p>
      </div>
    </div>
  </div>

</div>
  )
}

export default EditProfile