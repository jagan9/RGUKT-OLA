import React from 'react';
import HeaderFragment from '../Fragments/HeaderFragment';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom'


class ProductsPage extends React.Component {

	constructor(props) {
		super(props)
	
		this.state = {
			 inpVal:"books"
		}
	}

	handleChange = (e) =>{
		this.setState({
			inpVal:e.target.value,
		})
	}
	
	render() {
		return (
			<div 
			style={{color:"white"}} > 
				
				<br/><br/><br/>
				<select 
				defaultValue={this.state.inpVal} 
				onChange={this.handleChange} 
				name="cat" 
				style={{fontSize:"16px",
				color:"#7c7c8e",
				background:"#e8e8e8",
				minWidth:"300px",
				height:"47px",
				marginRight:"35px",
				marginLeft:"17px",
				borderRadius:"4px"}}>
				 <option 
				 style={{height:"20px"}}>
				 books
				 </option>
				 <option 
				 style={{height:"20px"}}>
				 stationary
				 </option>
				 <option 
				 style={{height:"20px"}}>
				 sports
				 </option>
				 <option 
				 style={{height:"20px"}}>
				 clothes
				 </option>
				 <option 
				 style={{height:"20px"}}>
				 bicycles
				 </option>
				 <option 
				 style={{height:"20px"}}>
				 electronics
				 </option>
				 <option 
				 style={{height:"20px"}}>
				 others
				 </option>

				 </select>
				 <br/>
				 <br/>
				 <div 
				 style={{border:"1px solid grey",
				 margin:"0px 20px 0px 20px",
				 padding:"20px 1px",
				 borderRadius:"20px"}}>
				 <Typography 
				 variant="h6" 
				 style={{paddingLeft:"18px"}} > 
				 Available 
				 </Typography>
				
				<Paper 
				style={{marginLeft:"18px",
				border:"none",
				background:"black",
				color:"white"}} 
				variant="outlined" 
				square>
				Books
				<br/>
				Bicycles<br/>
				Stationary<br/>
				Electronic Gadgets<br/>
				Clothes<br/>
				Sports<br/>
				Others<br/>

				</Paper>
				</div>
				<br/>
				<br/>
				<div style={{margin:"0px 20px"}} >
				<Link 
				style={{textDecoration:"none"}} 
				to={"/"+`${this.state.inpVal.toLowerCase()}`}>
				<Button 
				variant="contained" 
				color="primary" 
				>
				 Search
				</Button>
				</Link>
				</div>
				<br/><br/><br/>
				<br/><br/>
			</div>
		)
	}
}

export default ProductsPage;