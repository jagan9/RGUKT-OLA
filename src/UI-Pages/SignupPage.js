import React, {Component} from 'react';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import {Box} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import {firebaseAuth, firestore} from '../firebase';
import Snackbar from '@material-ui/core/Snackbar';
import {Link} from 'react-router-dom';
import Logo from '../media/favicon.ico';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

class Signup extends Component {

	constructor(props) {
		super(props)
	
		this.state = {
			 show_progress:false,
			 snakbar:false,
			 email:"",
			 password:"",
			 confirm_Password:"",
			 user_name:"",
			 phone:"",
			 first_name:"",
			 last_name:"",
			 hostel_name:"OBH",
			 block:"WEST",
			 room_no:"", 
			 facebook:"",
			 show_phone:true,
			 show_facebook:true,
			 show_room:true,
		}
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


	formSubmitted=()=>{
		let validData=true;
		
	    this.state.email_error=null;
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
			})
			data["admin"]=false
			data["first_name"]=this.state.first_name;
			data["block"]=this.state.block;
			data["email"]=this.state.email;
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
			firebaseAuth
			 .createUserWithEmailAndPassword(this.state.email, this.state.password)
			 .then((res)=>{
			 this.setState({
			 	show_progress:false
			 });
             data["id"] = res.user.uid;

			 firestore
			 .collection("USERS")
			 .doc(res.user.uid)
			 .set(data)
			 .then((sol)=>{

			 })
			 .catch((err)=>{
			 	console.log(err)
			 })
             
			 }).catch((err)=>{
			 	console.log(err);
			 	this.setState({
			 	show_progress:false
			 })
			 	if (err.code==="auth/weak-password") {
			 		this.setState({
			 			snakbar:true,
			 			snackbar_error:"Week Password !",
			 		})
			 	}
			 	if (err.code==="auth/invalid-email") {
			 		this.setState({
			 			email_error:"Invalid email!",
			 		})
			 	}
			 	if (err.code==="auth/email-already-in-use") {
			 		this.setState({
			 			snakbar:true,
			 			snackbar_error:"Email already in use !",
			 	  })
			 	}
			 })
		   }
	    }


	render() {
		return (
		    <Container 
		    maxWidth="xs" 
		    style={{marginTop:"50px",
		    textAlign:"center"}} >
			 <Box 
			 bgcolor="white" 
			 boxShadow="2" 
			 textAlign="center" 
			 p="24px" 
			 mt="50px" 
			 borderRadius="13px">
			 <img 
			 src={Logo} 
			 alt="logo" 
			 height="60px" 
			 width="60px"/>
			 <br/>
			 <Typography 
			 variant="h4" 
			 color="secondary">
             SIGN UP 
             </Typography>
             
	          <br/><br/>
	          <TextField
	          label="User name"
	          fullWidth
	          error={this.state.name_error!=null}
	          helperText={this.state.name_error}
	          type="text"
	          onChange={this.handleChange}
	          name="user_name"
	          variant="outlined"
	          size="small"
	          />
	          <br/><br/>
			  <TextField
	          label="Email"
	          fullWidth
	          error={this.state.email_error!=null}
	          helperText={this.state.email_error}
	          type="email"
	          onChange={this.handleChange}
	          name="email"
	          variant="outlined"
	          size="small"
	          />
	         
	          <br/><br/>
	          <TextField
	          label="Password"
	          error={this.state.password_error!=null}
	          helperText={this.state.password_error}
	          type="password"
	          onChange={this.handleChange}
	          name="password"
	          fullWidth
	          variant="outlined"
	          size="small"
	          />
	          <br/><br/>

	          <TextField
	          label="confirm Password"
	          error={this.state.confirm_password_error!=null}
	          helperText={this.state.confirm_password_error}
	          type="password"
	          onChange={this.handleChange}
	          name="confirm_Password"
	          fullWidth
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
	          variant="outlined"
	          size="small"
	          />
	          <br/><br/>

	           <select 
	           defaultValue={this.state.hostel_name} 
	           onChange={this.handleChange} 
	           name="hostel_name" 
	           style={{fontSize:"16px",
	           color:"#7c7c8e",
	           minWidth:"346px",
	           height:"43px",
	           borderRadius:"4px"}}>
				 <option style={{height:"20px"}}>OBH</option>
				 <option style={{height:"20px"}}>PUC2</option>
				 <option style={{height:"20px"}}>Eng1</option>
				 <option style={{height:"20px"}}>Eng2</option>
				 <option style={{height:"20px"}}>En3</option>
				 <option style={{height:"20px"}}>Eng4</option>

				 </select>
	          
	           <br/><br/>
	           <select 
	           defaultValue={this.state.block} 
	           onChange={this.handleChange} 
	           name="block" 
	           style={{fontSize:"16px",
	           color:"#7c7c8e",
	           minWidth:"346px",
	           height:"43px",
	           borderRadius:"4px"}}>
			    <option style={{height:"20px"}}>WEST</option>
			    <option style={{height:"20px"}}>EAST</option>
			</select>
	         
	          <br/><br/>
	          <TextField
	          label="Room no"
	          fullWidth
	          error={this.state.roomno_error!=null}
	          helperText={this.state.roomno_error}
	          onChange={this.handleChange}
	          name="room_no"
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
	          variant="outlined"
	          size="small"
	          />
	          <br/><br/>

	          <Typography 
	          variant="h6">
	          Check the info. you want to keep public : 
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
			    	onChange={(e)=>this.handleSwitch(e)
			    	}/>
			    }
			    label="Phone No"
			  />
	          <br/>
	          <FormControlLabel
			    control={<Switch 
			    	checked={this.state.show_room} 
			    	name="show_room" 
			    	onChange={(e)=>this.handleSwitch(e)
			    	} 
			    	/>
			    }
			    label="Room Info"
			  />
			  
			  <br/><br/>

	          {
	          	this.state.show_progress?
	          	<CircularProgress color="secondary" />
	          	:
	            null
	          }
	          
	          <br/><br/>
	          <Button 
	          fullWidth
	          variant="contained" 
	          color="secondary"
	          onClick={this.formSubmitted}>
              Sign Up
              </Button>

              <br/><br/>
              <Typography>
              Already have an account ?  
              <Link to="/Login" >
               Sign In
              </Link>
              </Typography>

              <Snackbar
		        anchorOrigin={{
		          vertical: 'bottom',
		          horizontal: 'left',
		        }}
		        open={this.state.snakbar}
		        autoHideDuration={1000}
		        onClose={e=>this.setState({
		          snakbar:false
		        })}
		        message={this.state.snackbar_error}
		        
        	/>
			 </Box>
			 <br/><br/>
			 <br/><br/>
			</Container>
		)
	}
}

export default Signup;