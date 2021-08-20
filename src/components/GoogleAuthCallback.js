import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import server from "./config"

function GoogleAuthCallback() {
  const [auth, setAuth] = useState()
  
  const location = useLocation()
  useEffect(() => {
    if (!location) {
      return
    }
    const {search} = location
    console.log(auth.user.id)
    axios({
      method: 'GET',
      maxContentLength:16384111,
      
      url: `${server}auth/google/callback?${search}`,
      
        
      
    })
      .then((res) => res.data)
      .then(setAuth)
  }, [location])

  return (
    <div>
      {auth && (
        <>
        
          <div>Jwt: {auth.jwt}</div>
          <div>User Id: {auth.user.id}</div>
          <div>Provider: {auth.user.provider}</div>
        </>
      )}
    </div>
  )
}

export default GoogleAuthCallback
