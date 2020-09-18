import React,{useState} from 'react';
import { firebaseAuth} from '../firebase';
import {Redirect} from 'react-router-dom';

 
function Auth(props) {
	const [logged , setlogged]=useState(null);
	const [admin, setadmin] = useState("")
	
	firebaseAuth.onAuthStateChanged((user) => {

    if (user) {
    	setadmin(user.email)
		setlogged(true); 
	 } else {
	    setlogged(false);
	}

	});

	if (props.admin === "true") {
		if (logged === null) {
			return "loading..."
		}
		else if(admin==="admin@g.com"){
			return props.children;
		}
		else{
			return <Redirect to="/home"/>
		}
	}
	else if(props.auth === "auth"){
		if (logged === null) {
			return "loading..."
		}
		else if(!logged){
		return props.children;
	    }
		else if(logged){
		return <Redirect to="/home"/>
	    }
	}
	else{

	if (logged===null) {
		return "loading....";
	}

	else if(logged){
		return props.children;
	}

	else if(!logged){
		return <Redirect to="/home"/>
	}

	}

}

export default Auth;