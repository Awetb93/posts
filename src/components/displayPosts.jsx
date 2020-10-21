import React from 'react'
import { CircularProgress, Paper, Avatar, IconButton,Badge } from "@material-ui/core";
import CommentIcon from '@material-ui/icons/Comment';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import firebase from "../utils/firebase";
import "firebase/database"
export default function DisplayPosts(props) {
    const color = ['red', 'green', 'black', 'pink', 'orange'];
      const { userInfo, posts, } = props;
    const handleLike = (post) => {
        const { id ,postId}= post
       

        // console.log(post.id)
         const db = firebase.database().ref("user/" + id);
         db.child("posts/"+postId).child("posts").update({likes:post.likes+1})
       
    }
    let renderList=''
    if (posts) {
        renderList = posts.map((post, index) => {
            const randem = Math.round(Math.random() * 3) + 1;
            
   
            if (post.posts === "") {
                return null
            }
            else {
                return (
                 
                    <div className="post-display" key={index}>
                        <div className="avatar" style={{ background: '#F5F5F5' }} >
                            <Avatar style={{ background: color[randem] ,marginBottom:'10px'}}>H</Avatar>
                        </div>
                       
                        <div style={{marginLeft:'10px',marginBottom:'10px'}}  >
                            <p style={{marginBottom:'10px'}}>{post.posts}</p>
                            <div className="post-dispaly-action">
                              <IconButton aria-label="show 11 new notifications" color="inherit"onClick={()=>handleLike(post)}>
                                    <Badge badgeContent={post.likes}color="secondary">
                           <FavoriteBorderIcon/>
                                </Badge>
                                </IconButton>
                              
 <IconButton aria-label="show 11 new notifications" color="inherit">
                              <Badge badgeContent={0} color="secondary">
                           <CommentIcon/>
                                </Badge>
                              </IconButton>
                                
                           
                            </div>
                        </div>
                    </div>
                    )
            }
    
}) 
    }
    return (
        <div>
            <Paper>
                {posts === undefined ? (<CircularProgress />) : renderList} 
               
            </Paper>
         
        </div>
    )
}
