import React, {useState, useEffect} from 'react'
import {Link} from "react-router-dom";
import axios from "axios"




function AdminPanel() {

    const [purchase, setPurchases] =useState([])
    const [products, setProducts] = useState([]);
    const [users, setUsers] = useState([])

    useEffect(()=> {
        const fetchUsers = async()=>{
            const res = await axios.get(`http://localhost:1337/users`)
            setUsers(res.data.length)
        }
        fetchUsers()

        const fetchProduct = async()=>{
            const response =  await axios.get(`http://localhost:1337/products`)
           setProducts(response.data.length)
         }
         fetchProduct()

         const fetchData = async ()=> {
            const res = await axios.get(`http://localhost:1337/purchases`)
            setPurchases(res.data.length)
        }
        fetchData()

    },[])



    return (
<>
        <div className="min-h-screen flex items-center justify-center px-4">
    
    <div className="max-w-4xl  bg-white w-full rounded-lg shadow-xl">
        <div className="p-4 border-b">
            <h2 className="text-2xl ">
                Admin information
            </h2>
            <p className="text-sm text-gray-500">
                Analytical details
            </p>
        </div>
        <div>
            <div className="md:grid md:grid-cols-3 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
                <p className="text-gray-600">
                Products avalible in shop:
                </p>
                <p>
                    {products}
                </p>
                <Link className="text-md block px-3 py-2 rounded-lg w-full
            bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none" to="/products">See all products</Link> 
            </div>

            <div className="md:grid md:grid-cols-3 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
                <p className="text-gray-600">
                Orders made on this website:
                </p>
                <p>
                    {purchase}
                </p>
                <Link className="text-md block px-3 py-2 rounded-lg w-full
            bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none" to="/allPurchases">See all purchases</Link> 
            </div>

            <div className="md:grid md:grid-cols-3 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
                <p className="text-gray-600">
                    Users registered:
                </p>
                <p>
                    {users}
                </p>
                <Link className="text-md block px-3 py-2 rounded-lg w-full
            bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none" to="/users">See all users</Link> 
            </div>
        </div>
    </div>
    </div>

        {/* <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        ariaHideApp={false}
        contentLabel="Example Modal"
        >
            <div>Are you sure you want to delete your account? This is a non reverseable act! </div>
            <button className="mt-3 text-lg font-semibold 
            bg-black w-full text-white rounded-lg 
            px-1 py-3 block shadow-xs hover:bg-gray-700" onClick={handleDelete}> Delete ! </button>
            <button className="mt-3 text-lg font-semibold 
            bg-black w-full text-white rounded-lg 
            px-1 py-3 block shadow-xs hover:bg-gray-700" onClick={closeModal}> Back </button>
        </Modal> */}

</>
        
    )
}

export default AdminPanel

