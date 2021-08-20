import React, {useState, useEffect} from 'react'
import axios from "axios"
import Purchase from "./purchase"
import server from "./config"


function AllPurchases() {
    const [purchase, setPurchases] =useState([])
   

    useEffect(()=>{
        const token = localStorage.getItem("jwt")
        const fetchData = async ()=> {    
               const res = await axios.get(`${server}purchases`, {
                   headers: {
                       Authorization: `bearer ${token}` 
                   }
               })
        setPurchases(res.data)
        
        }

        fetchData()
    },[])


    return (
        <>

        <h1><strong>All Purchases</strong></h1>
        <div className="flex items-center justify-center flex-wrap mx-auto">
            
            {purchase.map( (purchase)=>{
                return(
                <Purchase key={purchase.id} product={purchase.product.Name} delivery={purchase.typeOfDelivery} price={purchase.product.Price} image={purchase.product.Img.formats.thumbnail.url} quantity={purchase.quantity} />
                )
            })}

        </div>
        </>
    )
}

export default AllPurchases
