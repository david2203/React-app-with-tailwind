import React from 'react'
import axios from 'axios';

function ForgotPassword() {

    function resetRequest() {
        axios
    .post('http://localhost:1337/auth/forgot-password', {
      email: 'david.saupe@gmail.com', // user's email
    })
    .then(response => {
      console.log('Your user received an email', response);
    })
    .catch(error => {
      console.log('An error occurred:', error.response);
    });
    }
    

    return (
        <>
         Återställ lösenord
         <button onClick={resetRequest}>Återställ</button>   
        </>
    )
}

export default ForgotPassword
