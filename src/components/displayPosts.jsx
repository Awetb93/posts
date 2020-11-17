import React from 'react'
import { CircularProgress, Paper, Avatar, IconButton,Badge, Accordion,AccordionSummary,AccordionDetails,Typography} from "@material-ui/core";
import CommentIcon from '@material-ui/icons/Comment';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import firebase from "../utils/firebase";
import { Link, } from "react-router-dom";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Comment from "./comment"
import moment from "moment"
import RenderPic from "./renderPic"
export default function DisplayPosts(props) {
    // const { id } = useParams();
    const color = ['red', 'green', 'black', 'pink', 'orange'];
    const { posts, userInfo } = props;
    console.log(userInfo)
    const handleLike = (post) => {
        const { id, postId } = post;
         const db = firebase.database().ref("user/" + id);
         db.child("posts/"+postId).child("posts").update({likes:post.likes+1})
    }
    let renderList=''
    if (posts) {
        renderList = posts.map((post, index) => {
            const randem = Math.round(Math.random() * 3) + 1;
            const name = Array.from(post.name);
            if (post.posts === "") {
                return null
            }
            else {
            //   console.log(post)
                let list = []
                let obj={}
                if (post.comments) {
    for (let id in post.comments[0]) {
        list.push({ ...post.comments[0][id] });
                    } 
                }
                obj[index]=list.length
                return (
                    <div className="post-display" key={index}>
                        <div className="avatar" style={{ background: '#F5F5F5' }} >
                            <Link to={{pathname:`/profile/${post.id}`,state:{userInfo}}}><Avatar style={{ background: color[randem], marginBottom: '10px' }}>{name[0]}</Avatar></Link>
                            <p>{moment({inp: post.time }).fromNow()}</p>
                        </div>
                        <div style={{marginLeft:'10px',marginBottom:'10px'}}  >
                            <p style={{ marginBottom: '10px' }}>{post.posts}</p>
                            {post.imageKey!==undefined? <RenderPic pic={{key:post.imageKey,name:post.imageName}} />:null}
                            <div className="post-dispaly-action">
                              <IconButton aria-label="show 11 new notifications" color="inherit"onClick={()=>handleLike(post)}>
                           <Badge badgeContent={post.likes}color="secondary">
                           <FavoriteBorderIcon/>
                                </Badge>
                                </IconButton>
 <IconButton aria-label="show 11 new notifications" color="inherit">
                              <Badge badgeContent={obj[index]} color="secondary">
                           <CommentIcon/>
                                </Badge>
                              </IconButton>
                              <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header" >
          <Typography >Comments</Typography>
        </AccordionSummary>
        <AccordionDetails>
                                        <Comment post={post} useremail={ userInfo}/>
        </AccordionDetails>
      </Accordion>
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
