import React from 'react';
import HeaderFragment from '../Fragments/HeaderFragment';
import Typography from '@material-ui/core/Typography';
import Products from '../Fragments/Products';

class MyUploadsPage extends React.Component {
	render() {
		return (
			<div  style={{color:"white"}}>
						
				<Products
                loadOnce={()=>this.props.loadOnce()}
				Maintitle="My Uploads "
				nothing={this.props.nothing}
		        viewDetails={(id)=>this.props.viewDetails(id)}  
				delete={(images,id,index)=>this.props.delete(images,id,index)}
				product={this.props.products}
				my_uploads={this.props.my_uploads}
				user={this.props.user}/>
							 
			</div>
		)
	}
}

export default MyUploadsPage;