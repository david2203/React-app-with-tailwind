import React, {useState} from 'react'
import Modal from "react-modal"

function Purchase({product, delivery, price, image}) {

    const [modalIsOpen,setIsOpen] = useState(false);

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
      
        <h1 className="mt-2 text-gray-600 text-sm">Price: <strong>{price} kr</strong></h1>
        
        <button className="mt-3 text-lg font-semibold 
        bg-black w-full text-white rounded-lg 
        px-6 py-3 block shadow-xl hover:bg-gray-700" onClick={openModal}>Track your delivery!</button>


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
