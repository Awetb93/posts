import React,{useState,useRef,} from 'react';
import firebase from '../utils/firebase';
import { Button, Input ,Avatar,List,ListItem,ListItemAvatar,ListItemText, Typography,} from "@material-ui/core"
import history from "../utils/history"
import Moment from "moment"
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import "firebase/database"
const Comment = ({post,useremail}) => {
  const [comment, setComment] = useState("")
  const inputRef = useRef();
  const handleCommet = () => {
    console.log(comment)
    const db = firebase.database().ref('user').child(post.id).child('posts').child(post.postId);
    db.child('comments').push({ comment, name: post.name, time: new Date().toLocaleTimeString() })
    setComment("")
  }
  console.log(useremail)
  let list =[];
  if (post.comments) {
    for (let id in post.comments[0]) {
      list.push({...post.comments[0][id] })
    }
  }
  const renderList =list.map((comnt, index) => {
    return (
       <ListItem key={index} alignItems='flex-start'>
        <ListItemAvatar onClick={()=>{history.push({pathname:`/profile/${post.id}`,state:{useremail}})}} style={{cursor:'pointer'}}>
          <Avatar>
            <AccountCircleIcon/>
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={
             <>
            <Typography component="span"
                variant="body2"
                color="textPrimary">
{comnt.name}
            </Typography>
            <Typography component="span"
                variant="body2"
                color="textSecondary" style={{marginLeft:'5px'}}>
{Moment({inp:comnt.time}).fromNow()}
            </Typography>
            </>
         } secondary={comnt.comment}
      />
      </ListItem>
    )
  })
  return (
    <div>
        <Input onChange={e => setComment(e.target.value)} value={comment} ref={inputRef} placeholder="write your comments"/>
      <Button onClick={handleCommet}>post</Button>
       <List>
        {renderList}  
</List>
    </div>
  );
}
export default Comment;
