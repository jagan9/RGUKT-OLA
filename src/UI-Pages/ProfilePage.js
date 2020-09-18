import React from 'react';
import Typography from '@material-ui/core/Typography';
import HeaderFragment from '../Fragments/HeaderFragment';
import ProfileFragment from '../Fragments/ProfileFragment';

class ProfilePage extends React.Component {
      
	render() {
		return (
			<div style={{color:"white"}} >
			
		    {
		    	this.props.data?
		       	this.props.data.map((data)=>(
		       		<ProfileFragment 
		       		reload={()=>this.props.reload()} 
		       		data={data} 
		       		uid={this.props.uid}
		       		email={this.props.email}/>

		       	))		       	
		       	:false
		     }
			</div>
		)
	}
}

export default ProfilePage;