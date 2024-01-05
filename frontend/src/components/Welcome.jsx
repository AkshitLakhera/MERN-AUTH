// import React from 'react'

import { useEffect, useState } from "react"
import axios from "axios"
axios.defaults.withCredentials =true;
const Welcome = () => {
  const[user,setuser] = useState()
  const sendRequest = async () => {
    const res = await axios.get('http://localhost:5000/api/user',{
      withCredentials:true
    }).catch(err => console.log(err))
    const data= res.data;
    return data
  }
  useEffect(() => {
 sendRequest().then( (data) => setuser(data.user))
  } , [])

  return (
    <div>
      {user && <h1>{user.name}</h1>}
    </div>
  )
}

export default Welcome