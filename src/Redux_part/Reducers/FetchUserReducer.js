const initState = null;

const FetchUser = (state = initState,action)=>{	
	switch (action.type){		
		case "FETCH_USER":
		state = action.payload;
		break;
		default:
		break;
	}
	return state;
}

export default FetchUser;