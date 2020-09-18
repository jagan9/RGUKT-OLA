import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import VisibilityIcon from '@material-ui/icons/Visibility';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import TextField from '@material-ui/core/TextField';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import firebase,{firestore} from '../firebase';
import {Snackbar} from '@material-ui/core';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {

  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );

});

const DialogContent = withStyles((theme) => ({

  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);


function CatFragment(props){

const [name, setname] = React.useState("")
const [allow_bid, setallow_bid] = React.useState(false)
const [price, setprice] = React.useState("")
const [max_bid, setmax_bid] = React.useState("")
const [incr, setincr] = React.useState("")
const [cat, setcat] = React.useState("")
const [description, setdescription] = React.useState("")

const [open, setOpen] = React.useState(false);
const [inFav, setinFav] = React.useState(false);
const [snackbar, setsnackbar] = React.useState(false);
const [snackbar_error, setsnackbar_error] = React.useState("");
const [checked, setChecked] = React.useState(true);

  const handleClickOpen = () => {
    setOpen(true);
    setname(props.product.name);
    setallow_bid(props.product.allow_bid);
    setprice(props.product.price);
    setmax_bid(props.product.max_bid);
    setincr(props.product.incr);
    setcat(props.product.cat);
    setdescription(props.product.description);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setChecked(event.target.checked);
    setallow_bid(!allow_bid);
  };


  React.useEffect(() => {

  if (props.product && props.user) {
  let reqFav = props.product.fav?props.product.fav:[];
  let fav = reqFav.some(fav=>fav === props.user);
  if (fav) {
      setinFav(true);
      } 
    }
  })

   const updateFav = () =>{

    let reqFav = props.product.fav?props.product.fav:[];
    let fav = reqFav.some(fav=>fav === props.user);
    let data = {};
    data["fav"] = reqFav;

    if (fav) {
      setsnackbar(true);
      setsnackbar_error("Already in Favorites");
    }
    else{
    setsnackbar(true);
    setsnackbar_error("Added to Favorites")
    data["fav"].push(props.user);
    setinFav(true);
    firestore
    .collection("PRODUCTS")
    .doc(props.product.id)
    .update(data)
    .then(()=>{
    }).catch((err)=>{
      console.log(err);
        })
      }
    }

   const removeFav = () => {

    let reqFav = props.product.fav?props.product.fav:[];
    let index = reqFav.indexOf(props.user);
    reqFav.splice(index,1);
    let data = {};
    data["fav"] = reqFav;

    firestore
    .collection("PRODUCTS")
    .doc(props.product.id)
    .update(data)
    .then(()=>{
     props.loadOnce();
    }).catch((err)=>{
      console.log(err);
      })
    }

      const editItem = () =>{
      setOpen(false);

      let data = {};

      data["name"] = name;
      data["allow_bid"] = allow_bid;
      data["price"] = price;
      data["cat"] = cat;
      data["description"] = description;
      data["updated_at"] = new Date();

      if(allow_bid){
      data["max_bid"] = max_bid;
      data["incr"] = incr;
      }

      setsnackbar(true);
      setsnackbar_error("Working on it wait");

      firestore
      .collection("PRODUCTS")
      .doc(props.product.id)
      .update(data)
      .then(()=>{
        props.loadOnce();
       setsnackbar(false);
      }).catch((err)=>{
        console.log(err);
       })
      };

      return (<>  
        <Box 
          boxShadow={2}
          width="340px"
          style={{
             background:"white",
             borderRadius:"20px",
             margin:"0px 15px 28px 15px",
             paddingBottom:"17px"
          }} > 
          <div style={{width:"100%",textAlign:"center"}}>
          
          <img 
          style={{
            height:"180px",
            padding:"10px 0px",
            width:"260px",
            objectFit:"scale-down"}} 
            src={props.product.images[0]} alt="img" />
          
          </div>
          <div style={{display:"flex",alignItems:"center"}}> 
          <div>

          <Typography 
          variant="h5" 
          style={{paddingLeft:"17px",color:"red"}} >
          {props.product.name} 
          </Typography>

          </div>
          {props.user !=="" && props.del!=="true"?
          <div style={{display:"flex",alignItems:"center"}}>                
           
          <FormControlLabel
            size="small"
            style={{margin:"0px"}}
            control={
              <Checkbox 
              icon={inFav?
                <Favorite style={{color:"red"}} />
                :<FavoriteBorder/>} 
                checkedIcon={inFav?<Favorite/>:
                <FavoriteBorder/>} 
                onChange={()=>updateFav()} 
                name="checkedH" />}          
            />

          {
            props.my_uploads==="true"?
            <>
            <EditIcon 
            onClick={handleClickOpen} 
            size="small" 
            style={{cursor:"pointer",
            color:"red",
            marginLeft:"0px"}}/>

            <DeleteForeverIcon 
            onClick={()=>props.delete(props.product.images,props.product.id,props.keyed)} 
              size="small" 
              style={{
                cursor:"pointer", 
                color:"red",
                marginLeft:"10px"
              }}
            />
            </>
            :null
          }          
            </div>
            :null
          }
          {
            props.user !=="" && props.del==="true"?
             <CloseIcon 
              style={{
                border:"1.7px solid red",
                color:"red",
                borderRadius:"4px",
                marginLeft:"10px",
                cursor:"pointer"}} 
                onClick={()=>removeFav()} 
             />
            :null
          }
                
            </div>

            <Typography 
            variant="h6" 
            style={{paddingLeft:"17px",
            color:"#28a745",
            fontWeight:"bold"}}>
            Price : {props.product.price} 
            </Typography>

            <Typography 
            variant="subtitle1" 
            style={{color:"black",
            padding:"0px 17px",
            height:"91px",
            overflow:"hidden"}} >
            {props.product.description}
            </Typography>

              <div 
              style={{
                width:"100%",
                textAlign:"center"}}>
              <a style={{textDecoration:"none"}} 
              href={"/products/"+props.product.id}>

              <Button 
                variant="outlined" 
                style={{color:"white",
                background:"#138496"}}>
                <VisibilityIcon 
                style={{marginRight:"8px"}} />
                View Details
              </Button>
              </a>
              </div> 
        </Box>


        <Dialog 
        onClose={handleClose} 
        aria-labelledby="customized-dialog-title" 
        open={open}>

        <DialogTitle 
        id="customized-dialog-title" 
        onClose={handleClose}>
        Edit Product
        </DialogTitle>

        <DialogContent dividers>
          <label >Name</label>{''}
          <br/>
          <TextField
          style={{minWidth:"340px",
          marginTop:"10px"}}
          defaultValue={props.product.name}
          onChange={(e)=>setname(e.target.value)}
          variant="outlined"
          size="small"
        />
        <br/>
        <br/>

        <div 
        style={{textAlign:"center"}}>

        <Checkbox
        defaultChecked={props.product.allow_bid}
        onChange={(e)=>{
          setallow_bid(e.target.checked);
        }}
        color="primary"
        size="medium"
        inputProps={{ 'aria-label': 'secondary checkbox' }}
        />

      <br/>
      <label> Allow Bidding </label>

      </div>
      { 
      allow_bid ?
      <> 
      <label > 
      Minimum Price (in ₹) 
      </label>{''}
        <br/>
        <TextField
          type="number"
          onChange={(e)=>setprice(e.target.value)}
          style={{minWidth:"340px",marginTop:"10px"}}
          defaultValue={props.product.price}
          variant="outlined"
          size="small"
        />
        <br/>
        <br/>
        <label > 
        Maximum Price (in ₹) 
        </label>{''}
        <br/>
          <TextField
          type="number"
          onChange={(e)=>setmax_bid(e.target.value)}
          style={{minWidth:"340px",marginTop:"10px"}}
          defaultValue={props.product.max_bid}
          variant="outlined"
          size="small"
        />
        <br/>
        <br/>

        <label >
        Minimum Increment (in ₹)
        </label>{''}
          <br/>
          <TextField
          type="number"
          onChange={(e)=>setincr(e.target.value)}
          style={{minWidth:"340px",marginTop:"10px"}}
          defaultValue={props.product.incr}
          variant="outlined"
          size="small"
        />
        <br/>
        <br/>
        </>:
        <>
        <label > 
        Price (in ₹) 
        </label>{''}
          <br/>
          <TextField
          type="number"
          onChange={(e)=>setprice(e.target.value)}
          style={{minWidth:"340px",marginTop:"10px"}}
          defaultValue={props.product.price}
          variant="outlined"
          size="small"
        />
        <br/>
        <br/>
        </>
    }

      <select 
      defaultValue={props.product.cat} 
      name="cat"
      onChange={(e)=>setcat(e.target.value)} 
      style={{fontSize:"16px",
      color:"#7c7c8e",
      minWidth:"340px",
      height:"47px",
      borderRadius:"4px"}}>

        <option style={{height:"20px"}}>books</option>
        <option style={{height:"20px"}}>stationary</option>
        <option style={{height:"20px"}}>sports</option>
        <option style={{height:"20px"}}>clothes</option>
        <option style={{height:"20px"}}>bicycles</option>
        <option style={{height:"20px"}}>electronics</option>
        <option style={{height:"20px"}}>others</option>

      </select>
      <br/>
      <br/>
      <label > 
      Description (in ₹) 
      </label>{''}
        <br/>
        <TextField
        onChange={(e)=>setdescription(e.target.value)}
        style={{minWidth:"340px",marginTop:"10px"}}
        defaultValue={props.product.description}
        variant="outlined"
        multiline
        rows={10}
        size="small"
        />
        <br/>
        <br/>
        </DialogContent>
        <DialogActions>
          <Button 
          autoFocus 
          onClick={()=>editItem()} 
          color="primary">
          Save changes
          </Button>
        </DialogActions>
      </Dialog>
       
      <Snackbar
        anchorOrigin={{
         vertical: 'bottom',
         horizontal: 'left',
         }}
         open={snackbar}
         autoHideDuration={3000}
         onClose={e=>
          setsnackbar(false)
         }
         message={snackbar_error} />
       </>
        )    
}

export default CatFragment;
