import React from 'react';
import Home from '../UI-Pages/HomePage';
import ErrorPage404 from '../UI-Pages/ErrorPage';
import Login from '../UI-Pages/LoginPage';
import Signup from '../UI-Pages/SignupPage';
import PasswordSent from '../UI-Pages/passwordSent'
import Auth from '../components/auth';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Typography from '@material-ui/core/Typography';
import 
  {
    Backdrop,
    CircularProgress,
  } 
from '@material-ui/core';
import ProductsPage from '../UI-Pages/ProductsPage';
import SearchPage from '../UI-Pages/SearchPage';
import Products from '../Fragments/Products';
import HeaderFragment from '../Fragments/HeaderFragment';
import {LoadBids,LoadProducts,LoadUsers} from '../Redux_part/Actions/LoadProduct';
import {connect} from "react-redux";
import ProfilePage from '../UI-Pages/ProfilePage';
import firebase,{firestore,storageRef} from '../firebase';
import {FetchUser} from '../Redux_part/Actions/FetchUser';
import UploadsPage from '../UI-Pages/UploadsPage';
import UserDetailPage from '../UI-Pages/UserDetailPage';
import MyUploadsPage from '../UI-Pages/MyUploadsPage';
import ProductDetailsPage from '../UI-Pages/ProductDetailsPage';
import History from './History';
import Footer from '../Fragments/Footer';



class Main extends React.Component {

  constructor(props) {
    super(props)
  
    this.state = {
       loading:false,
       email:"",
       uid:""
    }
  }

  reload = () =>{
    this.props.FetchUser(this.state.uid,()=>{
        this.setState({loading:false})
      },
      ()=>{
        this.setState({loading:false})
      });
  }

