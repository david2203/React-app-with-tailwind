import React, {useState} from 'react'
import {useHistory} from "react-router-dom";
import axios from "axios";




function Register() {
    
    const initialValues = {
        username:" ",
        email:" ",
        password:""
    }

    const [registerValues, setRegisterValues] = useState(initialValues)
    const history = useHistory()    

    function handleOnChange(e) {

        setRegisterValues({...registerValues,[e.target.name]:e.target.value})
        
    }

    function handleOnSubmit(e) {
       e.preventDefault()

        console.log(registerValues.username, registerValues.email)
                axios.post('http://localhost:1337/auth/local/register', {
                username: registerValues.username,
                email: registerValues.email,
                password: registerValues.password
            }).then( (e)=> { if(e.data.user)
                history.push("/login")
            }).catch((err)=> {console.log(err)})

    
    }

    return (
        <>
         
<div>
        <div className="container max-w-full mx-auto md:py-24 px-6">
<div className="max-w-sm mx-auto px-6">
    <div className="relative flex flex-wrap">
        <div className="w-full relative">
            <div className="md:mt-6">
                <div className="text-center font-semibold text-black">
                    Register below
                </div>
                <div className="text-center font-base text-black">
                    
                </div>
                <form className="mt-8" x-data="{password: '',password_confirm: ''}" onSubmit={handleOnSubmit}>
                    <div className="mx-auto max-w-lg ">
                        <div className="py-1">
                            <span className="px-1 text-sm text-gray-600">Username</span>
                            <input placeholder="" type="text" name="username" values={registerValues.username} onChange={handleOnChange}
                                   className="text-md block px-3 py-2 rounded-lg w-full
            bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"/>
                        </div>
                        <div className="py-1">
                            <span className="px-1 text-sm text-gray-600">Email</span>
                            <input placeholder="" type="email" name="email" values={registerValues.email} onChange={handleOnChange}
                                   className="text-md block px-3 py-2 rounded-lg w-full
            bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"/>
                        </div>
                        <div className="py-1">
                            <span className="px-1 text-sm text-gray-600">Password</span>
                            <input placeholder="" type="password" x-model="password" name="password" values={registerValues.password} onChange={handleOnChange}
                                   className="text-md block px-3 py-2 rounded-lg w-full
            bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"/>
                        </div>
                        <div className="py-1">
                            <span className="px-1 text-sm text-gray-600">Password Confirm</span>
                            <input placeholder="" type="password" x-model="password_confirm"
                                   className="text-md block px-3 py-2 rounded-lg w-full
            bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"/>
                        </div>
                        <div className="flex justify-start mt-3 ml-4 p-1">
                            <ul>
                                <li className="flex items-center py-1">
                                    
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            {/* <path x-show="password == password_confirm && password.length > 0" stroke-linecap="round"
                                                  stroke-linejoin="round" stroke-width="2"
                                                  d="M5 13l4 4L19 7"/>
                                            <path x-show="password != password_confirm || password.length == 0" stroke-linecap="round"
                                                  stroke-linejoin="round" stroke-width="2"
                                                  d="M6 18L18 6M6 6l12 12"/> */}

                                        </svg>
                                    
                                    
                                </li>
                                <li className="flex items-center py-1">
                                    
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            {/* <path x-show="password.length > 7" stroke-linecap="round"
                                                  stroke-linejoin="round" stroke-width="2"
                                                  d="M5 13l4 4L19 7"/>
                                            <path x-show="password.length < 7" stroke-linecap="round"
                                                  stroke-linejoin="round" stroke-width="2"
                                                  d="M6 18L18 6M6 6l12 12"/> */}

                                        </svg>
                                   
                                   
                                </li>
                            </ul>
                        </div>
                        <div className="flex justify-start">
                            <label className="block text-gray-500 font-bold my-4 flex items-center">
                                <input className="leading-loose text-pink-600 top-0" type="checkbox"/>
                                <span className="ml-2 text-sm py-2 text-gray-600 text-left">Accept the
                                      <a href="will be inserted"
                                         className="font-semibold text-black border-b-2 border-gray-200 hover:border-gray-500">
                                       Terms and Conditions of the site
                                      </a>and
                                      <a href="will be inserted"
                                         className="font-semibold text-black border-b-2 border-gray-200 hover:border-gray-500">
                                        the information data policy.</a>
                                </span>
                            </label>
                        </div>
                        <button className="mt-3 text-lg font-semibold
        bg-gray-800 w-full text-white rounded-lg
        px-6 py-3 block shadow-xl hover:text-white hover:bg-black">
                            Register
                        </button>
                    </div>
                </form>

                <div className="text-sm font-semibold block sm:hidden py-6 flex justify-center">
                    <a href="will be inserted"
                       className="text-black font-normal border-b-2 border-gray-200 hover:border-teal-500">You're already member?
                        <span className="text-black font-semibold">
        Login
      </span>
                    </a>
                </div>

            </div>
        </div>
    </div>
</div>
</div>
    </div>

</>
)


}

export default Register;
