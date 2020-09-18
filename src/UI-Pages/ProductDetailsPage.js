import React from 'react';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import {Box} from '@material-ui/core';
import HeaderFragment from '../Fragments/HeaderFragment';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import RestoreIcon from '@material-ui/icons/Restore';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import Modal from '@material-ui/core/Modal';
import { FormGroup } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import MenuItem from '@material-ui/core/MenuItem';
import firebase,{firestore} from '../firebase';
import EditIcon from '@material-ui/icons/Edit';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';


const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

class ProductDetailsPage extends React.Component {

	constructor(props) {
		super(props)
	
		this.state = {
			 activeStep:0,
			 activeIndex: 0,
			 amount: 0,
			 isModalOpen: false,
       show_bids:true
		}
	}

componentDidMount(){
  if(this.props.product && this.props.data){
    let reqView=this.props.product.views;
    let view=reqView.some(View=>View===this.props.data[0].id);
    
    let data={};
    data["views"]=reqView;
    if(view)
    {
    }
    else{
      data["views"].push(this.props.data[0].id);
      firestore.collection("PRODUCTS").
      doc(this.props.product.id)
      .update(data)
      .then(()=>{
      }).catch((error)=>{
        console.log(error)
      })
     }
   }
}
	
	handleStepChange = (step) =>{
		this.setState({
			activeStep:step,
		})
	}

 toggleModal = () => {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
    this.setState({
    	amount:this.props.product.price
    })
  }

  approveProduct = () => {
    firestore
    .collection("PRODUCTS")
    .doc(this.props.product.id)
    .update({"approved":true})
    .then(()=>{
    }).catch((error)=>{
      console.log(error);
    })
  }

  

  saveBid = () => {
    
  	let data = this.props.data[0];
  	data["bid_amount"]=this.state.amount;
    data["created_at"]= new Date();
    data["product_id"] = this.props.product.id;
    let id = this.props.product.id

  	firestore
  	.collection("PRODUCTS")
  	.doc(this.props.product.id)
  	.collection("BIDS")
  	.doc(this.props.data[0].id)
  	.set(data)
  	.then(()=>{
      this.setState({
      isModalOpen: false
    });
      this.props.loadOnce(id);
      
  	}).catch((error)=>{
  		console.log(error);
  	})
  }


