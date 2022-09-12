import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { read, unfollow } from "../api/api-post";
import Posts from "./Posts";
import auth from "./../auth/auth-help";
import jwt1 from "jwt-decode";
import { useParams } from "react-router";
import { follow } from "../api/api-post";
import {toast} from 'react-toastify';
// import dependency
import { checkFollow } from "../api/api-post";
import { getFeedUser } from "../api/api-post";
import { useNavigate, Link } from "react-router-dom";
import "./profile.css";
import logo from "../images/IMG-20201113-WA0051.jpg"; // with import
import NavBar from "./NavBar";

const Profile = () => {
  const params = useParams();
  console.log(params.id);
  const nav = useNavigate();

  const [value, SetValues] = useState({
    user: { following: [], followers: [] },
    following: false,
  });

  const [posts, setPosts] = useState([]);
  const jwt = auth.isAuthenticated();
  const user1 = jwt1(jwt.token);

  useEffect(() => {
    read({ userId: params.id }, { t: jwt.token }).then((res) => {
      if (res.name) {
        let following = checkFollow(res, user1.id);
        SetValues({ ...value, user: res, following: following });
        loadPost(res._id);
      }
    });
  }, [user1.id]);
  const loadPost = (user) => {
    getFeedUser(
      {
        userId: user,
      },
      {
        t: jwt.token,
      }
    ).then((data) => setPosts(data));
  };
const clickfollow  = ()=> {

      let callApi = value.following==false ? follow : unfollow
       callApi({userId : user1.id} ,
        {t:jwt.token},
           value.user._id
        ).then((data)=>{
          if(data)
          {
            console.log(data)
            if(!value.following)
             toast.success(`following ${value.user.name}!`,{position: toast.POSITION.TOP_RIGHT,autoClose:1000})
             else
             {
             toast.warn(`unfollowing ${value.user.name}!`,{position: toast.POSITION.TOP_RIGHT,autoClose:1000})
             }
            SetValues({...value, following: !value.following})
          }
        })
   }
  console.log(posts);
  console.log(value);
  return (
<div>
  <NavBar/>
      <section className="  container mt-3  py-5 rounded px-5">
      <div class="d-flex mb-5 mt-4 ms-lg-5 ps-lg-5 ms-0 ps-0">
        <div class="me-md-5 me-3 ms-lg-5 ms-0">
            <img src={value.user.image} alt=""  className="rounded-circle profile_img border border-light border-3"/>
        </div>

        <div class=" w-50">
            <h3 class="mt-3 mb-4">{value.user.name}</h3>
            <div class="d-flex mb-3 mt-2 ">
                <div class="d-flex me-4">
                    <p class="me-1">{posts.length}</p>
                    <p>posts</p>
                </div>

                <div class="d-flex me-4">
                    <p class="me-1">{value.user.followers.length}</p>
                    <p>followers</p>
                </div>

                <div class="d-flex me-4">
                    <p class="me-1">{value.user.following.length}</p>
                    <p>following</p>
                </div>
            </div>              
              {user1.id===params.id ? (<button onClick={()=>{
                nav('/user/edit/'+user1.id)
              }} type="button" className="btn btn-dark">
                <i className="fa-solid fa-pen me-2" />
                Edit profile
              </button>) : null}
              {user1.id!=params.id ?
              value.following===false?(<button onClick={clickfollow} type="button" className="ml-2 btn btn-success me-3">
                <i className="fa-solid fa fa-user-plus me-2"></i>
                Follow
            </button>) : (<button onClick={clickfollow} type="button" className="ml-2 btn btn-danger me-3">
                <i className="fa-solid fa fa-user-plus me-2"></i>
                Unfollow
            </button>) :null}
                
        </div>

    </div>
        {/* profile & cover img */}
        <section className="">
         <ul class="nav nav-pills mt-5 mt-lg-0 ms-lg-5 ms-0 " id="pills-tab" role="tablist">
        <li class="nav-item ms-xl-5 ms-0 ps-lg-4 ps-0" role="presentation">
          <button class="nav-link active ms-4" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">posts</button>
        </li>
        <li class="nav-item " role="presentation">
          <button class="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">followers</button>
        </li>
        <li class="nav-item " role="presentation">
          <button class="nav-link" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">following</button>
        </li>
      </ul>
      <div class="tab-content p-4" id="pills-tabContent">
              <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab" tabindex="0">
                          <div class="left  col-lg-9 col-sm-12  col-sm-12  h-100  border_radius mt-4 m-auto">

              {posts.map((post) => {
                return <Posts post={post} />;
              })}
              </div>
            </div>
            <div
              className="tab-pane fade"
              id="pills-profile"
              role="tabpanel"
              aria-labelledby="pills-profile-tab"
              tabIndex={0}
            >
                <section className="d-flex justify-content-around mt-4">
                     <div className="d-flex flex-column  col-5">

                {value.user.followers.map((pers, idx) => {
                  return(
                      <>
                          
                          <div onClick={()=>{window.location.href="/user/"+pers._id}} className="d-flex align-items-center p-2  mb-3 rounded p-3 hover">
                            <div>
                              <img
                                src={pers.image}
                                alt="profile"
                                style={{ width: 50 ,height:50}}
                                className="me-3 rounded"
                              />
                            </div>
                            <h6 className=" fw-bold">{pers.name}</h6>
                            <i className="fa-solid fa-ellipsis ms-auto fs-4" />
                          </div>
                      </>
                    
                  )
                })}
                   </div>
              </section>
            </div>
            <div
              className="tab-pane fade"
              id="pills-contact"
              role="tabpanel"
              aria-labelledby="pills-contact-tab"
              tabIndex={0}
            >

                  <section className="d-flex justify-content-around mt-4">
                     <div className="d-flex flex-column  col-5">

                {value.user.following.map((pers, idx) => {
                  return(
                      <>
                         
                     <div onClick={()=>{window.location.href="/user/"+pers._id}} className="d-flex align-items-center p-2  mb-3 rounded p-3 hover">
                            <div>
                              <img
                                src={(pers.image)}
                                alt="profile"
                                style={{ width: 50 ,height:50}}
                                className="me-3 rounded"
                              />
                            </div>
                            <h6 className=" fw-bold">{pers.name}</h6>
                            <i className="fa-solid fa-ellipsis ms-auto fs-4" />
                          </div>
                      </>
                    
                  )
                })}
                   </div>
              </section>


            </div>
          </div>
        </section>
      </section>
    </div>
  );
};

export default Profile;
