import firebase,{firestore} from '../../firebase';
  
export const LoadProducts = (onSuccess,onError) =>{
	return(dispatch,getState)=>{
		firestore
		.collection("PRODUCTS").orderBy("created_at")
		.get()
		.then((querySnapshot)=>{
		 	let categories=[];
			if (!querySnapshot.empty) {
				querySnapshot.forEach((doc)=>{
					categories.push(doc.data());
				});
		    categories.sort((a,b)=>a.created_at-b.created_at);
		 	dispatch({type:"LOAD_PRODUCTS", payload:categories})
		 	onSuccess()
		 }
		 })
		 .catch((error)=>{
		 	console.log(error);
		 	onError()
		 })
	};
};


export const LoadUsers = (onSuccess,onError) =>{
	return(dispatch,getState)=>{
		firestore
		.collection("USERS")
		.get()
		.then((querySnapshot)=>{
		 	let categories=[];
			if (!querySnapshot.empty) {
				querySnapshot.forEach((doc)=>{
					categories.push(doc.data());
				});
		    categories.sort((a,b)=>a.created_at-b.created_at);
		 	dispatch({type:"LOAD_USERS", payload:categories})
		 	onSuccess()
		 }
		 })
		 .catch((error)=>{
		 	console.log(error);
		 	onError()
		 })
	};
};


export const LoadBids = (name,onSuccess,onError) =>{
	return(dispatch,getState)=>{
		firestore
		.collection("PRODUCTS")
		.doc(name)
		.collection("BIDS")
		.get()
		.then((querySnapshot)=>{
		 	let categories=[];
			if (!querySnapshot.empty) {
				querySnapshot.forEach((doc)=>{
					categories.push(doc.data());
				});
		    categories.sort((a,b)=>a.created_at-b.created_at);
		 	dispatch({type:"LOAD_BIDS", payload:categories})
		 	onSuccess()
		 }
		 })
		 .catch((error)=>{
		 	onError()
		 })
	};
};