import React, {useState, useEffect} from 'react'
import {Link} from "react-router-dom";
import logo from "./images/logo.png";


function Menu() {


    const [jwt, setJWT] = useState("")

    useEffect( ()=> {
        const JWT = localStorage.getItem("jwt")
        setJWT(JWT)
    }, [])


    return (
        <>
        { jwt ? (<nav className="bg-gray-800">
<div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
<div className="relative flex items-center justify-between h-16">
<div className="absolute inset-y-0 left-0 flex items-center sm:hidden"></div>
</div>
<div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
<div className="flex-shrink-0 flex items-center">
<img className="block lg:hidden h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg" alt="Workflow"/>
<img className="hidden lg:block h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg" alt="Workflow"/>
</div>
<div className="hidden sm:block sm:ml-6">


<div className="flex space-x-4">
<Link to="/products" className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium" aria-current="page">Products</Link>

<Link to="/addProduct" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Add product</Link>

<Link to="/addExpert" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Add expert</Link>

<Link to="/loggout" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Loggout</Link>


</div>

</div>
</div>
</div>
</nav>) :
(<nav className="bg-gray-800">
<div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
<div className="relative flex items-center justify-between h-16">
<div className="absolute inset-y-0 left-0 flex items-center sm:hidden"></div>
</div>
<div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
<div className="flex-shrink-0 flex items-center">
<img className="hidden lg:block h-20 w-auto" src={logo} width="100" height="100" alt="Workflow"/>
</div>
<div className="hidden sm:block sm:ml-6">


<div className="flex space-x-4">
<Link to="/products" className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium" aria-current="page">Products</Link>

<Link to="/login" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Login</Link>

<Link to="/register" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Register</Link>
</div>

</div>
</div>
</div>
</nav>)
}
</>
        
    )
}

export default Menu
