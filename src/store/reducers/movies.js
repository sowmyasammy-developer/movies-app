import { GET_MOVIES_SUCCESS, GET_MOVIES_PENDING,
         GET_MOVIES_ERROR, ADD_TO_LIST, REMOVE_FROM_LIST } from '../actions/movies';

const initialState = {
    pending: false,
    movies: [],
    myList: [],
    error: null
}

export default (state = initialState, action) => {
    switch(action.type) {
        case GET_MOVIES_PENDING: 
            return {
                ...state,
                pending: true
            }
        case GET_MOVIES_SUCCESS:
            return {
                ...state,
                pending: false,
                movies: action.movies,
                error: null
            }
        case GET_MOVIES_ERROR:
            return {
                ...state,
                pending: false,
                error: action.error,
                movies: []
            }
        case ADD_TO_LIST:
            let oldList=state.myList;
            let newList=action.myList;
            //filtering only new items to add to my list..
            let updatedList = newList.filter((item) => {
                let id = oldList.findIndex((obj)=>{return obj.imdbID===item.imdbID});
                    return id===-1;
            })
            //updating existing list items if watched state changes
            let updatedOldList = oldList.map((item) => {
                let id = newList.findIndex((obj)=>{return obj.imdbID===item.imdbID});
                    if(id!==-1){
                        return newList[id];
                    }
                    else{
                        return item;
                    }
            })
            return {
                ...state,
                myList: [...updatedOldList,...updatedList]
            }
        case REMOVE_FROM_LIST:
            //filter existing list to remove items from list
            let newUpdatedList = state.myList.filter((item) => {
                let id = action.myList.findIndex((obj)=>{return obj.imdbID===item.imdbID});
                return id===-1;
            })
            return {
                ...state,
                myList: [...newUpdatedList]
            }
        default: 
            return state;
    }
}