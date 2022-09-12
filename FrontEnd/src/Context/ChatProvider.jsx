import React, { createContext, useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router";


const ChatContext = createContext();


const ChatProvider = ({ children }) => {
 
   const v = useNavigate();

  const [user, setUser] = useState();
  
  const user1 = JSON.parse(localStorage.getItem("user1"));
 
  
    v("/login")
  


  return (
    <ChatContext.Provider
      value={{
         user,
         setUser,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;