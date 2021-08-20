import React, {useState, useEffect} from "react";
import {useHistory} from "react-router-dom";
import {Link} from "react-router-dom";
import axios from "axios";
import server from "./config"
import Modal from "react-modal";


function Profile() {

    const [editEmailIsOpen, setEditEmailIsOpen] = useState(false);
    const [editIsOpen,setEditIsOpen] = useState(false);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [username, setUsername] = useState()
    const [email, setEmail] = useState()
    const userId = localStorage.getItem("userId")
    const token = localStorage.getItem("jwt")
    const history = useHistory();

    useEffect( ()=> {

        const userId = localStorage.getItem("userId")
    if(userId !== null) {
        const fetchRole = async()=>{
        const response = await axios.get(`${server}users?id=${userId}`)
        setUsername(response.data[0].username)
        setEmail(response.data[0].email)


      }
    fetchRole()
    }
    
  },[])


  function handleDelete() {
    const deleteChosen = async()=>  {
        await axios.delete(`${server}users/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        localStorage.clear()
        history.push("/login")
        window.location.reload()

      }
      deleteChosen()
  }

  const customStyles = {
    content : {
      background : "lightblue",
      height: "40vw",
      width:"40vw",
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
    function openEditModal(e) {
        setEditIsOpen(true)
      }
    function closeEditModal(){
        setEditIsOpen(false);
      }
    const editedValues = {
        username:username
    }

    const [editUsername, setEditUsername] = useState(editedValues)

    function handleOnChangeEdit(e) {
      setEditUsername({...editUsername,[e.target.name]:e.target.value})
    }

    function handleOnEdit(e) {
      e.preventDefault()
       
      const editChosen = async()=>{

        axios.put(`${server}users/${userId}`, {
          username:editUsername.username
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

    function openEditEmailModal() {
        setEditEmailIsOpen(true)
      }
    function closeEmailEditModal() {
        setEditEmailIsOpen(false);
      }
    const emailValues = {
        email:email
    }

    const [editEmail, setEditEmail] = useState(emailValues)

    function handleOnChangeEmailEdit(e) {
      setEditEmail({...editEmail,[e.target.name]:e.target.value})
    }

    function handleOnEmailEdit(e) {
      e.preventDefault()
       
      const editChosen = async()=>{

        axios.put(`${server}users/${userId}`, {
          email:editEmail.email
      },{
        headers: {
            Authorization: `bearer ${token}` 
        }
    }).then(
        localStorage.setItem("userEmail", editEmail.email ),
      closeEditModal(),
      window.location.reload()
    )
      }
      editChosen()
    }

    return (
        <>
        <div className="min-h-screen flex items-center justify-center px-4">
    
    <div className="max-w-4xl  bg-white w-full rounded-lg shadow-xl">
        <div className="p-4 border-b">
            <h2 className="text-2xl ">
                Profile Information
            </h2>
            <p className="text-sm text-gray-500">
                Personal details 
            </p>
        </div>
        <div>
            <div className="md:grid md:grid-cols-3 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
                <p className="text-gray-600">
                    Username:
                </p>
                <p>
                    {username}
                </p>
                <button onClick={openEditModal} className="text-md block px-3 py-2 rounded-lg w-full
            bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none">Edit</button>
            </div>

            <div className="md:grid md:grid-cols-3 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
                <p className="text-gray-600">
                    Email Address
                </p>
                <p>
                    {email}
                </p>
                <button onClick={openEditEmailModal} className="text-md block px-3 py-2 rounded-lg w-full
            bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none">Edit</button>
            </div>

            {/* <div className="md:grid md:grid-cols-3 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
                <p className="text-gray-600">
                    Change password:
                </p>
                <p>
                    {email}
                </p>
                <button onClick={openEditEmailModal} className="text-md block px-3 py-2 rounded-lg w-full
            bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none">Edit</button>
            </div> */}

            <div className="md:grid md:grid-cols-3 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
                <p className="text-gray-600">
                    Account purchases
                </p>
                <p>
                    Click cart link:
                </p>
                <Link to="/purchases" className="text-md block px-3 py-2 rounded-lg w-full
            bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none">
                View purchases</Link>
            </div>
            <div className="md:grid md:grid-cols-3 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
                <p className="text-gray-600">
                    Delete Account
                </p>
                <p>
                    Carefull! This is not reverseable
                </p>
                <button onClick={openModal} className="text-md block px-3 py-2 rounded-lg w-full
            bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none">
                Delete!
                </button>               
            </div>

            
        </div>
    </div>
    </div>


    <Modal
          isOpen={editIsOpen}
          onRequestClose={closeEditModal}
          style={customStyles}
          ariaHideApp={false}
          contentLabel="Example Modal"
    >
        <form className="mt-8" onSubmit={handleOnEdit}>
                    <div className="mx-auto max-w-lg ">
                        <div className="py-1">
                            <span className="px-1 text-sm text-gray-600">Username:</span>
                            <input placeholder={username} type="text" name="username" value={editUsername.username} onChange={handleOnChangeEdit}
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
    px-6 py-3 block shadow-xl hover:text-white hover:bg-black" onClick={closeEditModal}>Cancel edit</button>

    </Modal>
    <Modal
          isOpen={editEmailIsOpen}
          onRequestClose={closeEmailEditModal}
          style={customStyles}
          ariaHideApp={false}
          contentLabel="Example Modal"
    >
        <form className="mt-8" onSubmit={handleOnEmailEdit}>
                    <div className="mx-auto max-w-lg ">
                        <div className="py-1">
                            <span className="px-1 text-sm text-gray-600">Username:</span>
                            <input placeholder={email} type="text" name="email" value={editEmail.email} onChange={handleOnChangeEmailEdit}
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
    px-6 py-3 block shadow-xl hover:text-white hover:bg-black" onClick={closeEditModal}>Cancel edit</button>

    </Modal>

    <Modal
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
    </Modal>


</>
    )
}

export default Profile
