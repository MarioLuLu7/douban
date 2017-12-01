
var initialState = {
    list:[],
    date:new Date(),
    film:[],
	play:[],
	last:"",
	book:[],
	team:[],
	filmdetail:[],
	bookdetail:[],
	playdetail:[],
	searchvalue:"",
	search:[],
	collect:[],
	more:[]
}

function reducer(state=initialState,action){
    switch(action.type){
        case "homelist":
			return Object.assign({},state,{list:[...state.list,...action.payload]});
		case "date":
			return Object.assign({},state,{date: action.payload });
		case "FILM":
			return Object.assign({},state,{film: action.payload });
		case "PLAY":
			return Object.assign({},state,{play:[...state.play,...action.payload]});
		case "LAST":
			return Object.assign({},state,{last: action.payload });
		case "BOOK":
			return Object.assign({},state,{book:[...state.book,...action.payload]});
		case "TEAM":
			return Object.assign({},state,{team: action.payload });
		case "FILM_DETAIL":
			return Object.assign({},state,{filmdetail: action.payload });
		case "BOOK_DETAIL":
			return Object.assign({},state,{bookdetail: action.payload });
		case "PLAY_DETAIL":
			return Object.assign({},state,{playdetail: action.payload });
		case "SET_SEARCH_VALUE":
			return Object.assign({},state,{searchvalue: action.payload });
		case "SEARCH":
			return Object.assign({},state,{search: action.payload });
		case "COLLECT":
			return Object.assign({},state,{collect:[...state.collect,action.payload]});
		case "MORE":
		return Object.assign({},state,{more: action.payload });
    default:
        return state;
    }
}

export default reducer;
