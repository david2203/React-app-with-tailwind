import React, {useState, useEffect} from "react";
import Modal from "react-modal";
import axios from "axios";

function Card({image, productName, price, description}) { 
 
  const initialValues = {
    typeOfDelivery:"DHL", 
    mobile:"",
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
      setIsOpen(true);

        
    }
    useEffect (()=> {
      if(modalIsOpen === true) {
      const fetchProduct = async()=>{
        const response =  await axios.get(`http://localhost:1337/products?Name=${product}`)
        
         setProductId(response.data[0].id)
         
      }
      fetchProduct()
    }
    },[openModal])
      
    function closeModal(){
      setIsOpen(false);
    }
  function handleOnChange(e) {
    setFormValues({...formValues,[e.target.name]: e.target.value})
    
  }

  function handleOnSubmit(e) {
    e.preventDefault()

    
    console.log(productId)
    axios.post("http://localhost:1337/purchases",{
      email:email,
      typeOfDelivery:formValues.typeOfDelivery,
      mobile:formValues.mobile,
      user:userId,
      
      product:productId
    },{
      headers: {
          Authorization: `bearer ${token}` 
      }
  }).then(
    closeModal()
  )
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
        <h1 className="text-gray-700 font-bold text-xl">{price}</h1>
        <button className="px-3 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded" onClick={openModal}>Add to Cart</button>
        
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
                        

                        
                        <button className="mt-3 text-lg font-semibold
        bg-gray-800 w-full text-white rounded-lg
        px-6 py-3 block shadow-xl hover:text-white hover:bg-black" type="submit">Order!</button>
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
