import firebase,{firestore} from '../../firebase';

export const FetchUser = (name,onSuccess,onError) =>{
	return(dispatch,getState)=>{
		firestore
		.collection("USERS")
		.get()
		.then((querySnapshot)=>{
		 	let categories=[];
			if (!querySnapshot.empty) {
				querySnapshot.forEach((doc)=>{
					if (doc.id === name) {
					categories.push(doc.data());
				}
				});
		 	dispatch({type:"FETCH_USER", payload:categories})
		 	onSuccess()
		 }
		 })
		 .catch((error)=>{
		 	console.log(error);
		 	onError()
		 })
	};
};