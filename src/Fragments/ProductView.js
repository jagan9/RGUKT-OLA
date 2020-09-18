import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import VisibilityIcon from '@material-ui/icons/Visibility';


class ProductView extends React.Component {

	render() {
		return (
			  <>
				<Box 
				boxShadow={2}
				width="340px"
				style={{
					background:"white",
					borderRadius:"20px",
					margin:"20px",
				}} > 

				<div 
				style={{width:"100%",
				textAlign:"center"}}>

				<img 
				style={{height:"180px",
				margin:"10px 0px",
				width:"260px",
				objectFit:"scale-down"}} 
				src={this.props.details.images[0]} 
				alt="img" />
				</div>

				<Typography 
				variant="h5" 
				style={{paddingLeft:"17px",
				color:"red"}} >
				{this.props.details.name} 
				</Typography>

				<Typography 
				variant="h6" 
				style={{paddingLeft:"17px",
				color:"#28a745",
				fontWeight:"bold"}}>
				Price : {this.props.details.price} 
				</Typography>

				<Typography 
				variant="subtitle1" 
				style={{padding:"0px 17px",
				height:"91px",
				overflow:"hidden"}} >
				{this.props.details.description}
				</Typography>

				<div 
				style={{width:"100%",
				textAlign:"center"}}>
				<Button 
				variant="outlined" 
				color="white" 
				style={{color:"white",
				background:"#138496"}}>
				<VisibilityIcon />
				View Details
				</Button>
				</div>
				<br/>
				</Box>
				
			</>
			
		)
	}
}

export default ProductView;