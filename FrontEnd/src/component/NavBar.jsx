import React from 'react'
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import { useState } from 'react';

import auth from './../auth/auth-help'
import jwt1 from 'jwt-decode' // import dependency
import logo from "../images/IMG-20201113-WA0051.jpg"; // with import
import { read } from '../api/api-post';
 

import Post from "./Post";
import Posts from "./Posts";
import { getSender } from "../config/chatLogic";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import "./chat.css";
import { io } from "socket.io-client";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import GridLoader from "react-spinners/GridLoader";
import SendIcon from '@mui/icons-material/Send';
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";
import { Typography } from "@mui/material";
import { searchuser } from "../api/api-post";
import { getSenderFull } from "../config/chatLogic";
import FindPeople from "./FindPeople";
import Box from "@mui/material/Box";
import BounceLoader from "react-spinners/BounceLoader";
import MoonLoader from "react-spinners/MoonLoader";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import { getMessage } from "../api/api-post";
import Stack from "@mui/material/Stack";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import Autocomplete from "@mui/material/Autocomplete";
import { toast } from "react-toastify";
const NavBar = () => {
  const [search, setSearch] = useState("");
        const [anchorEl, setAnchorEl] = useState(null);

    const open1 = Boolean(anchorEl);

      const [searchResult, setSearchResult] = useState([]);
      const [open, setOpen] = useState(false);
const loading = searchResult.length != 0 && open;
    const jwt = auth.isAuthenticated()
  const user1 = jwt1(jwt.token);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (chat) => {
    setAnchorEl(null);
  };
  const handleClose1 = (notiy) => {
    setAnchorEl(null);
    // Get(chat)
  };
  function padTo2Digits(num) {
  return String(num).padStart(2, '0');
}
  const nav=useNavigate();
   const [values, setValues] = useState({
  })


  console.log(user1);

useEffect(() => {
    searchuser(
      {
        userId: user1.id,
      },
      {
        t: jwt.token,
      },
      {
        search: search,
      }
    ).then((data) => {
      if (search != "") setSearchResult(data);
      else setSearchResult([]);
    });
  }, [search]);

  useEffect(()=>{

     read( {userId: user1.id
    },{
      t: jwt.token
    },).then((data)=>{
        if(data)
        console.log(data)
        setValues({...values,id:data._id,name:data.name , email:data.email , image:data.image , about:data.about,update:data.updated});
    })
    
  },[])


  return (
    <div>
    <nav className="py-2 position-fixed top-0 pr-4 start-0 w-100 shadow-sm">
  <div className="container d-flex justify-content-between align-items-center w-100 bg-white">
    <a style={{ textDecoration: "none", color: "black" }}>
      <h1 onClick={()=>{nav('/')}}  className="logo fs-3 fw-bold">Piqosocial</h1>
    </a>
    <div className="mr-5 position-relative d-flex">
      <Stack sx={{ width: 100}}> 
       <Autocomplete
       className="rounded"
         size="small"
          id="asynchronous-demo"
          sx={{ width: 200 }}
          options={searchResult}
          loading={loading}
          open={open}
          onOpen={() => {
            setOpen(true);
          }}
          onClose={() => {
            setOpen(false);
            //setSearchResult([])
          }}
          onChange={(event, value) => nav("/user/"+value._id)} // prints the selected value
          autoHighlight
          getOptionLabel={(option) => option.name}
          renderOption={(props, option) => (
            <Box
              component="li"
              sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
              {...props}
            >
              <img
                className="rounded-circle me-3"
                loading="lazy"
                width="30"
                height="30"
                src={option.image}
                //srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                alt=""
              />
              {option.name}
            </Box>
          )}
          renderInput={(params) => (
            <TextField
            className={"rounded bg-white"}
              sx={{ p: '0px' }}
              size="small"
              onChange={(e) => setSearch(e.target.value)}
              {...params}
              placeholder="Search To Chat"
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <React.Fragment>
                    {loading ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </React.Fragment>
                ),
              }}
            />
          )}
        />
      </Stack>
    </div>
    <div className="logo rounded-circle d-flex align-items-center">
      <i  className="fa-solid fa-right-to-bracket fs-3 me-4" onClick={()=>{
        localStorage.removeItem("userInfo1")
         nav('/')
        }} />
      <i className="fa fa-paper-plane me-4 fs-3" onClick={()=>{nav('/chat/join')}} />
      <div  onClick={()=>{nav('/user/'+values.id)}}>
        <img
          src={values.image}
          alt="profile"
          width="40px"
          height="40px"
          className="rounded-circle"
         
        />
        </div>
    </div>
  </div>
</nav>

    {/*---------------------------------------------------------navbar----------------------------------------------------------*/}
  
    
    </div>
  )
}

export default NavBar