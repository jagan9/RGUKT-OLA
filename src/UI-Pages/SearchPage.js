import React from 'react';
import HeaderFragment from '../Fragments/HeaderFragment';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import {Box} from '@material-ui/core';
import Chip from '@material-ui/core/Chip';
import { Link } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';


class SearchPage extends React.Component {

	constructor(props) {
		super(props)
	
		this.state = {
			 inpVal:'',
			 cat: [
		        "stationary",
		        "electronics",
		        "bicycles",
		        "clothes",
		        "sports",
		        "others",
		        "books"
		      ]
		}
		 this.onCheckChange = this.onCheckChange.bind(this);
	}

	handleChange = (e) =>{
		this.setState({
		  [e.target.name]:e.target.value
		})
	}

	onCheckChange(e){

		let options = this.state.cat;
		let pos = -1;

		if (e.target.checked) {
			options.push(e.target.value)
		}
		else{
			let i = 0;
			for (; i < options.length; i++) {
				if (options[i] === e.target.value) {
					pos = i;
					break;
				}
				else{

				}
				
			}
			options.splice(pos,1);
		}
			this.setState({cat : options})
	}
	



	render() {

	  var nameRegex = new RegExp(this.state.inpVal, "i");
	  let list1 = this.props.product? this.props.product:[];
	  const list =list1.map((product,index) => {
      let category_matched = this.state.cat.some(
        category => category === product.cat
      );
      if (
        product.name.search(nameRegex) !== -1 &&
        category_matched
      )
      	return(
      		<div key={index}>
              <div
              style={{marginBottom:"8px",
              display:"flex",
              alignItems:"center"}}>
              <Link to={"/products/"+product.id}  >
              	<b 
              	style={{fontSize:"18px",
              	color:"#0a81ff",
              	marginRight:"7px"}}>
              	{product.name}
              	</b>
              	</Link>
              	<Chip
			      size="small"
			      label={product.cat}
			      style={{
			        background:product.cat==="books"?"#120df4":
			        product.cat==="sports"?colors[1]:
			        product.cat==="others"?colors[2]:
			        product.cat==="electronics"?colors[4]:
			        product.cat==="clothes"?colors[3]:
			        product.cat==="stationary"?colors[4]:
			        product.cat==="bicycles"?colors[1]:
			        colors[2],
			        color:"white",padding:"0px",margin:"0px"

			        }}/>
              		</div>
              		<b 
              		style={{color:"#28a745",
              		marginTop:"10px"}} >
              		{
              		 product.allow_bid ? 
              		 <>
              		 Bidding Range :  ₹ {product.price} - {product.max_bid}
              		 </>
              		 : 
              		 <>
              		 Price : ₹ {product.price}
              		 </>
              		}
              		</b>
              		<br/>
              		<br/>
              		<Typography 
              		variant="body1" 
              		style={{color:"black"}}> 
              		Owner :  {" "}
              		<Link to={`/products/${product.id}/owner`} 
              		style={{color:"#2e93ff"}} >
              		{product.owner_id.user_name || product.owner_id.username }
              		</Link>
              		</Typography>
              		<br/>              		
              		<hr/>
              		</div>
      		);
      		else return <React.Fragment key={index} />;
  });


		return (
			<div 
			style={{background:"black",
			color:"white"}} >
			
				<div 
				style={{paddingTop:"30px",
				color:"white",
				textAlign:"center"}}>
				<Typography 
				variant="h4">
				Search your product here :
				</Typography>
				</div>
				<br/>
				<Typography 
				variant="h5" 
				style={{marginLeft:"17px"}} >
				Name of Product : 
				</Typography>
				<TextField
				 label="Name of the product" 
				 variant="filled" 
				 size="small"
				 margin="normal"
				 onChange={this.handleChange}
				 name="inpVal"
				 style={{marginLeft:"17px",
				 background:"white",
				 borderRadius:"4px"}}/>
				 <br/><br/>
				 <Typography 
				 variant="h6" 
				 style={{marginLeft:"17px"}}>
				 Caterory : 
				 </Typography>
				 
		        <FormControlLabel
		          value="Bicycles"
		          control={
		          	<Checkbox 
		              defaultChecked
		              color="primary" 
		              style={{color:"#0075ff"}} 
		          	  onChange={this.onCheckChange}
		              name="bicycles"
                      id="Bicycles"
                      value="bicycles"
		              />}
		          label="Bicycles"
		          labelPlacement="end"
		          style={{marginLeft:"18px"}}
		        />
		        <FormControlLabel
		          value="Stationary"
		          control={
		          	<Checkbox 
		              defaultChecked
		              color="primary" 
		              style={{color:"#0075ff"}}
		          	  onChange={this.onCheckChange}
		              name="stationary"
		              id="Stationary"
                      value="stationary"
		              />}
		          label="Stationary"
		          labelPlacement="end"
		          style={{marginLeft:"18px"}}
		        />
		        <FormControlLabel
		          value="Clothes"
		          control={
		          	<Checkbox 
		              defaultChecked
		              color="primary"  
		              style={{color:"#0075ff"}} 
		          	  onChange={this.onCheckChange}
		              name="clothes"
		              id="clothes"
		              value="clothes"
		              />}
		          label="Clothes"
		          labelPlacement="end"
		          style={{marginLeft:"18px"}}
		        />
		        <FormControlLabel
		          value="Electronic Gadgets"
		          control={
		          	<Checkbox 
		              defaultChecked
		              color="primary"  
		              style={{color:"#0075ff"}} 
		          	  onChange={this.onCheckChange}
		              name="electronics"
		               id="Electronic Gadgets"
		               value="electronics"
		              />}
		          label="Electronic Gadgets"
		          labelPlacement="end"
		          style={{marginLeft:"24px"}}
		        />
		        <FormControlLabel
		          value="Sports"
		          control={
		          	<Checkbox 
		              defaultChecked
		              color="primary"  
		              style={{color:"#0075ff"}}
		          	  onChange={this.onCheckChange}
		              name="sports" 
		              id="sports"
		              value="sports"
		              />}
		          label="Sports"
		          labelPlacement="end"
		          style={{marginLeft:"18px"}}
		        />
		        
		        <FormControlLabel
		          value="Books"
		          control={
		          	<Checkbox 
		              defaultChecked 
		          	  onChange={this.onCheckChange}
		              name="books"
		              color="primary"  
		              style={{color:"#0075ff"}}
		              id="Books"
                      value="books"
		              />}
		          label="Books"
		          labelPlacement="end"
		          style={{marginLeft:"32px"}}
		        />
		        <FormControlLabel
		          value="others"
		          control={
		          	<Checkbox 
		              defaultChecked
		              color="primary"  
		          	  onChange={this.onCheckChange}
		              name="others" 
		              style={{color:"#0075ff"}}
		              id="others"
		              value="others"
		              />}
		          label="others"
		          labelPlacement="end"
		          style={{marginLeft:"18px"}}
		        />

		    <Container 
		    maxWidth="md" 
		    style={{marginTop:"30px"}} >
			 <Box 
			 bgcolor="white" 
			 boxShadow="2" 
			 style={{padding:"0px 16px"}}
			 borderRadius="13px">
             <br/><br/>
         })
       }
	          <div>
	          {list}
	          </div>
 
			 </Box>
			</Container>
			<br/><br/><br/>
			<br/><br/>
			</div>
		)
	}
}

let colors = ["lightblue","red","coral","green","tomato"]
let products;

export default SearchPage;