import React from 'react';
import HeaderFragment from './HeaderFragment';
import Typography from '@material-ui/core/Typography';
import CatFragment from './CatFragment';

class Products extends React.Component {
	render() {
		return (
			<div 
			style={{marginTop:"-22px",
			color:"white"}} >
			   <h1 
			   style={{textAlign:"center",
			   paddingTop:"20px"}}> 
			   {this.props.Maintitle} 
			   </h1>				
		       <div 
		       style={{display:"flex",
		       justifyContent:"center",
		       flexWrap:"wrap" }}>
		       {
		       	this.props.product.length >0?
		       	this.props.product.map((product,index)=>(
		       		<CatFragment
                    loadOnce={()=>this.props.loadOnce()}
				    delete={(images,od,index)=>this.props.delete(images,od,index)}
		       		keyed={index} 
		       		key={index}
		       		product={product}
		       		del={this.props.del}
		       		viewDetails={(id)=>this.props.viewDetails(id)} 
		       		user={this.props.user}
		       		my_uploads={this.props.my_uploads}/>
		       	))
		       	:
		       	<>
		       	<br/><br/><br/><br/>
		       	<br/><br/><br/><br/>
		       	<br/><br/><br/><br/>
		       	<br/><br/><br/><br/>
		       	<br/><br/><br/><br/>
		       	<br/><br/><br/><br/>
		       	<h3 
		       	style={{textAlign:"center",
		       	marginTop:"50px"}} >
		       	{this.props.nothing}
		       	</h3>
		       	</>
		       }
		       
		       </div>
			</div>
			
		)
	}
}

export default Products;