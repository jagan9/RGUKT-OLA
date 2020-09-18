import React from 'react';
import HeaderFragment from '../Fragments/HeaderFragment';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {
	Box,
	Snackbar,
  Backdrop,
  CircularProgress,
 } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import {FormatColorFill} from '@material-ui/icons';
 import {storageRef} from '../firebase';
 import firebase,{firestore} from '../firebase';

class UploadsPage extends React.Component {

	constructor(props) {
		super(props)
	
		this.state = {
			 images:[],
			 product_name:"",
			 price:"",
			 description:"",
			 snackbar:false,
			 cat:"books",
			 name_error:"",
			 price_error:"",
			 description_error:"",
       incr_error:"",
       maxbid_error:"",
			 loading:false,
			 id:"",
       incr:"",
       maxbid:"",
       allow_bid:false,
		}
	}

	onFieldChange = (e) =>{
		this.setState({
			[e.target.name]:e.target.value,
		})
	}

	  uploadImageURL=(item)=>{
		    try{
		return URL.createObjectURL(item)
		    }catch(error){
		return item
		    }
		  }

    removeImage=index=>{
    let images=this.state.images;

    

    let image=images[index];
    images.splice(index,1)
      try{

        if (image.startsWith("https")) {
          this.setState(
            {loading:true},
            this.deleteImage([image],0,()=>{
              this.setState({

                loading:false,
                images,
              });
            })
            );
        }

      }catch(error){

      this.setState({
                images, 
              });
      }
    this.setState({
      images
    })
  }

