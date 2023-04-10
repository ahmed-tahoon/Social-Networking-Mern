



const create = async (params, credentials, post) => {

  try {
       const requestOptions = {
        method: 'POST',
        headers: { 
        'Accept': 'application/json',
        'Content-Type': 'application/json',
       'Authorization': credentials.t
        },
        authorization : credentials.t,
        body: JSON.stringify(post), 
    };

  let response = await fetch('/api/post/'+params.userId,requestOptions)

    const Data = await response.json();
     return Data;
  } catch(err) {
    return err
  }
}

const getFeed = async (params, credentials,signal)=>{
       try {
       const requestOptions = {
        method: 'Get',
        signal: signal,
        headers: { 
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': credentials.t
        },
        authorization : credentials.t,
        
    };

    let response = await fetch('/api/post/feed/'+params.userId,requestOptions)

    const Data =  response.json();
     return Data;
  } catch(err) {
    return err
  }


}

const getFeedUser = async (params, credentials,signal)=>{
       try {
       const requestOptions = {
        method: 'Get',
        signal: signal,
        headers: { 
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': credentials.t
        },
        authorization : credentials.t,
        
    };

    let response = await fetch('/api/post/feedUser/'+params.userId,requestOptions)

    const Data = await response.json();
     return Data;
  } catch(err) {
    return err
  }


}
const findPeoplee = async (params, credentials,signal) => {
  try {
    let response = await fetch('/api/users/findpeople/' + params.userId, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': credentials.t,
         signal: signal,

      }
    })    
    return await response.json()
  } catch(err) {
    console.log(err)
  }
}
const remove = async (params, credentials) => {
  try {
    let response = await fetch('/api/post/' + params.postId, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': credentials.t
      }
    })
    return await response.json()
  } catch(err) {
    console.log(err)
  }
}

const follow =async (params, credentials, followId)=>{

  console.log("fl")

try {
    let response = await fetch('/api/users/follow/', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': credentials.t
      },
      body: JSON.stringify({userId:params.userId, followId: followId})
    })
    return await response.json()
  } catch(err) {
    console.log(err)
  }

}

const unfollow =async (params, credentials, unfollowId)=>{
  console.log("unfl")



try {
    let response = await fetch('/api/users/unfollow/', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': credentials.t
      },
      body: JSON.stringify({userId:params.userId, unfollowId: unfollowId})
    })
    return await response.json()
  } catch(err) {
    console.log(err)
  }

}

const Like =async(params ,credentials, postId  )=>{

  try {
    
    let response = await fetch('/api/post/like',
    {
      method :'PUT',
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': credentials.t
      },
      body :JSON.stringify({userId:params.userId, postId: postId})
    })
    return await response.json()

  } catch (error) {
        console.log(error)
  }
}


const unlike =async(params ,credentials, postId  )=>{

  try {
    
    let response = await fetch('/api/post/unlike',
    {
      method :'PUT',
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': credentials.t
      },
      body :JSON.stringify({userId:params.userId, postId: postId})
    })
    return await response.json()

  } catch (error) {
        console.log(error)
  }
}

const comment = async (params, credentials, postId, comment) => {
  try {
    let response = await fetch('/api/post/comment/', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': credentials.t
      },
      body: JSON.stringify({userId:params.userId, postId: postId, comment: comment})
    })
    return await response.json()
  } catch(err) {
    console.log(err)
  }
}

const read = async (params, credentials, signal) => {
  try {
    let response = await fetch('/api/users/' + params.userId, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': credentials.t
      }
  })
    return await response.json()
  } catch(err) {
    console.log(err)
  }
}
const checkFollow = (user,jwt) => {
    const match = user.followers.some((follower)=> {
      return follower._id == jwt
    })
    return match
  }



const update = async (params, credentials, Values) => {
  let v = {name:"FFF"}
  try {
    let response = await fetch('/api/users/update/' + params.userId, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization':credentials.t
      },
      body:  JSON.stringify(Values),
    })
    return await response.json()
  } catch(err) {
    console.log(err)
  }
}
const uncomment = async (params, credentials, postId, comment) => {
console.log(params.userId , postId , comment)

  try {
    let response = await fetch('/api/post/uncomment/', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization':credentials.t
      },
      body: JSON.stringify({userId:params.userId, postId: postId, comment: comment})
    })
    return await response.json()
  } catch(err) {
    console.log(err)
  }
}

const searchuser = async (params, credentials,se) => {
  console.log(se);
  try {
    let response = await fetch(`/api/users/?search=${se.search}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': credentials.t,
      }
    })    
    return await response.json()
  } catch(err) {
    console.log(err)
  }
}

const getChat = async (params, credentials,se) => {
  try {
    let response = await fetch(`/api/chat/`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': credentials.t,
      },
      body: JSON.stringify({userId:params.userId,id:se})
    })    
    return await response.json()
  } catch(err) {
    console.log(err)
  }
}

const getMessage = async (params, credentials,se) => {
  console.log(se)
  try {
    let response = await fetch(`/api/message/${se}`, {
      method: 'Get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': credentials.t,
      }
    })    
    return await response.json()
  } catch(err) {
    console.log(err)
  }
}

const setMessage = async (params, credentials,se) => {
  console.log(params)
  try {
    let response = await fetch(`/api/message/`, {
      method: 'Post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': credentials.t,
      },
      body:JSON.stringify(params)
    })    
    return await response.json()
  } catch(err) {
    console.log(err)
  }
}


const fetchChats = async (params, credentials,se) => {
  try {
    let response = await fetch(`/api/chat/`, {
      method: 'Get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': credentials.t,
      }
    })    
    return await response.json()
  } catch(err) {
    console.log(err)
  }
}


export  {searchuser,fetchChats,setMessage,getChat,getMessage,create,update,remove,getFeed,findPeoplee,follow,unfollow,Like,unlike,comment,uncomment,read,checkFollow,getFeedUser}