  componentDidMount(){
    if (this.props.products === null) {
      this.setState({loading:true})
      this.props.LoadProducts(()=>{
        this.setState({loading:false})
      },
      ()=>{
        this.setState({loading:false})
      });
    }
    else{
      this.setState({
        loading:false
      })
    }
    if (this.props.users === null) {
      this.setState({loading:true})
      this.props.LoadUsers(()=>{
        this.setState({loading:false})
      },
      ()=>{
        this.setState({loading:false})
      });
    }
    else{
      this.setState({
        loading:false
      })
    }

    
if (this.props.userdata === null) {
    firebase.auth().onAuthStateChanged((user)=>{
      if (user) {
        this.setState({email:user.email})
        this.setState({uid:user.uid})
        
          this.setState({loading:true})
          this.props.FetchUser(user.uid,()=>{
        this.setState({loading:false})
      },
      ()=>{
        this.setState({loading:false})
      });
       
      }
      else{
        console.log("no user")
      }
    }) 
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

   
  deleteProduct = (images,id,index) => {
    this.setState({loading:true})
    
    this.deleteImage(images,0,()=>{

    firestore.collection("PRODUCTS")
    .doc(id).delete().then(()=>{
      this.setState({loading:true})
      this.props.LoadProducts(()=>{
        this.setState({loading:false})
      },
      ()=>{
        this.setState({loading:false})
      });
    }).catch((error)=>{
      console.log(error)
    })

  })
  }

  loadOnce = () => {
    this.props.LoadProducts(()=>{
        this.setState({loading:false})
      },
      ()=>{
        this.setState({loading:false})
      });
  }

  loadOnce1= (id) =>{
    this.props.LoadBids(id,()=>{
      },()=>{
        console.log("error occur")
      }); 
  }






  render(){

     const ProductWithId = ({match}) => {
      let id = (match.params.product_id)
      let fiter = this.props.products?this.props.products:[];
      let selectedProduct=fiter.filter((product) => (product.id)===(match.params.product_id))[0]
      let notFoundErr=null;
     
      if (this.props.bids===null) {
       this.props.LoadBids(id,()=>{
      },()=>{
        console.log("error occur")
      }); 
      }
      
      if(selectedProduct===undefined){
      notFoundErr=("\n\n Error 404 :  Product not found");
      } 
      return(
          <ProductDetailsPage
          loadOnce={(id)=>this.loadOnce1(id)}
          bids={this.props.bids?this.props.bids:null }
          data={this.props.userdata?this.props.userdata:null  }     
          product={selectedProduct}
          errMess={notFoundErr}
          />
          );
      };

      const UserWithId = ({match}) => {
        let fiter = this.props.users?this.props.users:[];
        let selectedUser=fiter.filter((user) => ((user.id)===(match.params.userId)))[0];
        let notFoundErr=null;
        if(selectedUser===undefined){
        notFoundErr=("\n\n Error 404 :  User not found");
        }  
        return(
          <Auth>
            <UserDetailPage user={selectedUser}
            /> 
            </Auth>
            );
        };

      const OwnerProduct = ({match}) => {
          let selectedUser;
          let notFoundErr=null;
          let fiter1 = this.props.products?this.props.products:[];
          let selectedProduct=fiter1.filter((product) => ((product.id)===(match.params.product_id)))[0];
          if(selectedProduct)
            selectedUser=selectedProduct.owner_id;
          else 
             notFoundErr=("\n\n Error 404 :  User not found");  
          if(selectedUser===undefined){
          notFoundErr=("\n\n Error 404 :  User not found");
          }  
          return(
              <UserDetailPage 
              user={selectedUser} 
              /> 
              );
          };

          const HistoryWithId =({match}) =>{
             let id = (match.params.product_id)

            if (this.props.bids===null) {
             this.props.LoadBids(id,()=>{
            },()=>{
              console.log("error occur")
            }); 
            }
          let fiter = this.props.products?this.props.products:[];
          let selectedProduct=fiter.filter((product)=>(product.id===(match.params.product_id)))[0];          
          return (<Auth><History
                      productId={match.params.product_id}
                      bids={this.props.bids}
                      auth={this.props.users}
                      product={selectedProduct}
                     />
                     </Auth>);
          };

          let favorites=[];
        if(this.props.products && this.props.userdata){ 
       let fiter = this.props.products?this.props.products:[];
       let selectedProduct=fiter.filter((product)=>product.fav.length > 0);
       for(let i = 0;i<selectedProduct.length;i++){
        for(let j = 0;j<selectedProduct[i].fav.length;j++){
          if (selectedProduct[i].fav[j] === this.props.userdata[0].id) {
            favorites.push(selectedProduct[i]);
            break;
          }
        }
       }
        }


  return (
    <div className="App">
   <HeaderFragment style={{paddingBottom:"0px",marginBottom:"0px"}} />
     
     <Switch location={this.props.location}>

      <Route path="/home">
      
      <Home
      Maintitle="Featured Products"
      user={this.state.uid}
      viewDetails={(id)=>this.viewDetails(id)} 
      user={this.state.uid}
      product={
        this.props.products? 
        this.props.products.filter((products)=>(products.approved)):[]}/>
      />
      </Route>

      <Route path="/forget_password">
      <PasswordSent/>
      </Route>

      <Route exact path="/Login">
      <Auth auth="auth">
      <Login />
      </Auth>
      </Route>

      <Route exact path="/signup">
      <Auth auth="auth">
      <Signup/>
      </Auth>
      </Route>

      <Route exact path="/products">
      <ProductsPage />
      </Route>

      <Route exact path="/products/:product_id" component={ProductWithId}/>
      <Route exact path="/products/:product_id/owner" component={OwnerProduct}/>
      
      <Route exact path='/bid_history/:product_id' component={HistoryWithId}
      />

      <Route path='/users/:userId' component={UserWithId}/>
      
      <Route exact path="/pending" >
      <Auth admin="true">
      <Products 
      nothing="There are no products in this list. "
      Maintitle="PendingProducts"
      user={this.state.uid}
      viewDetails={(id)=>this.viewDetails(id)} 
      product={
        this.props.products? 
        this.props.products.filter((products)=>( !products.approved)):[]}/>
      </Auth>
      </Route>
      

      <Route exact path="/search">
      <SearchPage 
      product={
        this.props.products? 
        this.props.products.filter((products)=>products.approved===true):null}
      />
      </Route>

      <Route exact path="/books">
      <Products 
      nothing="There are no products in this list. "
      Maintitle="Books"
      user={this.state.uid}
      viewDetails={(id)=>this.viewDetails(id)} 
      product={
        this.props.products? 
        this.props.products.filter((products)=>products.cat === "books"&& products.approved):null}
      />
      
      </Route>

      <Route exact path="/favorites">
      <Auth>
      <Products 
      loadOnce={()=>this.loadOnce()}
      Maintitle="Favorites"
      nothing="No Favorites yet. Come Soon"
      user={this.state.uid}
      del="true"
      viewDetails={(id)=>this.viewDetails(id)} 
      product={favorites  }
      />
      </Auth>
      </Route>


      <Route exact path="/bicycles">
      <Products 
      nothing="There are no products in this list. "
      Maintitle="Bicycles"
      user={this.state.uid}
      viewDetails={(id)=>this.viewDetails(id)} 
      product={
        this.props.products? 
        this.props.products.filter((products)=>products.cat === "bicycles"&& products.approved):null}
      />
      </Route>

      <Route exact path="/stationary">
      <Products 
      nothing="There are no products in this list. "
      Maintitle="Stationary" 
      user={this.state.uid}
      viewDetails={(id)=>this.viewDetails(id)} 
      product={
        this.props.products? 
        this.props.products.filter((products)=>products.cat === "stationary"&& products.approved):null}
      />
      </Route>

      <Route exact path="/electronics">
      <Products
      nothing="There are no products in this list. " 
      Maintitle="Electronic"
      user={this.state.uid}
      viewDetails={(id)=>this.viewDetails(id)} 
      product={
        this.props.products? 
        this.props.products.filter((products)=>products.cat === "electronics"&& products.approved):null}
      />
      </Route>

      <Route exact path="/clothes">
      <Products
      nothing="There are no products in this list. " 
      Maintitle="Clothes"
      user={this.state.uid}
      viewDetails={(id)=>this.viewDetails(id)} 
      product={
        this.props.products? 
        this.props.products.filter((products)=>products.cat === "clothes"&& products.approved):null}
      />
      </Route>

      <Route exact path="/sports">
      <Products 
      nothing="There are no products in this list. "
      Maintitle="Sports"
      user={this.state.uid}
      viewDetails={(id)=>this.viewDetails(id)} 
      product={
        this.props.products? 
        this.props.products.filter((products)=>products.cat === "sports"&& products.approved):null}
      />
      
      </Route>

      <Route exact path="/others">
      <Products 
      nothing="There are no products in this list. "
      Maintitle="Others"
      user={this.state.uid}
      viewDetails={(id)=>this.viewDetails(id)} 
      product={
        this.props.products? 
        this.props.products.filter((products)=>products.cat === "others"&& products.approved):null}
      />
      </Route>

      <Route exact path="/profile" >
      <Auth>
      <ProfilePage
      reload={()=>this.reload()}
      uid={this.state.uid}
      email={this.state.email}
      data={this.props.userdata?this.props.userdata:null}
      /> 
      </Auth>
      </Route>

      <Route exact path="/upload" >
      <Auth>
      <UploadsPage
      user={this.state.uid}
      data={this.props.userdata?this.props.userdata:null}
      products={
        this.props.products? 
        this.props.products:null}
        />
      </Auth>
      </Route>
      
      <Route exact path="/my_uploads" >
      <Auth>
      <MyUploadsPage
      loadOnce={()=>this.loadOnce()}
      nothing="There are no products in this list. "
      viewDetails={(id)=>this.viewDetails(id)} 
      delete={(images,id,index)=>this.deleteProduct(images,id,index)}
      user={this.state.uid}
      my_uploads="true"
      data={this.props.userdata?this.props.userdata:null}
      products={
        this.props.products? 
        this.props.products.filter((products)=>products.owner_id.email === this.state.email):[]}/>
      </Auth>
      </Route>


      <Redirect to="/home" />
      <Route path="*" 
      render={()=><ErrorPage404 />}
      />


      </Switch>
     
     <Backdrop style={{zIndex:1300}} open={this.state.loading}>
     <CircularProgress color="secondary" />
      </Backdrop>
      <Footer />
    </div>
  );
}
}



const mapStateToProps = (state) =>{
  return{
    products:state.products,
    userdata:state.userdate,
    users:state.users,
    bids:state.bids,
  }
}

const mapDispatchToProps = (dispatch) =>{
  return{
    LoadProducts:(onSuccess,onError)=>dispatch(LoadProducts(onSuccess,onError)),
    FetchUser:(name,onSuccess,onError)=>dispatch(FetchUser(name,onSuccess,onError)),
    LoadUsers:(onSuccess,onError)=>dispatch(LoadUsers(onSuccess,onError)),
    LoadBids:(name,onSuccess,onError)=>dispatch(LoadBids(name,onSuccess,onError)),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Main);
