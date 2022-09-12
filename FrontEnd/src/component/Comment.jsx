import React from 'react'
import { useState } from 'react';
import { uncomment } from '../api/api-post';
import auth from './../auth/auth-help'
import jwt1 from 'jwt-decode' // import dependency

const Comment = (props) => {
let [st , Setst]=useState(0)
let [x , setx]=useState(2)
let [comments,setComments]=useState(props.comments)
const jwt = auth.isAuthenticated()
const user1 = jwt1(jwt.token);
console.log(props.comments)

const deleteComment = comment => event => {
    uncomment({
      userId: user1.id
    }, {
      t: jwt.token
    }, props.postId,comment).then((data)=>{
      props.updateComments(data.comments)
    })
  }

  return (
      <>
    <div>
    {comments.length>0 ?
       <section className="d-flex flex-column white border_radius  p-2">
       {props.comments.slice(st,x).map((item)=>{
           return ( 
    <div>
    
  <div className=" pt-3 d-flex align-items-start me-4">
  <div className="name d-flex ">
    <div>
      <img
        src={item.commentedBy.image}
        alt="profile"
        style={{ width: 50 ,height:50}}
        className="rounded-circle me-3"
      />
    </div>
    <div>
      

      {item.commentedBy._id==user1.id ?<i onClick={deleteComment(item)} className="fa-regular fa-trash-can position-absolute fs-5 mr-3 trash" />:null}
      <h5 className="mb-1 text fs-5">{item.commentedBy.name}</h5>
      <p className="comment-text-sm">{item.text}</p>
    </div>
  </div>
  </div>
  <div className="border-bottom d-flex ps-5">
  </div>
    
  
 </div> 
           )

       })}
  {comments.length>=2 ?<button  className="btn btn-light" onClick={()=>{setx(x+4)}}>show more</button> :null} 
</section>:null}

    </div>
</>
  )
}

export default Comment