	render() {
    let reqbid = this.props.bids?this.props.bids:[];
		const { activeIndex } = this.state;
    let bidOptions = [];
    if (this.props.product && this.props.product.allow_bid) {
    	
      let times =
        (parseInt(this.props.product.max_bid) - parseInt(this.props.product.price)) /
        parseInt(this.props.product.incr);
      for (let i = 0; i <= times; i++) {
        bidOptions.push(
         {value: parseInt(this.props.product.price) + (i * parseInt(this.props.product.incr)),
          label: parseInt(this.props.product.price) + (i * parseInt(this.props.product.incr))}
        );
      }
    }

    let bidRate=[];
    for( let i = 0; i<reqbid.length ; i++){
     bidRate.push(parseInt(reqbid[i].bid_amount))
    }

    bidRate.sort(function(a, b){return b-a});

    let highestBid = bidRate[0];
    if (highestBid === undefined ) {
      highestBid = "no bids yet"
    }
   
		return (
			<div>
      
			  {
          this.props.product === undefined?
			  	<div 
          style={{marginTop:"50px", 
          textAlign:"center",
          color:"white"}}>
			  	<b 
          variant="h5" 
          color="white" > 
          Error 404 : Product not found
          </b>
			  	<br/><br/><br/><br/>
          <br/><br/><br/><br/>
          <br/><br/><br/><br/>
          <br/><br/><br/><br/>
          <br/><br/><br/><br/>
          <br/><br/><br/><br/>
          <br/>
          </div>
			  	:
			  	<div>
			    <div>
		        <AutoPlaySwipeableViews
		        axis={ 'x'}
		        index={this.state.activeStep}
		        onChangeIndex={this.handleStepChange}
		        enableMouseEvents
		       >
		        {this.props.product.images.map((step, index) => (

		          <div key={index} style={{margin:"15px",width:"95%"}}>
		          
		            {Math.abs(this.state.activeStep - index) <= 2 ? (
		              <img style={{width:"100%" ,height:"250px",objectFit:"scale-down"}} src={step}  alt="" />
		            ) : null}
		          </div>
		        ))}
		       </AutoPlaySwipeableViews>

		        </div>
		  <Container 
		  maxWidth="lg" 
		  style={{marginBottom:"40px"}} >
			 <Box 
			 bgcolor="white" 
			 boxShadow="2"  
			 p="24px" 
			 style={{marginBottom:"40px"}}
			 mt="20px" 
			 borderRadius="13px">
			 <b 
       style={{margin:"0px 0px 10px 0px",
       padding:"0px", 
       fontSize:"30px",
       color:"red"}}>
			 {this.props.product.name}
			 </b>
			 <br/>
			 <b 
       style={{color:"#28a745",
       fontSize:"25px"}} >
              {this.props.product.allow_bid ? (
                <React.Fragment>
                  Bidding range : <span>&#8377;</span> 
                  {this.props.product.price} -{' '}
                  {this.props.product.max_bid}
                </React.Fragment>
              ) : (
                <React.Fragment>
                 Product Price : {' '}
                 <span>&#8377;</span> 
                 {this.props.product.price}
                </React.Fragment>
              )}
            </b>
             <br/>
             <hr/>
             <br/>
            <b> Category: </b> {this.props.product.cat} 
            {this.props.product.allow_bid ? (
              <React.Fragment>
                <br />
                <br />
                <b>
                  Minimum Increment in bidding price :
                </b> <span>&#8377;</span> 
                {this.props.product.incr}
              </React.Fragment>
            ) : (
              <React.Fragment />
            )}
            <br/>
            <br/>
            <b> Owner : </b>{' '}
            <Link to={`${this.props.product.id}/owner`}>
              {this.props.product.owner_id.first_name + ' ' + this.props.product.owner_id.last_name}
            </Link>{' '}
            <br />
            <br />
            <b> Email of owner : </b> 
            {this.props.product.owner_id.email} <br />
            <br />
            <b>Descrption: </b>
            <br /> 
            {this.props.product.description} <br />
            <br />
            <b>Approved by admin: </b>
            <br /> 
            {this.props.product.approved ? 'Yes' : 'No'} 
            <br />
            <br />
            <b> 
            No. of Views: </b> <br />
            {this.props.product.views.length} 
            <br />
            <br />
            <b> 
            Highest Bid: </b> 
            <br /> 
            {highestBid} 
            <br />
            
            {this.props.data &&
            this.props.product &&
            this.props.product.approved &&
            !this.props.data[0].admin &&
            this.props.product.allow_bid &&
            this.props.product.owner_id.id !== this.props.data[0].id ? (
             reqbid.some(bid => bid.id === this.props.data[0].id)?(
              <React.Fragment>
                  <br />
                  <b> My bid: </b> <br />
                  &#8377;{' '}
                  {reqbid.filter(
                      bid =>
                        bid.id === this.props.data[0].id
                    )[0].bid_amount
                  }{' '}
                  <br />
                  <br />
                </React.Fragment>
             ):
            	(<div style={{textAlign:"center"}}>
                                <br />
                                <Button
                                  style={{background:"#ffc107"}}
                                  onClick={()=>this.toggleModal()}
                                >
                                  Bid <AttachMoneyIcon 
                                  style={{paddingLeft:"5px"}} />
                                </Button>
                                <br/>
                              </div>)
                ):(
              <React.Fragment />
            )
            }
            {this.props.data &&
            this.props.product.approved &&
            this.props.product.owner_id.id === this.props.data[0].id ? (
              <div style={{textAlign:"center"}} >
                <br />
                <a 
                style={{textDecoration:"none"}} 
                href={`/bid_history/${this.props.product.id}`}>
                  <Button style={{background:"#ffc107"}} >
                    View bid history <RestoreIcon 
                    style={{paddingLeft:"8px"}} />
                  </Button>
                </a>
              </div>
            ) : (
              <React.Fragment />
            )}

            {this.props.data &&
            !this.props.product.approved &&
            this.props.data[0].admin ? (
              <div style={{textAlign:"center"}} >
                <br />
                  <Button 
                  style={{background:"#25ee0f"}}
                  onClick={()=>this.approveProduct()}
                   >
                    Approve
                     <CheckCircleIcon 
                     style={{paddingLeft:"8px"}} />
                  </Button>
               
              </div>
            ) : 
            <React.Fragment/>}
       <br/>
			 <hr/>
			 <div 
       style={{display:"flex",
       justifyContent:"space-between"}}>
			 <div 
       style={{justifyContent:"flex-start"}}>
			 Created at :{' '}
       {new Intl.DateTimeFormat('en-US', {
                year: 'numeric',
                month: 'short',
                day: '2-digit',
                hour: 'numeric',
                minute: 'numeric',
                hour12: true
              }).format(new Date(Date.parse(this.props.product.created_at.toDate())))}
           
			 </div>
			 <div 
       style={{justifyContent:"flex-end"}}>
			 Updated at :{' '}
              {new Intl.DateTimeFormat('en-US', {
                year: 'numeric',
                month: 'short',
                day: '2-digit',
                hour: 'numeric',
                minute: 'numeric',
                hour12: true
              }).format(new Date(Date.parse(this.props.product.updated_at.toDate())))}
           
			 </div>
			 </div>
			 </Box>

			</Container>

			  </div>
			  }
			  
		      <div 
          style={{width:"350px",
          justifyContent:"center"}}>
		      <Dialog
              open={this.state.isModalOpen}
              onClose={()=>this.toggleModal()}
              style={{margin:"0px",padding:"0px"}}
              >
                <h1 
                style={{textAlign:"center",
                margin:"0px",
                background:"#00000010",
                padding:"10px 100px"}} >
                  Bid for a product
                </h1>
                <hr/>
                  <form  style={{padding:"0px 20px"}}>
                  <label>Username of bidder</label>
                  <br/>
                   <TextField 
                   disabled 
                   id="standard-disabled" 
                   variant="outlined"
                   size="small"
                   fullWidth
                   defaultValue=
                   {this.props.data?
                    this.props.data[0].user_name:
                    ""} />
                   <br/>
                   <br/>
                   <label>
                   Username of bidder
                   </label>
                   <br/>
                   <TextField 
                   disabled 
                   id="standard-disabled"
                   variant="outlined"
                   size="small"
                   fullWidth
                   defaultValue=
                   {this.props.product?
                    this.props.product.name
                    :
                    ""} />
                   <br/>
                   <br/>
                   <label> 
                   Amount you want to bid (in ₹) :
                   </label>
                   <br/>

                   <TextField 
                   select
                   id="standard-disabled"
                   variant="outlined"
                   size="small"
                   fullWidth
                   value={this.state.amount}
                   onChange={e => {
                       this.setState({ amount: e.target.value });
                   }} >
                   {bidOptions.map((option) => (
                    <option s
                    tyle={{cursor:"pointer"}} 
                    key={option.value} 
                    value={option.value}>
                      {option.label}
                    </option>
                  ))}
                   </TextField>
                   <br/>
                   <br/>
                   <Button 
                   onClick={()=>this.saveBid()} 
                   style={{background:"#ffc107"}} 
                   variant="contained">
                   Bid
                   </Button>
                   <br/>
                   <br/>
             </form>
          </Dialog>
        </div>
			</div>
		)
	}
}

export default ProductDetailsPage;

