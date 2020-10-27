import React,{useState,useRef,} from 'react';
import firebase from '../utils/firebase';
import { Button, Input ,Avatar} from "@material-ui/core"
import { Link } from "react-router-dom"
import "firebase/database"
const Comment = ({post}) => {
  const [comment, setComment] = useState("")
console.log(post)
  const inputRef = useRef();
  const handleCommet = () => {
    console.log(comment)
    const db = firebase.database().ref('user').child(post.id).child('posts').child(post.postId);
    db.child('comments').push({ comment, name: post.name, time: new Date().toLocaleTimeString() })
    setComment("")
  }
  let list =[];
  if (post.comments) {
    for (let id in post.comments[0]) {
      list.push({...post.comments[0][id] })
    
    }
  }
  const renderList =list.map((comnt, index) => {
    return (
      <div key={index}>
        <Link to={`/profile/${post.id}`}><Avatar style={{ marginBottom: '10px' }}>{post.name}</Avatar></Link>
        <p>{comnt.time}</p>
        <p>{comnt.comment}</p>
      </div>
    )
  })
  return (
    <div>

      <Input onChange={e => setComment(e.target.value)} value={comment} ref={inputRef} placeholder="write your comments"/>
      <Button onClick={handleCommet}>post</Button>
      {renderList}
    </div>
  );
}

export default Comment;
