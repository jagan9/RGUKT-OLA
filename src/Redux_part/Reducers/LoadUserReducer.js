const initState = null;

const LoadUser = (state = initState,action)=>{	
	switch (action.type){		
		case "LOAD_USERS":
		state = action.payload;
		break;
		default:
		break;
	}
	return state;
}

export default LoadUser;