import axios from 'axios'
import React, {useEffect, useState} from 'react'
import fire from "./images/fire.jpg";

function API() {

    const [data, setData ] = useState([])

    useEffect(()=> {
        
        const fetchData = async()=> {
            const response = await axios.get("https://localhost:1337/bookings?user_premission_user.id=14")
            const res = response.data
            setData(res)
        }
        fetchData()
    }, [])

    
    return (
        <div>
            {/* Data: {data.map((singleData)=>{return( <h1 key={singleData.Id}> {singleData.title} </h1>
                )})} */}

         <div> </div>
           
        </div>
    )
}

export default API