  uploadingImage=(images,index,urls,onCompleted)=>{

    const uploadAgain=(images,index,urls,onCompleted)=>this.uploadingImage(images,index,urls,onCompleted)

    let file=images[index];

      try{
      if (file.startsWith("https")) {
        urls.push(file);
          index++;
          if(index<images.length){
            uploadAgain(images,index,urls,onCompleted)
          }else{
            onCompleted();
          }
      }

          }catch(error){

          
          var ts = String(new Date().getTime()),
              i = 0,
              out = '';

          for (i = 0; i < ts.length; i += 2) {
              out += Number(ts.substr(i, 2)).toString(36);
          }

        let filename='product' + out;

      var uploadTask = storageRef.child('product/'+filename+'.jpg').put(file);
      uploadTask.on('state_changed', function(snapshot){
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        
      }, function(error) {
        // Handle unsuccessful uploads
      }, function() {
        
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL)=>{
          urls.push(downloadURL);
          index++;
          if(index<images.length){
            uploadAgain(images,index,urls,onCompleted)
          }else{
            onCompleted();
          }
        });
      });
      }
        }



    deleteImage=(images,index,onComplete)=>{
   
     const deleteAgain=(images,index,onComplete)=>
     this.deleteImage(images,index,onComplete)

     let splited_link=images[index].split("/");
     let name=splited_link[splited_link.length-1].split("?")[0].replace("product%2F","");
   
    storageRef.child('product/'+name).delete().then(()=>{

    index++;
    if(index<0){
      deleteAgain(images,index,onComplete);
    }else{
      onComplete();
    }
    }).catch((err)=>{
      console.log(err);
      this.setState({
        loading:false,
      })
    })
    
  }

  submit = () => {

  	let validData = true;

  	this.setState({
  		price_error:"",
  		name_error:"",
  		description_error:""
  	})
    this.state.incr_error="";
    this.state.maxbid_error="";

  	if (this.state.product_name === "") {
  		this.setState({
        name_error:"required!"
      })
  		validData=false;
  		
  	}

    if (this.state.allow_bid) {

      if (this.state.incr === "") {
      this.setState({
        incr_error:"required!"
      })
      validData=false;     
    }

    if (this.state.maxbid === "") {
      this.setState({
        maxbid_error:"required!"
      })
      validData=false;     
    }
  }

  	if (this.state.price === "") {
  		this.setState({
        price_error:"required!"
      })
  		validData=false
  	}

  	if (this.state.description === "") {
  		this.setState({
        description_error:"required!"
      })
  		validData=false
  	}

  	if (this.state.images.length < 2) {
  		 this.setState({
          snackbar:true,
        })
  		validData=false
        this.state.snackbar_error="minimun 2 images requeird!"
        return;
  	}

  	this.setState({
  		update:true
  	})

  	if (validData) {

  		let urls=[];
      let index=0;
      this.setState({
        loading:true,
      })

  	  this.uploadingImage(this.state.images,index,urls,()=>{
      
      let images = [];
      let owner_id = {};
      let data={
        approved:false,
        cat:this.state.cat,
        created_at: new Date(),
        updated_at: new Date(),
        description:this.state.description,
        name:this.state.product_name,
        price:this.state.price,
        id:"",
        views:[],
        fav:[],
        allow_bid:this.state.allow_bid,
        
      } 

      if (this.state.allow_bid) {
        data["max_bid"]=this.state.maxbid;
        data["incr"]=this.state.incr;
      }

      for(var i=0;i<urls.length;i++){
        images.push(urls[i])
      }  

      data["images"]=images;

      {this.props.data.map((item,index)=>{
      	owner_id=item;
      })}

      data["owner_id"]=owner_id;

      let sections = this.props.products;
      sections.push(data);

      firestore
      .collection("PRODUCTS")
      .add(data)
      .then((doc)=> {
        this.setState({
        	id:doc.id
        })
        let sections = this.props.products;
        sections.push(data);
        this.setState({
          loading:false,
        });
       
        firestore
        .collection("PRODUCTS")
        .doc(this.state.id)
        .update({"id":this.state.id})
        .then(()=>{
        	this.setState({
          loading:false,
        });
        	console.log("Document successfully written!");
        }).catch((error)=>{
          console.log(error)
        })       
          console.log("Document successfully written!");
      })
      .catch((error)=> {
        this.setState({
          loading:false,
        });
          console.error("Error writing document: ", error);
      });
    })
  }
}

  changeBid = (e) =>{
    this.setState({
      [e.target.name]:!this.state[e.target.name]
    })
  }


	render() {
		return (
			<div 
      style={{color:"white"}}>
				
				<Typography 
        variant="h4" 
        style={{textAlign:"center",
        margin:"40px 0px"}} > 
        Upload a product
        </Typography>
				<div 
        style={{display:"flex",
        flexWrap:"wrap",
        justifyContent:"center"}}>
				<div>
				<Typography 
        variant="h6" 
        style={{marginLeft:"17px"}}> 
        Name</Typography>
				<TextField
				 label="Name of the product" 
				 variant="filled" 
				 size="small"
	         error={this.state.name_error!==""}
	         helperText={this.state.name_error}
	         name="product_name"
	         onChange={this.onFieldChange}
				 style={{width:"300px",
         marginLeft:"17px",
         marginRight:"35px",
         background:"white",
         borderRadius:"4px"}}/>
				 <br/><br/>
				 </div>
				 <div>
				 <Typography 
         variant="h6" 
         style={{marginLeft:"17px",
         marginRight:"35px",}}> 
         Category
         </Typography>
				 <select 
         defaultValue={this.state.cat} 
         onChange={this.onFieldChange} 
         name="cat" 
         style={{fontSize:"16px",
         color:"#7c7c8e",
         background:"#e8e8e8",
         minWidth:"300px",
         height:"47px",
         marginRight:"35px",
         marginLeft:"17px",
         borderRadius:"4px"}}>
				 <option style={{height:"20px"}}>books</option>
				 <option style={{height:"20px"}}>stationary</option>
				 <option style={{height:"20px"}}>sports</option>
				 <option style={{height:"20px"}}>clothes</option>
				 <option style={{height:"20px"}}>bicycles</option>
				 <option style={{height:"20px"}}>electronics</option>
				 <option style={{height:"20px"}}>others</option>

				 </select>
				 </div>
				 </div>
				 <br/>
				 <Box 
         display="flex" 
         flexWrap="true" 
         style={{justifyContent:"center"}}>
		        {this.state.images.map((item,index)=>(
		          <Box margin="12px">
		          <img 
		          src={this.uploadImageURL(item)} 
		          style={{
		          height:"140px" ,
              width:"120px",
              objectFit:"scale-down"}}/>
		         <br/>
		           <IconButton
                aria-label="delete" 
                onClick={e=>this.removeImage(index)}>
		           <DeleteIcon 
               style={{color:"white",
               marginLeft:"35px"}} />		          
		          </IconButton>    
		          </Box>
		        ))}
		        </Box>

				 <input
			        accept="image/*"
			        hidden
			        id="contained-button-file"
			        onChange={(e)=>{
			          if(e.target.files && e.target.files[0]){
			          let images=this.state.images;
			          images.push(e.target.files[0]);
			          this.setState({
			            images:images,
			          })
			          e.target.value=null;
			        }
			        }}
			        type="file"
			      />

			     <div 
           style={{display:"flex",
           justifyContent:"center"}}>
			        <label htmlFor="contained-button-file">
			        <Button 
			        variant="contained" 
			        color="primary" 
			        component="span"
			        style={{background:"#007bff",
              color:"white"}}>
			          Add Image
			        </Button>
			      </label>
			      </div>
			      <br/>
      <div 
      style={{textAlign:"center"}} >
      <FormControlLabel
        control={
          <Checkbox 
           size="medium"
           checked={this.state.allow_bid} 
           onChange={this.changeBid} 
           style={{color:"white"}}
           name="allow_bid" />
         }
        label="Allow Bidding"
      />
      </div>     
      {this.state.allow_bid &&
        <div>
        <div 
        style={{display:"flex",
        flexWrap:"wrap",
        alignItems:"center",
        justifyContent:"center"}}>
        <div>
        <Typography 
        variant="h6" 
        style={{marginLeft:"22px"}}>
        Minimun increment in Bidding
        </Typography>
         <TextField
         label="Minimun increment in Bidding" 
         variant="filled" 
         size="small"
         error={this.state.incr_error!==""}
            helperText={this.state.incr_error}
            name="incr"
            onChange={this.onFieldChange}
         type="number"
         style={{width:"300px",
         marginLeft:"22px",
         marginRight:"35px",
         background:"white",
         borderRadius:"4px"}}/>
         </div>
         </div>

         <br/><br/>
         <div 
         style={{display:"flex",
         flexWrap:"wrap",
         alignItems:"center",
         justifyContent:"center"}}>
         <div>
         <Typography 
         variant="h6" 
         style={{marginLeft:"22px"}}>
         Maximum Price
         </Typography>
        <TextField
         label="Maximum Price"
         variant="filled" 
         size="small"
         error={this.state.maxbid_error!==""}
            helperText={this.state.maxbid_error}
            name="maxbid"
            onChange={this.onFieldChange}
         type="number"
         style={{width:"300px",
         marginLeft:"22px",
         marginRight:"35px",
         background:"white",
         borderRadius:"4px"}}/>
         <br/><br/>
         </div>
         </div>
        </div>}

				 <div 
         style={{display:"flex",
         flexWrap:"wrap",
         alignItems:"center",
         justifyContent:"center"}}>
				 <div>
				 <Typography 
         variant="h6" 
         style={{marginLeft:"22px"}}>
         {this.state.allow_bid?"Minimun Price":"Price"}
         </Typography>
				 <TextField
				 label={this.state.allow_bid?"Minimun Price":"Price"} 
				 variant="filled" 
				 size="small"
				 error={this.state.price_error!==""}
	             helperText={this.state.price_error}
	             name="price"
	             onChange={this.onFieldChange}
				 type="number"
				 style={{width:"300px",
         marginLeft:"22px",
         marginRight:"35px",
         background:"white",
         borderRadius:"4px"}}/>
				 <br/><br/>
				 </div>
				 </div>
				 <div 
          style={{display:"flex",
          flexWrap:"wrap",
          alignItems:"center",
          justifyContent:"center"}}>
				 <div>
				 <Typography 
         variant="h6" 
         style={{marginLeft:"22px"}}> 
         Description
         </Typography>
				 <TextField
				 label="Enter the Price" 
				 variant="filled" 
				 size="small"
				 type="number"
				 error={this.state.description_error!==""}
	         helperText={this.state.description_error}
	         name="description"
	         onChange={this.onFieldChange}
				 multiline
         rows={4}
				 style={{minWidth:"300px",
         marginLeft:"22px",
         marginRight:"35px",
         background:"white",
         borderRadius:"4px"}}/>
				
				 </div>
				 </div>
				 <br/>
				 <div 
         style={{display:"flex",
         justifyContent:"center"}} > 
				  <Button 
				  variant="contained" 
				  color="primary" 
				  component="span"
				  margin="dense"
				  style={{width:"300px",
          marginRight:"11px",
          background:"#007bff",
          color:"white"}}
				  onClick={()=>this.submit()} >
				  Submit
         </Button>
         </div>


				<Snackbar
		        anchorOrigin={{
		          vertical: 'bottom',
		          horizontal: 'left',
		        }}
		        open={this.state.snackbar}
		        autoHideDuration={1000}
		        onClose={e=>this.setState({
		          snackbar:false
		        })}
		        message={this.state.snackbar_error}
		    />


    	 <Backdrop 
       style={{zIndex:1300}} 
       open={this.state.loading}>
        <CircularProgress color="secondary" />
       </Backdrop>
    <br/>
    <br/><br/>
		</div>
		)
	}
}

export default UploadsPage;