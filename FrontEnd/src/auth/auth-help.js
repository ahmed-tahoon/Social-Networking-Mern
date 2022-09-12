const auth = {
  isAuthenticated() {
    if (typeof window == "undefined")
      return false

    if (localStorage.getItem('userInfo1'))
      return JSON.parse(localStorage.getItem('userInfo1'))
    else
      return false
  },
  
}

export default auth