import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PersonOutlineRoundedIcon from '@material-ui/icons/PersonOutlineRounded';
import history from '../utils/history';
const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

export default function TemporaryDrawer(props) {
    const { users } = props;
    console.log(users)
  const classes = useStyles();
  const [state, setState] = React.useState(
    false
  );

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState( open );
  };

      if (users) {
          
      }
    const list = (anchor) => {

        if (users) {
            return (
                 <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {users.map((user, index) => (
          <ListItem button key={index} onClick={()=>history.push(`/profile/${user.id}`)}>
                <ListItemIcon>
                    <PersonOutlineRoundedIcon/>
            </ListItemIcon>
            <ListItemText primary={user.name} />
          </ListItem>
        ))}
      </List>
      <Divider />
     
    </div> 
            )
        }
        

    }
  
  

  return (
    <div>
     
        
          <Button onClick={toggleDrawer('right', true)}>Right</Button>
          <Drawer anchor='right' open={state} onClose={toggleDrawer('right', false)}>
            {list('right')}
          </Drawer>
    
    </div>
  );
}
