import React from 'react';
import Typography from '@material-ui/core/Typography';
import {
	Slide,
	IconButton,
	Box,
	Dialog,
	AppBar,
	Toolbar,
	Snackbar,
	Backdrop,
	CircularProgress
} from '@material-ui/core';
import {Close} from '@material-ui/icons';
import Container from '@material-ui/core/Container';
import FacebookIcon from '@material-ui/icons/Facebook';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import firebase,{firestore, firebaseAuth} from '../firebase';



export class ProfileFragment extends React.Component {

	constructor(props) {
		super(props)
	
		this.state = {
			 addDialog:false,
			 snackbar:false,
			 user_name:"",
			 phone:"",
			 first_name:"",
			 last_name:"",
			 hostel_name:"",
			 block:"",
			 room_no:"", 
			 facebook:"",
			 show_phone:true,
			 show_facebook:true,
			 show_room:true,
			 uid:"",
			 show_progress:false,
		}
	}

	editProfile = () =>{
		this.setState({addDialog:true});
		this.setState({
			 user_name:this.props.data.user_name,
			 phone:this.props.data.phone,
			 first_name:this.props.data.first_name,
			 last_name:this.props.data.last_name,
			 hostel_name:this.props.data.hostel,
			 block:this.props.data.block,
			 room_no:this.props.data.room,
			 facebook:this.props.data.facebook,
			 show_phone:this.props.data.show_phone,
			 show_facebook:this.props.data.show_facebook,
			 show_room:this.props.data.show_room,
		})
	}

	handleChange = (e) =>{		
		this.setState({
			[e.target.name]:e.target.value,
		})
	}

	handleClose = () => {
     this.setState({ snakbar:false});
    };

    handleSwitch = (e) =>{
    	this.setState({
    		[e.target.name]:!this.state[e.target.name],
    	})
    }

    save = () =>{
    	let validData=true;
	    
	    this.state.password_error=null;
	    this.state.confirm_password_error=null;
	    this.state.name_error=null;
	    this.state.number_error=null;
	    this.state.firstname_error=null;
	    this.state.lastname_error=null;
	    this.state.hostelname_error=null;
	    this.state.block_error=null;
	    this.state.roomno_error=null;
	    this.state.facebook_error=null;

		if (this.state.email === "") {
			this.state.email_error="Requried";
			validData=false;
			
		}
		if (this.state.password === "") {
			this.state.password_error="Requried";
			validData=false;
	
		}

		if (this.state.confirm_Password !== this.state.password) {
			this.state.confirm_password_error="Password does not Match!";
			validData=false;
		}

		if (this.state.user_name==="") {
			this.state.name_error="Requried!"
			validData=false
		}

		if (this.state.first_name==="") {
			this.state.firstname_error="Requried!"
			validData=false
		}

		if (this.state.facebook==="") {
			this.state.facebook_error="Requried!"
			validData=false
		}

		if (this.state.hostel_name==="") {
			this.state.hostelname_error="Requried!"
			validData=false
		}

		if (this.state.block==="") {
			this.state.block_error="Requried!"
			validData=false
		}

		if (this.state.room_no==="") {
			this.state.roomno_error="Requried!"
			validData=false
		}

		if (this.state.last_name==="") {
			this.state.lastname_error="Requried!"
			validData=false
		}

        var a = /^\d{10}$/;  
        if (a.test(this.state.phone))   
        {  
            this.state.number_error=null;
        }   
        else   
        {  
            this.state.number_error="Not Valid Number!"
			validData=false  
        }  
  		
		this.setState({
			update:true,
		})

		let data = {};
		if (validData) {
			this.setState({
				show_progress:true
			});
			data["first_name"]=this.state.first_name;
			data["block"]=this.state.block;
			data["facebook"]=this.state.facebook;
			data["hostel"]=this.state.hostel_name;
			data["last_name"]=this.state.last_name;
			data["phone"]=this.state.phone;
			data["room"]=this.state.room_no;
			data["show_facebook"]=this.state.show_facebook;
			data["show_phone"]=this.state.show_phone;
			data["show_room"]=this.state.show_room;
			data["user_name"]=this.state.user_name;
		}

		if (validData) {
			
			 firestore
			 .collection("USERS")
			 .doc(this.props.uid)
			 .update(data)
			 .then((sol)=>{
			 	this.setState({
				show_progress:false
			})
			 	this.props.reload()
			 })
			 .catch((err)=>{
			 	console.log(err)
			 })
	     }
      }
    

