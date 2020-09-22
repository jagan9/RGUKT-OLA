import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import pic1 from '../media/Wallpaper_1.jpg';
import pic2 from '../media/Wallpaper_2.jpg';
import pic3 from '../media/Wallpaper_3.jpg';
import { autoPlay } from 'react-swipeable-views-utils';
import Typography from '@material-ui/core/Typography';
import ProductView from '../Fragments/ProductView';
import Products from '../Fragments/Products';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

class Home extends React.Component {

	constructor(props) {
		super(props)
	
		this.state = {
			 activeStep:0,
			 Sliderimages:[
			 {
			 	banner:pic1,
			 	color:"white"
			 },
			 {
			 	banner:pic2,
			 	color:"white"
			 },
			 {
			 	banner:pic3,
			 	color:"white"
			 }
			 ],
					 
		}
	}

	handleStepChange = (step) =>{
		this.setState({
			activeStep:step,
		})
	}


  render() {
    const featured = this.props.product.slice(0, 3);
     const featuredCards = featured.map((product,index) => {
      return(
        <div 
        key={index}
       style={{display:"flex",
       flexWrap:"wrap",
       justifyContent:"center"}}>
       <Products
       viewDetails={(id)=>this.props.viewDetails(id)} 
       home="true"
       user={this.props.user}
       product={[product]}/>
       </div>
        )
     })
    return (
      <div>      
        <div>
        <AutoPlaySwipeableViews
        axis={ 'x'}
        index={this.state.activeStep}
        onChangeIndex={this.handleStepChange}
        enableMouseEvents
       >
        {this.state.Sliderimages.map((step, index) => (

          <div 
          key={index} 
          style={{margin:"15px",
          width:"95%",
          background:step.color}}>         
            {Math.abs(this.state.activeStep - index) <= 2 ? (
              <img 
              style={{width:"100%" ,
              height:"250px",
              objectFit:"scale-down"}} 
              src={step.banner}  
              alt="" />
            ) 
            : 
            null
          } 
          </div>
        ))}
       </AutoPlaySwipeableViews>

        </div>

      <Typography 
      variant="h6" 
      style={{color:"white", 
      padding:"30px"}} >
       The first website to sell your old as well as new 
       items with bidding allowed, in IIIT (BASAR). You will 
       find various categories of products here : 
       Stationary, Electronic Gadgets, Bicycles, Books, 
       Clothes, Sports, etc. You will see a list of featured
       products below, based upon the no. of views
       <br/>
       <br/>
       So, what are you waiting for, just Register and 
       login to get into the store. Upload your old stuff, 
       kept in your rooms, it may help someone in need. Earn
       huge profits by allowing auction on your items. 
       Don't miss this opportunity. Just go for it.
       </Typography>
       <br/>
       <br/>
       <br/>
       <h1 
       style={{color:"white", 
       textAlign:"center"}} >
       Featured Products
       </h1>
       <div style={{display: 'flex',flexWrap:"wrap",justifyContent:  'center' }}>
       {featuredCards}
       </div>
      </div>
    )
  }
}

export default Home;


