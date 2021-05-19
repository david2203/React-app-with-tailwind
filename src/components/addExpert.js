import React, {useState} from 'react'
import axios from "axios"


function AddExpert() {
     //initial values
     const initialValues = {
        name:"",
        description:"",
        price:0
    }

    //state
    const [addExpertValues, setAddExpertValues] = useState(initialValues)
    const [fileData, setFileData] = useState()
    //onhandleChange
    function handleOnChange(e) {
        setAddExpertValues({...addExpertValues,[e.target.name]:e.target.value})
    }
    function handleOnChangeImg(e) {
        setFileData(e.target.files[0])
    }

    //on submit
    function handleOnSubmit(e) {
        e.preventDefault()
        console.log(addExpertValues)

        axios.post("http://localhost:1337/experts", {
            Name:addExpertValues.name,
            Description:addExpertValues.description,
            Price:addExpertValues.price
        }).then ( (res)=> {
            console.log(res.data)

            const formData = new FormData()
            formData.append("files", fileData)

            //sql liknande mapping
            formData.append("ref", "expert")
            formData.append("refId", res.data.id)
            formData.append("field", "img")


            axios.post("http://localhost:1337/upload",formData)
            .then( (response) => {console.log(response.data)})
            .catch( (err)=>{console.log(err)})
        }).catch ( (err)=> {
            console.log(err)
        })
    }
    
    
    



    return (
        <>
       <form className="mt-8" x-data="{password: '',password_confirm: ''}" onSubmit={handleOnSubmit}>
            <h1>Expert profile:</h1>
                    <div className="mx-auto max-w-lg ">
                        <div className="py-1">
                            
                            <span className="px-1 text-sm text-gray-600">Name:</span>
                            <input placeholder="" type="text" name="name" value={addExpertValues.name} onChange={handleOnChange}
                                   className="text-md block px-3 py-2 rounded-lg w-full
            bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"/>
                        </div>
                        <div className="py-1">
                            <span className="px-1 text-sm text-gray-600">Description:</span>
                            <input placeholder="" name="description" value={addExpertValues.description} onChange={handleOnChange}
                                   className="text-md block px-3 py-2 rounded-lg w-full
            bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"/>
                        </div>
                        <div className="py-1">
                            <span className="px-1 text-sm text-gray-600">Cost:</span>
                            <input placeholder=""  name="price" type="number" value={addExpertValues.price} onChange={handleOnChange}
                                   className="text-md block px-3 py-2 rounded-lg w-full
            bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"/>
                        </div>
                        <div className="py-1">
                            <span className="px-1 text-sm text-gray-600">Profile picture:</span>
                            <input type="file" name="file" onChange={handleOnChangeImg} 
                                   className="text-md block px-3 py-2 rounded-lg w-full
            bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"/>
                        </div>

                        
                        
                        <button className="mt-3 text-lg font-semibold
        bg-gray-800 w-full text-white rounded-lg
        px-6 py-3 block shadow-xl hover:text-white hover:bg-black">
                            Add expert!
                        </button>
                    </div>
                </form>
        </>
    )

}

export default AddExpert
