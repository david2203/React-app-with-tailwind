import React, { useState } from 'react'
import axios from 'axios';
import server from "./config"

function ForgotPassword() {

  function resetRequest() {
    axios
      .post(`${server}auth/forgot-password`, {
        email: formValues.email, // user's email
      })
      .then(response => {
        console.log('Your user received an email', response);
      })
      .catch(error => {
        console.log('An error occurred:', error.response);
      });
  }

  const initialValues = {
    email: ""
  }
  const [formValues, setFormValues] = useState(initialValues)

  function handleOnChange(e) {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
    console.log(formValues)
  }


  return (
    <>
        <div>
          <input type="email" name="email" value={formValues.email} onChange={handleOnChange} placeholder="Email" className="mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0" />
        </div>

      <button onClick={resetRequest} className="bg-blue-500 w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105">Återställ</button>

    </>
  )
}

export default ForgotPassword
