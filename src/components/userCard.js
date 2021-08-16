import React from 'react'

function UserCard({id, username, email, role}) {


    var userRole = "";
    if(role === true) {
         userRole = "Admin";
    }
    else {
        userRole = "User";
    }

    return (
        <>
            
    
    <div className="max-w-4xl  bg-white w-full rounded-lg shadow-xl">
        <div className="p-4 border-b">
            <h2 className="text-2xl ">
                UserID: 
            </h2>
            <p className=" text-gray-500">
                {id}
            </p>
        </div>
        <div>
            <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
                <p className="text-gray-600">
                    Username:
                </p>
                <p>
                    {username}
                </p>
            </div>
            <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
                <p className="text-gray-600">
                    Email Address:
                </p>
                <p>
                    {email}
                </p>
            </div>
            <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
                <p className="text-gray-600">
                    Role:
                </p>
                <p>
                   {userRole}
                </p>
            </div>
        </div>
    </div>

        </>
    )
}

export default UserCard
