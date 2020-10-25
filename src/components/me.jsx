import React,{useState,useEffect} from 'react'
import { Avatar, Grid, TextField, Button, IconButton,Paper } from '@material-ui/core'
import PhotoCamera from "@material-ui/icons/PhotoCamera"
import { useLocation } from "react-router-dom";
import firebase from "../utils/firebase";
import DisplayPost from "./displayPosts"
import moment from "moment"
import 'firebase/database'
import 'firebase/storage'
import UserMenu from "./users"
export default function Me() {
    // const filter=new Filter()
    const [text, setText] = useState('');
    const [imageName, setImage] = useState('');
    const [imageFile, setImageFile] = useState();
    const [dbusers,setDbUsers]=useState()
    const [posts,setPosts]=useState()
    const { state } = useLocation();
    const name = Array.from(state.name);
    const [index,setIndex]=useState(0)
    const color = ['red', 'green', 'black','pink', 'orange'];
    useEffect(() => {
         const randem = Math.round(Math.random() * 3) + 1;
        setIndex(randem);
         const db = firebase.database().ref('user');
        db.on('value', snap => {
            const user = snap.val();
            let users = [];
            let posts = [];
           
             for (let id in user) {
                users.push({ email: user[id].profile.email, id, name:user[id].profile.name });
                for (let ids in user[id].posts) {
                    if (user[id].posts[ids].posts.imageName) {
                        posts.push({ posts: user[id].posts[ids].posts.text, imageName:user[id].posts[ids].posts.imageName,likes:user[id].posts[ids].posts.likes, postId:ids, id,name:user[id].profile.name,time:user[id].posts[ids].posts.time })    
                    }
                    else {
                          posts.push({ posts: user[id].posts[ids].posts.text,postId:ids, id,name:user[id].profile.name,likes:user[id].posts[ids].posts.likes,time:user[id].posts[ids].posts.time })  
                    }
                  
                }
            }    
            
           
            setDbUsers(users)
            setPosts(posts)
            console.log(users)
            console.log(posts)
        })
        return () => {
          db.off()
      }
    
    },[])
    const addPost = () => {
        const db = firebase.database().ref('user');
         const me = dbusers.find(user => user.email === state.email);
        
            // let filteredWords=filter.clean(text)
        if (me && imageFile) {
            const storage = firebase.storage().ref('Images');
            const reg = imageName.match(/[ \w-]+?(?=\.)/);
            const ref = storage.child(reg[0])
            db.child(me.id).child('posts').push({ posts: { text, imageName: reg[0],likes:0,time:moment().format('hh:mm:ss a')  } });
            ref.put(imageFile).then((snap) => {
                console.log('file was uploaded')
                setImage("")
                setText("")
            })
        }
        else if (me && !imageFile) {
            db.child(me.id).child('posts').push({ posts: { text,likes:0,time:moment().format('hh:mm:ss a')  } });
            setText("")
        }
        else if (!me && imageFile) {
            const storage = firebase.storage().ref('Images');
            const reg = imageName.match(/[ \w-]+?(?=\.)/);
            const ref = storage.child(reg[0])
            db.push({ profile: { ...state, age: 24 }, posts: { 0:{posts:{text, imageName: reg[0], likes: 0,time:moment().format('hh:mm:ss a')   }} } })
             ref.put(imageFile).then((snap) => {
                console.log('file was uploaded')
                
              
             })
            setImage("")
            setText("")

            }
       
        else {
      
            db.push({ profile: { ...state, age: 24 },  posts: { 0:{posts:{text, likes: 0,time:moment().format('hh:mm:ss a')  }} } })
            setText("")
        } }
 
    const handleFile = (e) => {
  
        setImage(e.target.value);
         setImageFile(e.target.files[0])
    }
    return (   
 <Grid className="container" container
  direction="row"
  justify="center"
  alignItems="center" >
            <Grid item sm={1} md={2} ></Grid>
            <Grid item container sm={10} md={8} >
                <Grid item sm={10} md={10}>
                    <Paper style={{height:'170px'}}>
                        <div className="post" >
                            <div className="avatar" >
                  <Avatar style={{background:color[index]}}>{name[0]}</Avatar>
                            </div>
                       
                        <div className="post-edit" >
                            <TextField style={{width:'100%'}} onChange={e=>setText(e.target.value)} value={text}
                             id="outlined-textarea"label={`what is in your mind ${state.name}?`}
                              placeholder="post" multiline variant="outlined" />
                            <div className="post-action">
                                <input accept="image/*" onChange={handleFile} style={{display:'none'}} id="icon-button-file" type="file"/  >
                            <label htmlFor="icon-button-file">
                          <IconButton  color="primary" aria-label="upload picture" component="span">
                          <PhotoCamera />
                        </IconButton>
                          </label>
                              
                            <Button onClick={addPost} >Post</Button>
                        </div>
                        </div>
                    </div>
                    <div className="view-posts">
                     
                            <DisplayPost userInfo={dbusers} posts={posts} />
                        </div>
                        <div className="user-container">
                                 <UserMenu users={dbusers} className="user-list"/>
                        </div>
                        </Paper>
                </Grid>
                <Grid item sm={1} md={2} >

               
                </Grid>
            </Grid>
            <Grid item sm={1} md={2} ></Grid>
     </Grid>
      
       
    )
}
