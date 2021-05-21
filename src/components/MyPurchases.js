import React, {useState, useEffect} from 'react'
import axios from "axios"
import Purchase from "./purchase"

function MyPurchases() {

    const [purchase, setPurchases] =useState([])
    const userId = localStorage.getItem("userId")
    const token = localStorage.getItem("jwt")

    useEffect(()=>{

        
        const fetchData = async ()=> {
               const res = await axios.get(`http://localhost:1337/purchases?user.id=${userId}`, {
                   headers: {
                       Authorization: `bearer ${token}` 
                   }
               })
               console.log(res.data[0])
        setPurchases(res.data)
        
        }

        fetchData()
    },[])


    return (
        <>

        <h1><strong>My Purchases</strong></h1>
        <div className="flex items-center justify-center flex-wrap mx-auto">
            
            {purchase.map( (purchase)=>{
                return(
                <Purchase key={purchase.id} product={purchase.product.Name} delivery={purchase.typeOfDelivery} price={purchase.product.Price} image={purchase.product.Img.formats.thumbnail.url} />
                )
            })}

        </div>
        </>
    )
}

export default MyPurchases
