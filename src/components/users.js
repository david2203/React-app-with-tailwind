import React, {useState, useEffect} from 'react'
import axios from "axios"
import UserCard from "./userCard"
import server from "./config"

function Users() {

    const [users, setUsers] = useState([])
   

    useEffect(()=>{

        
        const token = localStorage.getItem("jwt")
        const fetchData = async ()=> {    
               const res = await axios.get(`${server}users`, {
                   headers: {
                       Authorization: `bearer ${token}` 
                   }
               })
        setUsers(res.data)
        
        }
        fetchData()
        
    },[]) 

    

    return (
        <div>
            {users.map( (user)=>{
                return(
                <UserCard key={user.id} id={user.id} username={user.username} email={user.email} role={user.isAdmin}/>
                )
            })}
        </div>
    )
}

export default Users
