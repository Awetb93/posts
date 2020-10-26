import React,{useState,useRef,} from 'react';
import firebase from '../utils/firebase';
import {Button, Input} from "@material-ui/core"
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
  let list = '';
  if (post.comments) {
    for (let id in post.comments[0]) {
      console.log(id);
      console.log(post.comments[0][id])
  }
  }
  return (
    <div>

      <Input onChange={e => setComment(e.target.value)} value={comment} ref={inputRef} />
      <Button onClick={handleCommet}>post</Button>
    </div>
  );
}

export default Comment;
