import React, {useState} from "react";
import {Link, useHistory} from "react-router-dom";
import axios from "axios";


export default function Login() {

    const initialValues = {
        email:"",
        password:""
    }
    const [formValues, setFormValues] = useState(initialValues)
    const [error, setError] = useState("")
    
    
    const history = useHistory();
    


    function handleOnChange(e) {

        setFormValues({...formValues,[e.target.name]:e.target.value})
    }

    
    
    function handleOnSubmit(e) {
        e.preventDefault();

        axios
        .post('http://localhost:1337/auth/local', {
          identifier: formValues.email,
          password: formValues.password,
        })
        .then(response => {
          // Handle success
          console.log('User profile', response.data.user);
          console.log('User token', response.data.jwt);
          localStorage.setItem("jwt", response.data.jwt)
          history.push("/products")
          window.location.reload()

          console.log("user data", response.data)
          
          
        }).catch( (error) => {
            // Handle error.
            
            setError("Dina upgifter stämmer inte!")
          });
    }
    


        
    
    return (
        <>      
         
           <div className="font-sans">
            <div className="relative min-h-screen flex flex-col sm:justify-center items-center bg-gray-100 ">
                <div className="relative sm:max-w-sm w-full">
                    <div className="card bg-blue-400 shadow-lg  w-full h-full rounded-3xl absolute  transform -rotate-6"></div>
                    <div className="card bg-red-400 shadow-lg  w-full h-full rounded-3xl absolute  transform rotate-6"></div>
                    <div className="relative w-full rounded-3xl  px-6 py-4 bg-gray-100 shadow-md">
                        <label for="" className="block mt-3 text-sm text-gray-700 text-center font-semibold">
                            Login
                        </label>
                        <form method="POST" onSubmit={handleOnSubmit} action="#" className="mt-10">
                                <h1>{error}</h1>         
                            <div>
                                <input type="email" name="email" value={formValues.email} onChange={handleOnChange} placeholder="Email" className="mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"/>
                            </div>
                
                            <div className="mt-7">                
                                <input type="password" name="password" value={formValues.password} onChange={handleOnChange} placeholder="Password" className="mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"/>                           
                            </div>

                            <div className="mt-7 flex">
                                <label for="remember_me" className="inline-flex items-center w-full cursor-pointer">
                                    <input id="remember_me" type="checkbox" className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" name="remember"/>
                                    <span className="ml-2 text-sm text-gray-600">
                                        Remember me
                                    </span>
                                </label>
                
                               <div className="w-full text-right">     
                                    <a className="underline text-sm text-gray-600 hover:text-gray-900" href="will be inserted">
                                        Forgot your password?
                                    </a>                                  
                               </div>
                            </div>
                
                            <div className="mt-7">
                                <button className="bg-blue-500 w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105">
                                    Login
                                </button>
                            </div>
                
                            
                
                             <div className="mt-7">
                                <div className="flex justify-center items-center">
                                    <label className="mr-2" >Are you new ?</label>
            
                                    <Link className="text-blue-500 transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105" to="/register">Register!</Link> 
                                   
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </div>
        
        </>
    )
}