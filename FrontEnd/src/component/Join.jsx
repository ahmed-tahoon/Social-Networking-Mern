import React from "react";
import Post from "./Post";
import Posts from "./Posts";
import auth from "./../auth/auth-help";
import jwt1 from "jwt-decode"; // import dependency
import { getSender } from "../config/chatLogic";
import Avatar from "@mui/material/Avatar";
import { useRef } from "react";
import { useEffect } from "react";
import Tooltip from "@mui/material/Tooltip";
import "./chat.css";
import { io } from "socket.io-client";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import GridLoader from "react-spinners/GridLoader";
import SendIcon from "@mui/icons-material/Send";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";
import { Typography } from "@mui/material";
import { searchuser } from "../api/api-post";
import { getSenderFull } from "../config/chatLogic";
import FindPeople from "./FindPeople";
import Box from "@mui/material/Box";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getChat } from "../api/api-post";
import { setMessage } from "../api/api-post";
import { fetchChats } from "../api/api-post";
import BounceLoader from "react-spinners/BounceLoader";
import MoonLoader from "react-spinners/MoonLoader";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import { getMessage } from "../api/api-post";
import Stack from "@mui/material/Stack";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import Autocomplete from "@mui/material/Autocomplete";
import { toast } from "react-toastify";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../config/chatLogic";

