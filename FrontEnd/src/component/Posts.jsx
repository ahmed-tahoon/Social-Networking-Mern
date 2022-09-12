import React from 'react'
import { useState } from 'react';
import auth from './../auth/auth-help'
import jwt1 from 'jwt-decode' // import dependency
import { useEffect } from 'react';
import {getFeed} from "../api/api-post"
import {Like, unlike,comment,remove} from '../api/api-post.js'
import Comment from './Comment'
import { read } from '../api/api-post';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';

import { useNavigate } from 'react-router'


const Posts = (props) => {
  const nav = useNavigate()
  const [image, setImage] =useState("")
  const [name, setName] =useState("")
  let x = props.post.caption;
  let [caption,setCaption]=useState(x?x.substr(0,300):"")


  
 
 const jwt = auth.isAuthenticated()
   const user1 = jwt1(jwt.token);
  const checkLike = (likes) => {
    let match = likes.indexOf(user1.id) !== -1
    return match
  }

  useEffect(() => {
    read({ userId: user1.id }, { t: jwt.token }).then((res) => {
      if (res.name) {
        setImage(res.image);
        setName(res.name)
      }
    });
  }, [user1.id]);
  const [values, setValues] = useState({
    like: checkLike(props.post.likes),
    likes: props.post.likes.length,
    comments: props.post.comments,

  })

  

   const [text, setText] = useState('')
   const handleChange = event => {
    setText(event.target.value)
  }
  const [clickC , setC]=useState(0);
  const [C , sC]=useState(0);



  

  const updateComments = (comments) => {
    setValues({...values, comments: comments})
  }
  

   const clickLike  = ()=> {

    let callApi = values.like ? unlike : Like

       callApi({userId : user1.id} ,
        {t:jwt.token},
           props.post._id
        ).then((data)=>{
          if(data)
          {
            setValues({...values, like: !values.like, likes: data.likes.length})
          }
        })
   }

 const addComment = () => {
      
  console.log(values.comments)
    if(text){
      comment({
        userId: user1.id
      }, {
        t: jwt.token
      }, props.post._id, {text: text}).then((data) => {
        if (data) {
          setText('')
          updateComments(data.comments)
        } else {
         console.log("error")
        }
      })
    }
    if(!clickC)
       setC(true)

     if(!C)
       sC(true)
       
  
}


const deletePost =()=>{

  remove({postId :props.post._id},{ t: jwt.token}).then((data)=>{
    props.updatePosts(data);
  })
}
const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      addComment();
    }
  }
  return (
    <div>
  <section className="posts border border_radius border-secondary mt-3  overflow-hidden p-0 white border position-relative">
        {props.post.userDetails.id==user1.id ? <i className="fa-regular fa-trash-can position-absolute pt-4 fs-5 trash" onClick={deletePost}/>:null}

  <div className="name d-flex pl-3 pt-3">
    <div>
      <img
        src={props.post.author.image}
        alt="profile"
        style={{ width: 50  ,height:50}}
        className="rounded-circle me-3"
      />
    </div>
    
    <div>
      <p onClick={()=>{
           nav('/user/'+props.post.userDetails.id)
      }} className="mb-0 fw-bold fs-5">{props.post.author.name}</p>
      <p className="text">{new Date(props.post.created).toLocaleString()}</p>
    </div>
  </div>      

  <h5 className="mt-0 ml-1">
  <p className='fff'>{caption}{props.post.caption&&props.post.caption.length>300?
    (<a onClick={()=>{
      setCaption(props.post.caption)
      props.post.caption=""
    }} className="badge badge text-primary">...show more</a>):null}</p>
    
  </h5>
  
  {props.post.photo&&<div className="">
    <img src={props.post.photo} alt="" className="w-100" />
  </div>}
  <div className=" d-flex justify-content-between p-3 align-items-center border-bottom ">
    <div className="d-flex ">
      <div className="d-flex me-5">
        {!values.like ? <i onClick={clickLike} class="fa-regular me-2  fs-2 fa-heart"></i>
        :<i onClick={clickLike} className="fa-solid fa-heart fs-2 heart me-2" />}
        <h5>{values.likes}</h5>
      </div>
      <div className="d-flex me-5">
        <i onClick={()=>{setC(!clickC)}} className="fa-regular fa-comment fs-2 me-2" />
        <h5>{values.comments.length}</h5>
      </div>
    </div>
  </div>
     {clickC?<Comment updateComments={updateComments} postId={props.post._id} comments={values.comments}/>:null}
      <section className="comments pb-3 pt-3 d-flex align-items-end">

                        <div className=" ms-4 pt-3 d-flex align-items-center w-75 me-4 ">
                            <input  value={text} onChange={handleChange} className="form-control pb-2" placeholder="Add a comment..." onKeyDown={handleKeyDown}/>
                        </div>        
                    </section>

</section>

</div>
    );
}
export default Posts