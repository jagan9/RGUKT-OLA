const initState = null;

const TodoReducer = (state = initState,action)=>{	
	switch (action.type){
		case "LOAD_PRODUCTS":
		state = action.payload;
		break;
		default:
		break;
	}
	return state;
}

export default TodoReducer;