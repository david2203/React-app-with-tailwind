import React, {useContext} from 'react'
import {UserInfo} from "./login"

function ProfileContext() {
    return (
        <div>
            <UserInfo.Consumer>
            {value=> <div> this is from consumer {value}</div>}
            </UserInfo.Consumer>
        </div>
    )
}

export default ProfileContext
