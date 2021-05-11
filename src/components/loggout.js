import React from 'react'
import {useHistory} from "react-router-dom";


function Loggout() {

    
    const history = useHistory();
    function handleLoggout(e) {
        localStorage.clear()
        history.push("/login")
        window.location.reload()
    }
    function handleRelocate(e) {
        history.push("/products")
    }
    

    return (
        <>
        <div>
        <div className="container max-w-full mx-auto md:py-24 px-6">
<div className="max-w-sm mx-auto px-6">
    <div className="relative flex flex-wrap">
        <div className="w-full relative">
            <div className="md:mt-6">
                
                <div className="text-center font-base text-black">
                Are you sure you want to loggout?
                </div>
       
        
        <div className="block md:flex items-center justify-between">
            <button onClick={handleRelocate} className="align-middle bg-blue-500 hover:bg-blue-600 text-center px-4 py-2 text-white text-sm font-semibold rounded-lg inline-block shadow-lg">No</button>
        </div>
        <div className="block md:flex items-center justify-between">
            <button onClick={handleLoggout} className="align-middle bg-blue-500 hover:bg-blue-600 text-center px-4 py-2 text-white text-sm font-semibold rounded-lg inline-block shadow-lg">Yes</button>
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

export default Loggout


