import React, { useState, useEffect } from 'react';
import firebase from "firebase";
import "firebase/storage"
const RenderPic = ({ pic }) => {
    const [imageLink,setImageLink]=useState("")
    const picKey = pic.key;
    const picName = pic.name;
    useEffect(() => {
        const setPic = async (key, name,) => {
         const storage = await firebase.storage();
            const url = await storage.ref(`Images/${key}/${name}`).getDownloadURL()
              setImageLink(url)
            }
    
    setPic(picKey,picName)
        }
    )
    console.log(imageLink)
    return (
        <div>
            <img src={imageLink} alt={picName} style={{width:'200px',height:'200px'}}/>
        </div>
    );
}
export default RenderPic;
