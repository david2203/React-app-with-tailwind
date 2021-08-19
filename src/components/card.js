import React, {useState, useEffect} from "react";
import Modal from "react-modal";
import axios from "axios";
import dotenv from 'dotenv';
// import firestore from "../firebaseConfig";
// import { loadStripe } from '@stripe/stripe-js';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.

dotenv.config();
// const stripePromise = loadStripe(process.env.REACT_APP_PK);



function Card({image, productName, price, description}) { 
  // const [quantity, setQuantity] = useState(1)
  

  const [isAdmin, setIsAdmin] = useState(false)
  // const [firebaseData, setFirebaseData] = useState()
 
  useEffect( ()=> {
    // const fetchData = async()=> {
    //   const res = await firestore.collection("test").doc("IIA6GlZMTl3m6g32PmmU").get()
    //   setFirebaseData(res.data())
    // } 
    // fetchData()
    
    const userId = localStorage.getItem("userId")
    if(userId !== undefined && userId !== null) {
        const fetchRole = async()=>{
        const response = await axios.get(`http://localhost:1337/users?id=${userId}`)
        setIsAdmin(response.data[0].isAdmin)
      }
    fetchRole()
    }
    
  },[])

  const initialValues = {
    typeOfDelivery:"DHL", 
    mobile:"",
    quantity:"1"
  }

  const [userId, setUserId] = useState(null)
  useEffect( ()=> {
    const userId = localStorage.getItem("userId");
    setUserId(userId)
    
  },[])

  
  const [product, setProduct] = useState()
  const [productId, setProductId] = useState()

  const [formValues, setFormValues] = useState(initialValues)
  
  const token = localStorage.getItem("jwt")
  const email = localStorage.getItem("userEmail")

  const [modalIsOpen,setIsOpen] = useState(false);
  const [deleteIsOpen,setDeleteIsOpen] = useState(false);
  const [editIsOpen,setEditIsOpen] = useState(false);


  
 
  const customStyles = {
    content : {
      background : "lightblue",
      height: "40vw",
      width:"50vw",
      margin: "3px",
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };

  
    function openModal(e) {
        setProduct(e.target.parentNode.previousSibling.previousSibling.previousSibling.innerHTML)
        console.log(e.target.parentNode.previousSibling.previousSibling.previousSibling.innerHTML)
      setIsOpen(true);
    }
    function openDeleteModal(e) {
      setProduct(e.target.parentNode.previousSibling.previousSibling.previousSibling.innerHTML)
      setDeleteIsOpen(true)
    }
    function openEditModal(e) {
      setProduct(e.target.parentNode.previousSibling.previousSibling.previousSibling.innerHTML)
      setEditIsOpen(true)
    }
    function closeDeleteModal(){
      setDeleteIsOpen(false);
    }
    function closeEditModal(){
      setEditIsOpen(false);
    }
    useEffect (()=> {
      if(modalIsOpen === true || deleteIsOpen === true || editIsOpen === true) {
      const fetchProduct = async()=>{
        const response =  await axios.get(`http://localhost:1337/products?Name=${product}`)
         setProductId(response.data[0].id)
      }
      fetchProduct()
      //eslint-disable-next-line react-hooks/exhaustive-deps
    }
    },[openModal])
      
    function closeModal(){
      setIsOpen(false);
    }
  function handleOnChange(e) {
    setFormValues({...formValues,[e.target.name]: e.target.value})
    
  }
  function deleteProduct(){
    const deleteChosen = async()=>  {
      await axios.delete(`http://localhost:1337/products/${productId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      
    }
    deleteChosen()
  }

  function handleOnSubmit(e) {
    e.preventDefault()

    
    console.log(productId)
    axios.post("http://localhost:1337/purchases",{
      email:email,
      typeOfDelivery:formValues.typeOfDelivery,
      mobile:formValues.mobile,
      user:userId,
      product:productId,
      quantity:formValues.quantity

    },{
      headers: {
          Authorization: `bearer ${token}` 
      }
  }).then(
    closeModal()
  )
  }

  const editedValues = {
    Name:"",
    Description:"",
    Price:0
}
const [editProductValues, setEditProductValues] = useState(editedValues)
    function handleOnChangeEdit(e) {
      setEditProductValues({...editProductValues,[e.target.name]:e.target.value})
    }

    function handleOnEdit(e) {
      e.preventDefault()
       
      const editChosen = async()=>{

        axios.put(`http://localhost:1337/products/${productId}`, {
          Name:editProductValues.name,
          Description:editProductValues.description,
          Price:editProductValues.price
      },{
        headers: {
            Authorization: `bearer ${token}` 
        }
    }).then(
      closeEditModal(),
      window.location.reload()
    )
      }
      editChosen()
    }

    return (
        
        <>

            <div className="py-6 mx-6" >
  <div className="flex max-w-md bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="w-1/3 bg-cover" > <img src={`http://localhost:1337${image.formats.small.url}`} alt=""/>
    </div> 
    <div className="w-2/3 p-4">
      <h1 className="text-gray-900 font-bold text-2xl">{productName}</h1>
      <p className="mt-2 text-gray-600 text-sm">{description}</p>
      <div className="flex item-center mt-2">
        <svg className="w-5 h-5 fill-current text-gray-700" viewBox="0 0 24 24">
          <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z"/>
        </svg>
        <svg className="w-5 h-5 fill-current text-gray-700" viewBox="0 0 24 24">
          <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z"/>
        </svg>
        <svg className="w-5 h-5 fill-current text-gray-700" viewBox="0 0 24 24">
          <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z"/>
        </svg>
        <svg className="w-5 h-5 fill-current text-gray-500" viewBox="0 0 24 24">
          <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z"/>
        </svg>
        <svg className="w-5 h-5 fill-current text-gray-500" viewBox="0 0 24 24">
          <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z"/>
        </svg>
      </div>
      <div className="flex item-center justify-between mt-3">
        <h1 className="text-gray-700 font-bold text-xl">{price} kr</h1>
        {token?(<button className="px-3 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded" onClick={openModal}>Buy! </button>): (<div>Login to buy!</div>)}
        
        {isAdmin ? (<><button className="px-3 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded" onClick={openDeleteModal}>Delete!</button>
                      <button className="px-3 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded" onClick={openEditModal}>Edit!</button>
                   </> ):(<div></div>) }
        <Modal
          isOpen={deleteIsOpen}
          onRequestClose={closeDeleteModal}
          style={customStyles}
          ariaHideApp={false}
          contentLabel="Example Modal"
        >
          <div>Do you really want to delete this product? </div>
          <button className="px-3 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded" onClick={deleteProduct}>Yes</button>
          <button className="px-3 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded" onClick={closeDeleteModal}>No</button>
        </Modal>

        <Modal
          isOpen={editIsOpen}
          onRequestClose={closeEditModal}
          style={customStyles}
          ariaHideApp={false}
          contentLabel="Example Modal"
        > 
        <form className="mt-8" onSubmit={handleOnEdit}>
            <h1>Product info:</h1>
                    <div className="mx-auto max-w-lg ">
                        <div className="py-1">
                            <span className="px-1 text-sm text-gray-600">Product name:</span>
                            <input placeholder="" type="text" name="name" value={editProductValues.name} onChange={handleOnChangeEdit}
                                   className="text-md block px-3 py-2 rounded-lg w-full
            bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"/>
                        </div>
                        <div className="py-1">
                            <span className="px-1 text-sm text-gray-600">Description:</span>
                            <input placeholder="" name="description" value={editProductValues.description} onChange={handleOnChangeEdit}
                                   className="text-md block px-3 py-2 rounded-lg w-full
            bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"/>
                        </div>
                        <div className="py-1">
                            <span className="px-1 text-sm text-gray-600">Price:</span>
                            <input placeholder=""  name="price" type="number" value={editProductValues.price} onChange={handleOnChangeEdit}
                                   className="text-md block px-3 py-2 rounded-lg w-full
            bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"/>
                        </div>
                        <button className="mt-3 text-lg font-semibold
        bg-gray-800 w-full text-white rounded-lg
        px-6 py-3 block shadow-xl hover:text-white hover:bg-black">
                            Edit!
                        </button>
                    </div>
                </form>

            <button className="mt-3 text-lg font-semibold
    bg-gray-800 w-full text-white rounded-lg
    px-6 py-3 block shadow-xl hover:text-white hover:bg-black" onClick={closeEditModal}>Cancel edit</button></Modal>

          <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          ariaHideApp={false}
          contentLabel="Example Modal"
        >

<form className="mt-8" onSubmit={handleOnSubmit}>
            <h1>You have chosen to buy: <strong>{product}</strong></h1>
                    <div className="mx-auto max-w-lg ">
                        <div className="py-1">
                            <span className="px-1 text-sm text-gray-600">Type of delivery:</span>
                            <select className="text-md block px-3 py-2 rounded-lg w-full
            bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none" name="typeOfDelivery" id="Delivery" value={formValues.typeOfDelivery} onChange={handleOnChange}>
                                <option value="DHL">DHL (3-5 workingdays)</option>
                                <option value="DHLexpress">DHL express (Under 2 workingdays)</option>
                               {price < 10000 ? (<option value="Postoffice">Pickup at closest post office (3 days)</option>): ("")} 
                              </select><br/>
                            
                        </div>
                        
                        <div className="py-1">
                            <span className="px-1 text-sm text-gray-600">Phone Number:</span>
                            <input type="number" name="mobile" value={formValues.mobile} onChange={handleOnChange} className="text-md block px-3 py-2 rounded-lg w-full
            bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none" /><br/>
                            
                        </div>
                        <div className="py-1">
                            <span className="px-1 text-sm text-gray-600">Quantity:</span>
                            <input placeholder="1" type="number" min="1" name="quantity" value={formValues.quantity} onChange={handleOnChange} className="text-md block px-3 py-2 rounded-lg w-full
            bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none" /><br/>
                            
                        </div>
                        

                        
                        <button className="mt-3 text-lg font-semibold
        bg-gray-800 w-full text-white rounded-lg
        px-6 py-3 block shadow-xl hover:text-white hover:bg-black" type="submit">Add to Cart</button>
                    </div>
                </form>

                <button className="mt-3 text-lg font-semibold
        bg-gray-800 w-full text-white rounded-lg
        px-6 py-3 block shadow-xl hover:text-white hover:bg-black" onClick={closeModal}>Back to shop</button>

        </Modal>
        
        
      </div>
    </div>
  </div>
</div>

        </>
        
    )
}

export default Card
