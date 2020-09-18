import React from 'react';
import {Box, Container, Typography} from '@material-ui/core';
import HeaderFragment from '../Fragments/HeaderFragment';


class UserDetailPage extends React.Component {
	render() {

		return (
			<div className="home" >
      {
        this.props.user === undefined ? 
        <div 
        style={{marginTop:"50px", 
        textAlign:"center",
        color:"white"}}>
          <b 
          variant="h5" 
          color="white" > 
          Error 404 : Product Owner not found
          </b>
        </div>
          :
      <Container 
      maxWidth="xs" 
      style={{paddingTop:"50px",
      marginBottom:"50px",
      textAlign:"center"}} >
       <Box 
       bgcolor="white" 
       boxShadow="2" 
       textAlign="center" 
       p="4px" 
       borderRadius="8px">
       <h1>User Details</h1>
       <hr/>
          <h3>
            {' '}
            First Name : {'          ' + this.props.user.first_name}
            </h3>
            <h3>
            {' '}
            Last Name : {'          ' + this.props.user.last_name}
            </h3>
            <h3> Email : {'          ' + this.props.user.email}</h3>
            <h3> Username : {'          ' + this.props.user.user_name}</h3>
            {this.props.user.show_room ? (
            <h3>
            {' '}
            Address :{' '}
            {'Room No.          ' +
            this.props.user.block +
            '-' +
            this.props.user.room +
            ', ' +
            this.props.user.hostel}
            </h3>
             ) 
             : 
             (
             <React.Fragment />
              )
            }

            {this.props.user.show_phone ? 
              (
              <h3> Contact No. : {'  +91-' + this.props.user.phone}</h3>
              ) : 
              (
              <React.Fragment />
              )
            }

            {this.props.user.show_facebook ? 
              (
                <h3>
                {' '}
                Facebook Profile Link :{' '}
                <a
                  href={
                    'https://www.facebook.com/' +
                    this.props.user.facebook
                    }
                >
                <span 
                className='fa fa-facebook'>
                link
                </span>
                </a>
                </h3>
                ) 
                : 
                (
                <React.Fragment />
                )
              }  
         </Box>
      </Container>      
    }    
</div>
		)
	}
}

export default UserDetailPage;