    changePass = () =>{
    	firebase
    	.auth()
    	.sendPasswordResetEmail(this.props.email)
    	.then(()=>{
    		this.state.snackbar_error="Password Email Link is send to email."
    		this.setState({
    			snackbar:true,
    		})
    		
    	}).catch((error)=>{
    		console.log(error)
    	})
    }

	render() {
		return (
			<div style={{marginBottom:"70px"}} >
			<Container 
		    maxWidth="xs" 
		    style={{marginTop:"40px",
		    color:"#212529",
		    textAlign:"center"}} >
			 <Box 
			 bgcolor="white" 
			 boxShadow="2"  
			 mt="50px" 
			 borderRadius="13px">
			 <Typography 
			 variant="h4" 
			 style={{padding:"20px 0px 10px 0px",
			 background:"#00000010",
			 color:"black",
			 textAlign:"center" }} >
             PROFILE 
             </Typography>
                                     
             <br/>
             <div style={{padding:"10px 24px 24px 24px"}}>
			 <Typography 
			 variant="h6">
			 First name : {'    '}
			 {this.props.data.first_name}
			 </Typography>
			 
			 <Typography 
			 variant="h6">
			 Last name : {'    '}
			 {this.props.data.last_name}
			 </Typography>
			
			 <Typography 
			 variant="h6">
			 Email : {'    '}
			 {this.props.data.email}
			 </Typography>

			 <Typography 
			 variant="h6">
			 User name : {'    '}
			 {this.props.data.user_name}
			 </Typography>
			 

			 {
			 this.props.data.show_room === true ?
			 <>
			 <Typography 
			 variant="h6">
			 Address : {'    '}
			 Room No : {this.props.data.room}, 
			  {this.props.data.hostel}
			 </Typography>
			 <Typography 
			 variant="caption">
			 (publicy visible)
			 </Typography>
			 </>
			 :null
			 }

			 {
			 this.props.data.show_phone === true ?
			 <>
			 <Typography 
			 variant="h6">
			 Phone No. : {'    '}
			 {this.props.data.phone}
			 </Typography>
			 <Typography 
			 variant="caption">
			 (publicy visible)
			 </Typography>
			 </>
			 :null
			 }
			

			 {
			 this.props.data.show_facebook === true ?
			 <>
			 <Typography 
			 variant="h6"
			 >
			 facebook profile : {'    '}
			 <a href={this.props.data.facebook} 
			 target="_blank" >
			 link
			 </a>
			 </Typography>
			 <Typography 
			 variant="caption">
			 (publicy visible)
			 </Typography>
			 </>:null
			 }

			 <br/>
			 <br/>

			 <div 
			 style={{display:"flex",
			 flexWrap:"true",
			 justifyContent:"space-around"}}>

			 <Button 
			 onClick={()=>this.editProfile()} 
			 style={{background:"#17a2b8",
			 color:"white"}} 
			 variant="contained">
			 Edit {"  "}
			 <EditIcon 
			 fontSize="small" 
			 style={{marginLeft:"8px"}} />
			 </Button>

			 <Button 
			 onClick={()=>this.changePass()} 
			 style={{background:"#17a2b8",
			 color:"white"}} 
			 variant="contained">
			 Change password {"  "} 
			 <VpnKeyIcon 
			 fontSize="small"  
			 style={{marginLeft:"8px"}} />
			 </Button>

			 </div>
			 </div>
			 </Box>
			</Container>


      <Dialog 
      fullScreen 
      open={this.state.addDialog} 
      onClose={e=>{this.setState({addDialog:false})}} 
      TransitionComponent={Transition}>
        <AppBar style={{background:"#ff6347"}} >
          <Toolbar>
            <IconButton 
            edge="start" 
            color="inherit" 
            onClick={e=>this.setState({
              addDialog:false
            })} aria-label="close">
              <Close />
            </IconButton>
            <Typography variant="h6" >
             Edit profile
            </Typography>
            <Button 
            style={{position:"absolute" , right:"0"}} 
            autoFocus color="inherit" 
            onClick={e=>this.save()}>
              save
            </Button>
          </Toolbar>
        </AppBar>
    <Toolbar/>

         <Container 
		     maxWidth="xs" 
		     style={{marginTop:"0px",
		     marginBottom:"30px",
		     textAlign:"center"}} >

			 <Box 
			 bgcolor="white" 
			 boxShadow="2" 
			 textAlign="center" 
			 p="24px" 
			 mt="50px" 
			 borderRadius="13px"> 
			 <Typography 
			 variant="h4" 
			 style={{padding:"13px",
			 background:"#00000010",
			 textAlign:"center",
			 borderTopLeftRadius:"10px",
			 borderTopRightRadius:"10px"}}>
			 Edit Profile
			 </Typography>

			 <hr/>	       
	         <br/>
	          <TextField
	          label="User name"
	          fullWidth
	          error={this.state.name_error!=null}
	          helperText={this.state.name_error}
	          type="text"
	          defaultValue={this.props.data.user_name}
	          onChange={this.handleChange}
	          name="user_name"
	          variant="outlined"
	          size="small"
	          />

	          <br/><br/>
	          <TextField
	          label="First name"
	          fullWidth
	          error={this.state.firstname_error!=null}
	          helperText={this.state.firstname_error}
	          onChange={this.handleChange}
	          type="text"
	          defaultValue={this.props.data.first_name}
	          name="first_name"
	          variant="outlined"
	          size="small"
	          />
	          <br/><br/>

	          <TextField
	          label="Last name"
	          fullWidth
	          error={this.state.lastname_error!=null}
	          helperText={this.state.lastname_error}
	          onChange={this.handleChange}
	          name="last_name"
	          type="text"
	          defaultValue={this.props.data.last_name}
	          variant="outlined"
	          size="small"
	          />
	          <br/><br/>

	          <TextField
	          label="Hostel name"
	          fullWidth
	          error={this.state.hostelname_error!=null}
	          helperText={this.state.hostelname_error}
	          onChange={this.handleChange}
	          name="hostel_name"
	          type="text"
	          defaultValue={this.props.data.hostel}
	          variant="outlined"
	          size="small"
	          />
	          <br/><br/>

	          <TextField
	          label="Block"
	          fullWidth
	          type="text"
	          error={this.state.block_error!=null}
	          helperText={this.state.block_error}
	          onChange={this.handleChange}
	          name="block"
	          defaultValue={this.props.data.block}
	          variant="outlined"
	          size="small"
	          />
	          <br/><br/>

	          <TextField
	          label="Room no"
	          fullWidth
	          error={this.state.roomno_error!=null}
	          helperText={this.state.roomno_error}
	          onChange={this.handleChange}
	          name="room_no"
	          defaultValue={this.props.data.room}
	          type="text"
	          variant="outlined"
	          size="small"
	          />
	          <br/><br/>

	          <TextField
	          label="Facebook profile"
	          fullWidth
	          error={this.state.facebook_error!=null}
	          helperText={this.state.facebook_error}
	          onChange={this.handleChange}
	          name="facebook"
	          defaultValue={this.props.data.facebook}
	          type="text"
	          variant="outlined"
	          size="small"
	          />
	          <br/><br/>

	          <TextField
	          label="phone Number"
	          fullWidth
	          error={this.state.number_error!=null}
	          helperText={this.state.number_error}
	          type="number"
	          onChange={this.handleChange}
	          name="phone"
	          defaultValue={this.props.data.phone}
	          variant="outlined"
	          size="small"
	          />
	          <br/><br/>

	          <Typography 
	          variant="h6">
	          Check the info. you want to keep public: 
	          </Typography>
	          <br/>

	          <FormControlLabel
			    control={<Switch 
			    	checked={this.state.show_facebook} 
			    	name="show_facebook"  
			    	onChange={(e)=>this.handleSwitch(e)}/>
			    }
			    label="Facebook"
			  />
			  <br/>

			  <FormControlLabel
			    control={<Switch 
			    	checked={this.state.show_phone} 
			    	name="show_phone" 
			    	onChange={(e)=>this.handleSwitch(e)}/>
			    }
			    label="Phone No"
			  />
	          <br/>

	          <FormControlLabel
			    control={<Switch 
			    	checked={this.state.show_room} 
			    	name="show_room" 
			    	onChange={(e)=>this.handleSwitch(e)} />
			    }
			    label="Room Info"
			  />			          
	          
			 </Box>
			</Container>

     <Backdrop 
     style={{zIndex:1300}} 
     open={this.state.show_progress}>
     <CircularProgress 
     color="secondary" />
     </Backdrop>
         
     </Dialog>
     <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={this.state.snackbar}
        autoHideDuration={3000}
        onClose={e=>this.setState({
          snackbar:false
        })}
        message={this.state.snackbar_error}
        
      />
			</div>
		)
	}
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default ProfileFragment;