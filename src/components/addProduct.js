import React, {useState, useEffect} from 'react';
import axios from "axios";



function AddProduct() {

    const [isAdmin, setIsAdmin] = useState(false)
    

    useEffect ( ()=>{
        const userId = localStorage.getItem("userId")
        const fetchRole = async()=>{
        const response = await axios.get(`http://localhost:1337/users?id=${userId}`)
        setIsAdmin(response.data[0].isAdmin)
    }
    fetchRole()

    },[])
    //initial values
    const initialValues = {
        Name:"",
        Description:"",
        Price:0
    }

    //state
    const [addProductValues, setAddProductValues] = useState(initialValues)
    const [fileData, setFileData] = useState()
    //onhandleChange
    function handleOnChange(e) {
        setAddProductValues({...addProductValues,[e.target.name]:e.target.value})
    }
    function handleOnChangeImg(e) {
        setFileData(e.target.files[0])
    }

    //on submit
    function handleOnSubmit(e) {
        e.preventDefault()
       

        axios.post("http://localhost:1337/products", {
            Name:addProductValues.name,
            Description:addProductValues.description,
            Price:addProductValues.price
        }).then ( (res)=> {
            

            const formData = new FormData()
            formData.append("files", fileData)

            //sql liknande mapping
            formData.append("ref", "product")
            formData.append("refId", res.data.id)
            formData.append("field", "Img")


            axios.post("http://localhost:1337/upload",formData)
            .then( (response) => {console.log(response.data)})
            .catch( (err)=>{console.log(err)})
        }).catch ( (err)=> {
            console.log(err)
        })
    }
    
    
    



    return (
        <>
        {isAdmin? ( 
            <form className="mt-8" onSubmit={handleOnSubmit}>
            <h1>Product info:</h1>
                    <div className="mx-auto max-w-lg ">
                        <div className="py-1">
                            <span className="px-1 text-sm text-gray-600">Product name:</span>
                            <input placeholder="" type="text" name="name" value={addProductValues.name} onChange={handleOnChange}
                                   className="text-md block px-3 py-2 rounded-lg w-full
            bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"/>
                        </div>
                        <div className="py-1">
                            <span className="px-1 text-sm text-gray-600">Description:</span>
                            <input placeholder="" name="description" value={addProductValues.description} onChange={handleOnChange}
                                   className="text-md block px-3 py-2 rounded-lg w-full
            bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"/>
                        </div>
                        <div className="py-1">
                            <span className="px-1 text-sm text-gray-600">Price:</span>
                            <input placeholder=""  name="price" type="number" value={addProductValues.price} onChange={handleOnChange}
                                   className="text-md block px-3 py-2 rounded-lg w-full
            bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"/>
                        </div>
                        <div className="py-1">
                            <span className="px-1 text-sm text-gray-600">Image:</span>
                            <input type="file" name="file" onChange={handleOnChangeImg} 
                                   className="text-md block px-3 py-2 rounded-lg w-full
            bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"/>
                        </div>

                        
                        
                        <button className="mt-3 text-lg font-semibold
        bg-gray-800 w-full text-white rounded-lg
        px-6 py-3 block shadow-xl hover:text-white hover:bg-black">
                            Add product
                        </button>
                    </div>
                </form>
        ):(<div> You dont have premission to add products, Please ask an admin if you want these rights!</div>)}
       
        </>
    )
}

export default AddProduct
