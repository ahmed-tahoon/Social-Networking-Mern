import React from 'react'
import Post from './Post'
import Posts from './Posts'
import auth from './../auth/auth-help'
import jwt1 from 'jwt-decode' // import dependency
import { useEffect } from 'react';
import {getFeed} from "../api/api-post"
import FindPeople from "./FindPeople"
import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import BounceLoader from 'react-spinners/BounceLoader'
import MoonLoader from 'react-spinners/MoonLoader'
import {toast} from 'react-toastify';
import NavBar from './NavBar'
import { listItemTextClasses } from '@mui/material'

const HomePage = () => {
  const [posts, SetPosts] = useState([]);
  const [isnew , setnew] = useState(false);

  console.log(posts);

  const nav = useNavigate()

function Addone(data1) {
  setnew(true)
  console.log(data1)
  const updatedPosts = [...posts]
  updatedPosts.splice(0, 0, data1);
    setTimeout(function() {
    SetPosts(updatedPosts)
  }, 500);
  setTimeout(function() {
   toast.success('Post Upload',{position: toast.POSITION.TOP_LEFT,autoClose:1500}) 
    SetPosts(updatedPosts)
   nav('/'); 
  }, 700);
    

  }  
const jwt = auth.isAuthenticated()
const user1 = jwt1(jwt.token);


useEffect(()=>{

 getFeed({
      userId: user1.id
    },{
      t: jwt.token
    }
    ).then((data) => SetPosts(data))

},[])

const updata = (post)=>{
        console.log(post)

    let updated = [...posts]
      console.log(updated)

updated = updated.filter(function(item) {
    return item._id !== post._id
})
  setTimeout(function() {
   toast.success('Post Deleted',{position: toast.POSITION.TOP_LEFT,autoClose:1500}) 
    SetPosts(updated)
   nav('/'); 
  }, 100);
}

  return (
    <div style={{backgroundColor : "#fafafa "}}>
{/*---------------------------------------------------------navbar----------------------------------------------------------*/}
    <NavBar/>

        <section className= "p-lg-0 p-md-3 p-3 mb-3 mt-5 container ">

            <div className="d-flex overflow-hidden justify-content-evenly m-auto align-items-start px-5" >

                <div className="left  col-lg-7 col-sm-12  col-sm-12  h-100  border_radius mt-5" >
             <Post onAdd1={Addone}/>
               {isnew?<MoonLoader
  color="#077ce8"
  cssOverride={{}}
  loading
  size={60}
  
/>:null}
             {posts.map((post,idx)=>{
               return (
             <Posts updatePosts={updata} key={idx} post={post}/>
               )
             })}
          </div>
             <FindPeople/>
            </div>
        </section>
    </div>
  )
}

export default HomePage