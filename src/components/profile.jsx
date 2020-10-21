import React from 'react'
import {useLocation} from "react-router-dom"

export default function Profile() {
    const {state}=useLocation()
    console.log(state)
    return (
        <div>
            Profile
        </div>
    )
}
