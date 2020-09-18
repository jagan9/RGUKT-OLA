import React, {Component} from 'react';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import {Box} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import {firebaseAuth} from '../firebase';
import Snackbar from '@material-ui/core/Snackbar';
import {Link} from 'react-router-dom';
import Logo from '../media/favicon.ico';

class Login extends Component {

	constructor(props) {
		super(props)
	
		this.state = {
			 show_progress:false,
			 snakbar:false,
			 email:"",
			 password:"",
		}
	}

	handleChange = (e) =>{		
		this.setState({
			[e.target.name]:e.target.value,
		})
	}

	handleClose = () => {
     this.setState({ 
     	snakbar:false
     });
    };


	formSubmitted=()=>{
		let validData=true;

		this.state.email_error=null;
		this.state.password_error=null;

		if (this.state.email === "") {
			this.state.email_error="Requried";
			validData=false;			
		}

		if (this.state.password === "") {
			this.state.password_error="Requried";
			validData=false;			
		}

		this.setState({
			update:true,
		})

		if (validData) {
			this.setState({
				show_progress:true
			})
		}

		if (validData) {
			firebaseAuth
			 .signInWithEmailAndPassword(this.state.email, this.state.password)
			 .then((res)=>{
			 this.setState({
			 	show_progress:false
			 });

			 }).catch((err)=>{
			 	console.log(err);
			 	this.setState({
			 	show_progress:false
			 })
			 	if (err.code==="auth/user-not-found") {
			 		this.setState({
			 			snakbar:true,
			 			snackbar_error:"user Not Found !",
			 		})
			 	}
			 	if (err.code==="auth/wrong-password") {
			 		this.setState({
			 			password_error:"Invalid Password!",
			 		})
			 	}
			 	if (err.code==="auth/invalid-email") {
			 		this.setState({
			 			email_error:"Invalid email!",
			 		})
			 	}

			 })
		}

	}


	render() {
		return (
		    <Container 
		    maxWidth="xs" 
		    style={{marginTop:"100px",
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
             LOGIN 
             </Typography>
             <br/><br/>
			  <TextField
	          label="Email"
	          fullWidth
	          error={this.state.email_error!=null}
	          helperText={this.state.email_error}
	          type="email"
	          onChange={this.handleChange}
	          name="email"
	          placeholder="email"
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
	          placeholder="password"
	          variant="outlined"
	          size="small"
	          />
	          <br/><br/>
	          <Link to="/forget_password">
                forgot Password 
              </Link>
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
              Login
              </Button>
              <br/><br/>
              <Typography>
              Do not have an account ?  
              <Link to="/signup" >
               create account
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
			 <br/><br/><br/>
			</Container>
		)
	}
}

export default Login;