import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import Modal from "react-modal";
import axios from "axios";

function ModalComponent({name}) {

    const history = useHistory();
  const initialValues = {
    name:"",
    timeToAppointment:"", 
    mobile:null
  }

  const [artistName, setArtistName] = useState()
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
        setArtistName(e.target.parentNode.previousSibling.previousSibling.previousSibling.innerHTML)
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
      mobile:formValues.mobile
    }).then ( (res)=> {
      console.log(res.data)
      
     

    }).catch ( (err) => {
      console.log(err)
    })
  }
    return (
        <>
        <button className="px-3 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded" onClick={openModal}>Add to Cart</button>
        
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >

          <h2 ref={_subtitle => (subtitle = _subtitle)}>Hello</h2>
          <button onClick={closeModal}>close</button>
          <div>Du har valt att boka {artistName}</div>
          <form onSubmit={handleOnSubmit}>
            Name: <input type="text" name="name" value={formValues.name} onChange={handleOnChange} /> 
            Email: <input type="date" name="timeToAppointment" value={formValues.timeToAppointment} onChange={handleOnChange}/> 
            Number: <input type="number" name="mobile" value={formValues.mobile} onChange={handleOnChange}/>
            <button type="submit">Continue to checkout</button>
          </form>
        </Modal>
        </>
    )
}

export default ModalComponent
