import React, {useState, useEffect} from 'react'
import axios from "axios"


function AdminPanel() {

    
    const [users, setUsers] = useState()
    useEffect(()=> {
        const fetchUsers = async()=>{
            const res = await axios.get(`http://localhost:1337/users`)
            setUsers(res.data.length)
        }
        fetchUsers()
    },[])

    const initialValues = {
        price:0
    }

    
    const [purchase, setPurchases] =useState([])
    useEffect(()=>{

        const fetchData = async ()=> {
               const res = await axios.get(`http://localhost:1337/purchases`)
        setPurchases(res.data.length)
        }

        fetchData()
    },[])

    const [products, setProducts] = useState([]);
    useEffect(()=> {
        const fetchProduct = async()=>{
           const response =  await axios.get(`http://localhost:1337/products`)
          setProducts(response.data.length)
        }
        fetchProduct()
    }, [])



    return (
        <div>
            Products avalible in shop: {products} <br/>
            Orders made on this website: {purchase} <br/>
            Users registered: {users}
        </div>
    )
}

export default AdminPanel

