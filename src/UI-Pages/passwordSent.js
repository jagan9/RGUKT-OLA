import React from 'react';
import Container from '@material-ui/core/Container';
import {Box} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import firebase from '../firebase';
import CircularProgress from '@material-ui/core/CircularProgress';
import Logo from '../media/favicon.ico';

 class PasswordSent extends React.Component {

 	constructor(props) {
 		super(props)
 	
 		this.state = {
 			 email:"",
 			 show_progress:false,
 		}
 	}

 	handleChange = (e) =>{
		this.setState({
			[e.target.name]:e.target.value,
		})
	}

 	formSubmitted = () =>{
 		let validData=true;
 		this.state.email_error=null;
 		
 		if (this.state.email==="") {
 			this.state.email_error="Requried!";
 			validData=false;
 		}

 		this.setState({
 			update:true
 		})

 		if (validData) {

 			this.state.show_progress=true;
 			var auth = firebase.auth();
			var emailAddress = this.state.email;

			auth
			.sendPasswordResetEmail(emailAddress)
			.then(function() {
			 console.log("Email sent.")
			 this.setState({
			 	show_progress:false
			 })
			}).catch((error) =>{
			  console.log(error)
			  this.setState({
			 	show_progress:false
			 })

			  if (error.code==="auth/user-not-found") {
			  	this.setState({email_error:"User not Found"})
			  }
			  if (error.code==="auth/invalid-email") {
			  	this.setState({email_error:"Invalid Email"})
			  }


			});
 		}
 	}


	render() {
		return (
			<Container 
			maxWidth="xs"
			style={{
			textAlign:"center",
			marginTop:"40px"}} >
			<Box 
			style={{
		    background:"white"}}
			boxShadow="2" 
			borderRadius="10px" 
			padding="20px">
			<img 
			alt="logo" 
			src={Logo} 
			height="60px" 
			width="60px" />
			<Typography 
			variant="h4" 
			color="secondary">
			Password Recovery
			</Typography>
			<br/>
			<br/>

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
	          {
	          	this.state.show_progress?
	          	<CircularProgress color="secondary" />
	          	:
	            null
	          }
	          <br/>
	          <br/>

	          <Button 
	          fullWidth
	          variant="contained" 
	          color="secondary"
	          onClick={this.formSubmitted}>
              send Link
              </Button>

			</Box>
			<br/><br/><br/>
			<br/><br/><br/>
			<br/><br/>
			</Container>
		)
	}
}

export default PasswordSent;