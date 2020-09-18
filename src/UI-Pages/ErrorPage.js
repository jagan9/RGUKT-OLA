import React from 'react';
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';

export default function ErrorPage404() {
	return (
		<div 
		style={{background:"coral",
		height:"100vh"}}>
		 <img 
		 src="https://freepik.cdnpk.net/img/errors/404.svg" 
		 alt="404" 
		 style={{height:"130px",
		 width:"100%",
		 objectFit:"scale-down",
		 background:"coral"}}
		 />
		 <h1>
		 PAGE NOT FOUND 
		 </h1>
		 <Link to="/Home">
			<Button 
			variant="contained" 
			color="primary">
              Go back to Home Page
            </Button>
		 </Link>
		</div>
	)
}