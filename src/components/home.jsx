import React,{useState,useEffect} from 'react'
import { AppBar, Toolbar, IconButton, Typography, Button } from "@material-ui/core"
import MenuIcon from '@material-ui/icons/Menu';
import ShareIcon from '@material-ui/icons/Share';
import { makeStyles } from '@material-ui/core/styles';
import firebase from "../utils/firebase";
import "firebase/auth";
import "firebase/database"
import history from "../utils/history"
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Home() {
  const [logedUser, setLogedUser] = useState()
  const classes = useStyles();
  useEffect(() => {
    firebase.auth().onAuthStateChanged( (user)=> {
      if (user) {
     const userProfile = { name: user.displayName, id: user.uid, email: user.email };
        setLogedUser(userProfile);
         history.push({pathname:`/me/${userProfile.id}`,state:userProfile})
 }
      
    else {
        history.push('/')
    }
  })
},[])

  const signIn = async () => {
    await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
    try {
      
      const provider = new firebase.auth.GoogleAuthProvider();
      const user = await firebase.auth().signInWithPopup(provider);
      return  user.user
      
    }
    catch (e) {
    

      console.log(e)
    }
  }
  
  const signOut = async () => {
    await firebase.auth().signOut();
    try {
      setLogedUser(null)
      history.push('/')
    }
    catch (e) {
      console.log(e)
    }
    
  }
 
    return (
     <div className={classes.root}>
      <AppBar position="static" color='default'>
        <Toolbar >
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
                        JS Community
                            <ShareIcon fontSize="large"/>
          </Typography>

         
            {!logedUser ? <Button onClick={signIn} color="inherit">Login</Button> : (<>
            <Button onClick={signOut} color="inherit">LogOut</Button>
              <Button onClick={() => { history.push({pathname:`/me/profile/${logedUser.id}`,state:logedUser})}} color="inherit">Profile</Button>
          
            </>)} 
          
     
        
        </Toolbar>
      </AppBar>
    </div>
    )
}
