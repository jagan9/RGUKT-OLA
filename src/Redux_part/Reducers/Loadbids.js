const initState = null;

const LoadBid = (state = initState,action)=>{	
	switch (action.type){		
		case "LOAD_BIDS":
		state = action.payload;
		break;
		default:
		break;
	}
	return state;
}

export default LoadBid;