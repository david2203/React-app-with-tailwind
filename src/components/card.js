import React, {useState, useEffect} from "react";
import {useHistory} from "react-router-dom";
import Modal from "react-modal";
import axios from "axios";

function Card({productId,image, productName, price, description}) { 

  const history = useHistory();
  const initialValues = {
    name:"",
    timeToAppointment:"", 
    mobile:null
  }

  const [userId, setUserId] = useState(null)
  useEffect( ()=> {
    const userId = localStorage.getItem("userId");
    setUserId(userId)
    
  },[])

  const [expertName, setExpertName] = useState()
  const [formValues, setFormValues] = useState(initialValues)

  const [modalIsOpen,setIsOpen] = useState(false);
  var subtitle;
 
  const customStyles = {
    content : {
      background : "lightblue",
      height: "40vw",
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
        setExpertName(e.target.parentNode.previousSibling.previousSibling.previousSibling.innerHTML)
      setIsOpen(true);
    }
    function closeModal(){
      setIsOpen(false);
    }
  
  function handleOnChange(e) {
    setFormValues({...formValues,[e.target.name]: e.target.value})
  }

  function handleOnSubmit(e) {
    e.preventDefault()

    

    axios.post("http://localhost:1337/bookings", {
      name:formValues.name,
      tid:formValues.timeToAppointment,
      mobile:formValues.mobile,
      userId:userId,
      productId: productId
    }).then ( (res)=> {
      console.log(res.data)
      
     

    }).catch ( (err) => {
      console.log(err)
    })
  }

    return (
        
        <>

            <div className="py-6 mx-6" >
  <div className="flex max-w-md bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="w-1/3 bg-cover" > <img src={`http://localhost:1337${image.formats.small.url}`} alt=""/>
    </div> 
    {image}
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
          contentLabel="Example Modal"
        >

          <h2 ref={_subtitle => (subtitle = _subtitle)}>Hello</h2>
          <button onClick={closeModal}>close</button>
          <div>Du har valt att boka {expertName}</div>
          <form onSubmit={handleOnSubmit}>
            Name: <input type="text" name="name" value={formValues.name} onChange={handleOnChange} /> 
            Email: <input type="date" name="timeToAppointment" value={formValues.timeToAppointment} onChange={handleOnChange}/> 
            Number: <input type="number" name="mobile" value={formValues.mobile} onChange={handleOnChange}/>
            <button type="submit">Continue to checkout</button>
          </form>
        </Modal>
      </div>
    </div>
  </div>
</div>

        </>
        
    )
}

export default Card
