import React,{useState,useEffect} from 'react';
import { useLocation, useParams } from "react-router-dom";
import firebase from "../utils/firebase"
export default function Profile() {
    const { state } = useLocation()
    const { id } = useParams();
    console.log(state, id)
    const { user, setUser } = useState();
    return (
        <div>
            Profile
        </div>
    )
}
