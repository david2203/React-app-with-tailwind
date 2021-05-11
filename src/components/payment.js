import React, {useEffect, useState} from 'react'
import axios from "axios";
import ModalComponent from "./modal"

function Payment() {

    const [bookings, setBookings] = useState([]);

    useEffect(()=> {

        // jwt gör att bara "legit" användare kan komma in

        const fetchBooking = async()=>{
           const response =  await axios.get("http://localhost:1337/bookings")
           console.log(response.data)
           setBookings(response.data)
        }
        fetchBooking()
        
    }, [])

    
    return (
        <div>
            <ModalComponent/>
        </div>
    )
}

export default Payment
