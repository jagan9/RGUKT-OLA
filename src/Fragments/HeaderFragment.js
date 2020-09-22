import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import firebase from '../firebase';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Drawer from '@material-ui/core/Drawer';
import clsx from 'clsx';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import HomeIcon from '@material-ui/icons/Home';
import RedeemIcon from '@material-ui/icons/Redeem';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import ListIcon from '@material-ui/icons/List';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import {Redirect} from 'react-router-dom'


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(0),
  },
  title: {
    flexGrow: 1,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '40%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: '30%',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
}));


function ButtonAppBar(props) {
  const classes = useStyles();
  const [User, setUser] = React.useState("");
  const [open, setOpen] = React.useState(false);
  let Left = "left";
  
  const [state, setState] = React.useState({  
    left: false, 
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose1 = () => {
    setOpen(false);
    
  };

  const closeLeft = () =>{
    setState(false);
  }

  const closeLeft1 = () =>{
    setState(false);
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);

    firebase.auth().signOut().then(()=>{
    }).catch((err)=>{
      console.log(err);
    })
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
    >
      <List>
      <a href="/home" 
      style={{textDecoration:"none",color:"inherit"}}
      onClick={toggleDrawer(Left, false)} 
      >
          <ListItem button onClick={()=>closeLeft()}>
            <ListItemIcon>< HomeIcon style={{color:"red"}}/></ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          </a>
      </List>
      <List>
      <a href="/products" style={{textDecoration:"none",color:"inherit"}} >
          <ListItem button onClick={()=>closeLeft()}>
            <ListItemIcon>< RedeemIcon style={{color:"red"}}/></ListItemIcon>
            <ListItemText primary="Products" />
          </ListItem>
          </a>
      </List>
      <List>
      <a href="/search" style={{textDecoration:"none",color:"inherit"}} >
          <ListItem button onClick={()=>closeLeft()}>
            <ListItemIcon>< SearchIcon style={{color:"red"}}/></ListItemIcon>
            <ListItemText primary="Search" />
          </ListItem>
      </a>    
      </List>
      <Divider />
      {User!=="" &&User.email !=="admin@g.com"?<>
       <List>
       <a href="/favorites" style={{textDecoration:"none",color:"inherit"}} >
          <ListItem button onClick={()=>closeLeft()}>
            <ListItemIcon>< FavoriteIcon style={{color:"red"}}/></ListItemIcon>
            <ListItemText primary="Favorites" />
          </ListItem>
          </a>
      </List> 
      <List>
      <a href="/upload" style={{textDecoration:"none",color:"inherit"}} >
          <ListItem button onClick={()=>closeLeft()}>
            <ListItemIcon>< CloudUploadIcon style={{color:"red"}}/></ListItemIcon>
            <ListItemText primary="Upload" />
          </ListItem>
          </a>
      </List> 
      <List>
      <a href="/my_uploads" style={{textDecoration:"none",color:"inherit"}} >
          <ListItem button onClick={()=>closeLeft()}>
            <ListItemIcon>< ListIcon style={{color:"red"}}/></ListItemIcon>
            <ListItemText primary="My Uploads" />
          </ListItem>
          </a>
      </List>
      <Divider />
      <List>
      
          <ListItem button onClick={()=>closeLeft1()}>
            <ListItemIcon>< ExitToAppIcon style={{color:"red"}}/></ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
          
      </List>
      <Divider /> 
      </>
      :null}

      {User!=="" &&User.email ==="admin@g.com"?
      <>
      <List>
      <a href="/favorites" style={{textDecoration:"none",color:"inherit"}} >
      <ListItem button onClick={()=>closeLeft()}>
            <ListItemIcon>< FavoriteIcon style={{color:"red"}}/></ListItemIcon>
            <ListItemText primary="Favorites" />
      </ListItem>
      </a>    
      </List> 
      <List>
      <a href="/pending" style={{textDecoration:"none",color:"inherit"}} >
          <ListItem button onClick={()=>closeLeft()}>
            <ListItemIcon>< HourglassEmptyIcon style={{color:"red"}}/></ListItemIcon>
            <ListItemText primary="Pending Products" />
          </ListItem>
          </a>
      </List>
      <Divider />
      <List>
      
          <ListItem button onClick={()=>closeLeft1()}>
            <ListItemIcon>< ExitToAppIcon style={{color:"red"}}/></ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
          
      </List>
      <Divider /> 
      </>:null}
      
    </div>
  );


  firebase.auth().onAuthStateChanged((user)=>{
       if (user) {
        setUser(user);
       }   
       else{
        setUser("")
       }  
     })
  return (
    <div className={classes.root}>
      <AppBar 
      style={{background:"#dc3545"}} 
      position="static">
        <Toolbar>
          <IconButton 
          edge="start" 
          className={classes.menuButton} 
          color="inherit" 
          aria-label="menu"
          onClick={toggleDrawer(Left, true)}>
          <MenuIcon  />
          </IconButton>
      
          <Typography 
          variant="h6" 
          className={classes.title}>
            RGUKT
          </Typography>

          {
            User===""?
            <Button color="inherit"> 
            <a style={{textDecoration:"none",
            color:"white"}} href="/Login" >
            Login</a>
            </Button>
            :<>
            <a 
            href="/profile" 
            style={{textDecoration:"none",
            color:"inherit"}} >
             <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              </a>
             </>
           }
          
        </Toolbar>
      </AppBar>
    <Drawer 

    anchor={Left} 
    open={state[Left]} 
    onClose={toggleDrawer(Left, false)}>
    {list(Left)}
    </Drawer>

        <Dialog
        open={open}
        onClose={handleClose1}
        aria-labelledby="responsive-dialog-title"
        >
        <DialogTitle id="responsive-dialog-title">{"Logout ??"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure want to logout from this website??
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose1} color="primary">
            Cancel
          </Button>
          <a href="/home" style={{textDecoration:"none"}}>
          <Button onClick={handleClose} color="primary" autoFocus>
            Ok
          </Button>
          </a>
        </DialogActions>
      </Dialog>
    </div>
  );
}


export default ButtonAppBar;
