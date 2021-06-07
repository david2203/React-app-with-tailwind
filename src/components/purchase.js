import React, {useState} from 'react'
import Modal from "react-modal"
import axios from "axios"
import dotenv from 'dotenv';
import { loadStripe } from '@stripe/stripe-js';


    dotenv.config();
    const stripePromise = loadStripe(process.env.REACT_APP_PK);

function Purchase({product, delivery, price, image, quantity}) {

    
    const [modalIsOpen,setIsOpen] = useState(false);

    const handleClick = async (event) => {
      // Get Stripe.js instance
      
      const stripe = await stripePromise;
      
      // Call your backend to create the Checkout Session
      const response = await axios.post("http://localhost:4242/create-checkout-session", {name:product, price:price, quantity:quantity})
      //('/create-checkout-session', { method: 'POST' });
  
      console.log(response)
  
      const sessionId = response.data.id
  
      console.log(sessionId)
      // When the customer clicks on the button, redirect them to Checkout.
      const result = await stripe.redirectToCheckout({
        sessionId: sessionId,
      });
  
      if (result.error) {
        // If `redirectToCheckout` fails due to a browser or network
        // error, display the localized error message to your customer
        // using `result.error.message`.
      }
    };

    const customStyles = {
        content : {
          background : "lightblue",
          height: "20vw",
          width:"30vw",
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
      setIsOpen(true);   
    }
    function closeModal(){
        setIsOpen(false);
      }
    return (
        <>
            <div className="py-6 mx-6" >
  <div className="flex max-w-md bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="w-1/3 bg-cover" > <img src={`http://localhost:1337${image}`} alt=""/>
    </div> 
    <div className="w-2/3 p-4">
      <h1 className="mt-2 text-gray-600 text-sm">Product: <strong>{product}</strong></h1>
      <p className="mt-2 text-gray-600 text-sm">Chosen delivery option: <strong>{delivery}</strong></p>
      <h1 className="mt-2 text-gray-600 text-sm">Quantity: <strong>{quantity}</strong></h1>
        <h1 className="mt-2 text-gray-600 text-sm">Price per/product : <strong>{price} kr</strong></h1>
      

        
        <button className="mt-3 text-lg font-semibold 
        bg-black w-full text-white rounded-lg 
         px-6 py-3 block shadow-xl hover:bg-gray-700" role="link" onClick={handleClick}>
          Pay now!
        </button>

        {/* </div>  */}
        </div>
        </div>
        </div>

<Modal
isOpen={modalIsOpen}
onRequestClose={closeModal}
style={customStyles}
ariaHideApp={false}
contentLabel="Example Modal"
>
<div>Sadly we havnt implemented this yet :( ! </div>
<button className="mt-3 text-lg font-semibold 
        bg-black w-full text-white rounded-lg 
        px-1 py-3 block shadow-xs hover:bg-gray-700" onClick={closeModal}> Back</button>
</Modal>


        
</>
    )
}

export default Purchase