var socket;
var selectedChatCompare;
const Join = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [open, setOpen] = useState(false);
  const [value1, setValue1] = useState({});
  const [chats, setChats] = useState([]);
  const [notification, setNotification] = useState([]);
  const [chat, setChat] = useState([]);
  const [selectChat, setSelectChat] = useState(false);
  const [socketcon, Setsocketc] = useState(false);
  const [loading1, Setloading1] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [lastM, setLastM] = useState([]);
  const [typing, setTyping] = useState(false);
  const [istyping, setIsTyping] = useState(false);
  const jwt = auth.isAuthenticated();
  const user1 = jwt1(jwt.token);
  const loading = searchResult.length != 0 && open;
  const [anchorEl, setAnchorEl] = useState(null);
  const [fetchAgain, setFetchAgain] = useState(false);
  const [mode, setMode] = useState("light");

  const [l, sl] = useState("");
  const open1 = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (chat) => {
    setAnchorEl(null);
  };
  const handleClose1 = (notiy) => {
    setAnchorEl(null);
    setSelectChat(true);
    setChat(notiy.chat);
    selectedChatCompare = chat;
    fetchMessages();
    setNotification(notification.filter((e) => e !== notiy));
    // Get(chat)
  };
  function padTo2Digits(num) {
    return String(num).padStart(2, "0");
  }

  const fetchMessages = async () => {
    if (!selectChat) return;

    try {
      await getMessage(
        {
          userId: user1.id,
        },
        {
          t: jwt.token,
        },
        chat._id
      ).then((data) => {
        setMessages(data);
        socket.emit("join chat", chat._id);
        console.log(data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const Get = async (v) => {
    if (!v) return;
    Setloading1(true);
    setValue1(v);
    await getChat(
      {
        userId: user1.id,
      },
      {
        t: jwt.token,
      },
      v._id
    ).then((data) => {
      if (data) {
        setSelectChat(true);
        setChat(data);
        selectedChatCompare = chat;
        fetchMessages();
        Setloading1(false);
      }
    });
  };
  const PostMessage = async () => {
    if (!newMessage) return;
    setNewMessage("");
    socket.emit("stop typing", chat._id);

    await setMessage(
      { id: user1.id, chatId: chat._id, content: newMessage },
      {
        t: jwt.token,
      }
    ).then((data) => {
      socket.emit("new message", data);
      setMessages([...messages, data]);
      setFetchAgain(!fetchAgain);
    });
  };

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

  useEffect(() => {
    fetchMessages();
    selectedChatCompare = chat;
  }, [chat]);

  useEffect(() => {
    console.log(user1);
    socket = io("http://localhost:4000/");
    socket.emit("setup", user1);
    socket.on("connected", () => Setsocketc(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));
  }, []);

  useEffect(() => {
    fetchChats(
      {
        userId: user1.id,
      },
      {
        t: jwt.token,
      }
    ).then((data) => {
      if (data) setChats(data);
      console.log(data);
    });
  }, [fetchAgain]);
  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
      if (
        !selectedChatCompare || // if chat is not selected or doesn't match current chat
        selectedChatCompare._id !== newMessageRecieved.chat._id
      ) {
        if (!notification.includes(newMessageRecieved)) {
          setNotification([newMessageRecieved, ...notification]);
          setFetchAgain(!fetchAgain);
        }
      } else {
        setMessages([...messages, newMessageRecieved]);
        setFetchAgain(!fetchAgain);
      }
    });
  });

  const [ChatColor, setChatColor] = useState("white");
  const [Color3, setColor3] = useState("white");
  const [TextColor, setTextC] = useState("black");
  const [Color4, setColor4] = useState("#dee2e6");
  const [STextColor, setStext] = useState("gray");
  const [backim, setbsckim] = useState("123.png");
  const [fchatc, setf] = useState("#b8ebb4");
  const [schatc, setsc] = useState("white");
  const [ima, setim] = useState("123.png");

  const change = (mode) => {
    if (mode == "dark") {
      setChatColor("#444F5A");
      setColor3("#222831");
      setTextC("white");
      setColor4("#222831");
      setStext("#D8D3CD");
      setbsckim("jbVvEcAi.jpg");
      setf("#274528");
      setsc("#393E46");
      setim("jbVvEcAi.jpg");
    } else {
      setChatColor("white");
      setColor3("white");

      setim("123.png");
      setTextC("black");
      setColor4("#dee2e6");
      setStext("gray");
      setbsckim("123.png");
      setf("#b8ebb4");
      setsc("white");
    }
  };

  const typingHandler = (e) => {
    setNewMessage(e.target.value);

    if (!socketcon) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", chat._id);
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", chat._id);
        setTyping(false);
      }
    }, timerLength);
  };
  const messagesEndRef = useRef();
  const scrollToBottom = () => {
    messagesEndRef.current &&
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      PostMessage();
    }
  }
  useEffect(scrollToBottom, [messages]);
  return (
    <div>
      <div>
        <section className="vh-100 d-flex grey2">
          <div
            className="col-4 p-0 h-100 "
            style={{ backgroundColor: `${Color4}` }}
          >
            <div
              className="justify-content-between border p-3  d-flex align-items-start grey"
              style={{ backgroundColor: `${Color3}`, color: `${TextColor}` }}
            >
              <h5 className="font-weight-bold ms-3 mt-1">Chats</h5>

              <div className="rounded input-group m-0 ps-3 pe-5">
                <Stack spacing={1} sx={{ width: 100 }}>
                  <Autocomplete
                    className="rounded"
                    size="small"
                    id="asynchronous-demo"
                    sx={{ width: 250 }}
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
                    onChange={(event, value) => Get(value)} // prints the selected value
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
                        sx={{ p: "0px" }}
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
              <div className={"ml-2"}>
                <Stack
                  spacing={4}
                  direction="row"
                  sx={{ color: "action.active" }}
                >
                  <Badge
                    id="fade-button"
                    aria-controls={open1 ? "fade-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open1 ? "true" : undefined}
                    onClick={handleClick}
                    color="secondary"
                    badgeContent={notification.length}
                  >
                    <MailIcon color="primary" fontSize="large" />
                  </Badge>
                </Stack>
                <Menu
                  id="fade-menu"
                  MenuListProps={{
                    "aria-labelledby": "fade-button",
                  }}
                  anchorEl={anchorEl}
                  open={open1}
                  onClose={handleClose}
                  TransitionComponent={Fade}
                >
                  {notification.length == 0 ? (
                    <MenuItem onClick={handleClose}>No Message</MenuItem>
                  ) : (
                    <div>
                      {notification.map((notify) => {
                        return (
                          <MenuItem onClick={() => handleClose1(notify)}>
                            "New Message from : "
                            {getSender(user1, notify.chat.users)}
                          </MenuItem>
                        );
                      })}
                    </div>
                  )}
                </Menu>
              </div>
            </div>
            <div className="justify-content-center scroll overflow-auto px-3 mt-2">
            <div className=" mb-2">
              <i
                className={"fa fa-moon-o btn btn-dark mb-1 "}
                onClick={() => change("dark")}
              >
                dark
              </i>
              <button
                className={"fa fa-moon-o btn btn-light mb-1"}
                onClick={() => change("light")}
              >
                light
              </button>
              </div>
              {chats.map((chat) => {
                return (
                  <div>
                  {chat.latestMessage &&
                  <div
                    className="d-flex text-white align-items-center justify-content-between px-3 py-1 hovering shadow-sm  mb-1 
              border-radius"
                    onClick={() => {
                      Setloading1(true);
                      setTimeout(function () {
                        Setloading1(false);
                        setSelectChat(true);
                        setValue1(getSenderFull(user1, chat.users));
                        setChat(chat);
                      }, 700);
                    }}
                    style={{
                      backgroundColor: `${ChatColor}`,
                    }}
                  >
                    <div className="d-flex align-items-center">
                      <img
                        src={getSenderFull(user1, chat.users).image}
                        alt=""
                        className="rounded-circle me-3"
                        width="50px"
                        height="50px"
                      />
                      <div className="mt-3">
                        <h6
                          style={{ color: `${TextColor}` }}
                          className="m-0 text-lg-left font-weight-bold"
                        >
                          {getSender(user1, chat.users)}
                        </h6>
                        {chat.latestMessage ? (
                          <p style={{ color: `${STextColor}` }}>
                            {chat.latestMessage.content}
                          </p>
                        ) : null}
                      </div>
                    </div>
                    <div className="">
                      {chat.latestMessage ? (
                        <p
                          className="m-0 mb-2"
                          style={{ color: `${STextColor}` }}
                        >
                          {new Date(
                            chat.latestMessage.createdAt
                          ).toLocaleTimeString("en-US", {
                            // en-US can be set to 'default' to use user's browser settings
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      ) : null}
                    </div>
                  </div>}
                  </div>
                );
              })}
            </div>
          </div>
          {selectChat ? (
            <div className="col-8 h-100 p-0 ">
              <div
                style={{
                  backgroundColor: `${Color3}`,
                }}
                className="d-flex ps-3 pe-4 py-3 border justify-content-between"
              >
                <div className="d-flex">
                  <img
                    src={value1.image}
                    alt=""
                    className="rounded-circle me-2"
                    width="40px"
                    height="40px"
                  />
                  <div className="">
                    <h6
                      style={{
                        color: `${TextColor}`,
                      }}
                      className="font-weight-bold mt-2"
                    >
                      {value1.name}
                    </h6>
                  </div>
                </div>
                <i
                  onClick={() => setSelectChat(false)}
                  className="fa fa-window-close fs-4 text-secondary"
                />
              </div>
              <div
                style={{
                  backgroundImage: `url(../images/${backim})`,
                }}
                className="scroll2 overflow-auto mb-0 px-5 py-3"
              >
                {messages &&
                  messages.map((m, i) => (
                    <div style={{ display: "flex" }} key={m._id}>
                      <p
                        className="d-inline-block rounded"
                        style={{
                          color: `${TextColor}`,
                          backgroundColor: `${
                            m.sender._id === user1.id ? fchatc : schatc
                          }`,
                          marginLeft: isSameSenderMargin(
                            messages,
                            m,
                            i,
                            user1.id
                          ),
                          marginTop: isSameUser(messages, m, i, user1.id)
                            ? 3
                            : 10,
                          borderRadius: "20px",
                          marginBottom: "0px",
                          padding: "5px 15px",
                          maxWidth: "75%",
                        }}
                      >
                        {m.content}
                      </p>
                    </div>
                  ))}
                {istyping ? (
                  <div
                    style={{ marginBottom: 15, marginLeft: 0 }}
                    className="d-flex justify-content-end mt-4"
                  >
                    <div className="circle me-1 circle1" />
                    <div className="circle me-1 circle2" />
                    <div className="circle me-1 circle3" />
                    <div className="circle me-1 circle4" />
                  </div>
                ) : null}
                <div ref={messagesEndRef} />
              </div>
              <div
                className="d-flex align-items-center py-2 justify-content-center px-4 "
                style={{
                  backgroundColor: `${ChatColor}`,
                }}
              >
                <i className="fa-regular fa-face-laugh-beam fs-4 me-3 text-secondary" />
                <i className="fa-solid fa-paperclip fs-4 me-3 text-secondary" />
                <input
                  style={{
                    backgroundColor: `${Color4}`,
                    color:`${TextColor}`
                  }}
                  value={newMessage}
                  onChange={typingHandler}
                  type="text"
                  className="form-control grey p-2"
                  placeholder="type a message"
                  aria-label="First name"
                  onKeyDown={handleKeyDown}
                />
                <i
                  onClick={PostMessage}
                  aria-hidden="true"
                  className="fa fa-paper-plane bg-primary green px-4 py-2 ms-3 rounded"
                />
              </div>
            </div>
          ) : (
            <div
              style={{
                backgroundImage: `url(../images/${ima})`,
              }}
              className="scroll2 col-8 h-100 p-0 bg-black"
            >
              {!loading1 ? (
                <h1 className="f align-center" style={{ color: TextColor }}>
                  {user1.name}, Select any Chat
                </h1>
              ) : (
                <GridLoader className="f align-center" color="#3667d6" />
              )}
            </div>
          )}
        </section>
      </div>

      <div></div>
    </div>
  );
};

export default Join;
