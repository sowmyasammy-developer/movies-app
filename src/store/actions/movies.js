import axios from 'axios';

export const GET_MOVIES_PENDING = 'GET_MOVIES_PENDING';
export const GET_MOVIES_SUCCESS = 'GET_MOVIES_SUCCESS';
export const GET_MOVIES_ERROR = 'GET_MOVIES_ERROR';
export const ADD_TO_LIST = 'ADD_TO_LIST';
export const REMOVE_FROM_LIST = 'REMOVE_FROM_LIST';

const getMoviesPending = () => {
    return {
        type: GET_MOVIES_PENDING
    }
};

const getMoviesSuccess = (movies) => {
    return {
        type: GET_MOVIES_SUCCESS,
        movies: movies,
    }
};

const getMoviesError = (error) => {
    return {
        type: GET_MOVIES_ERROR,
        error: error
    }
}

const addToList = (myList) => {
    return {
        type: ADD_TO_LIST,
        myList: myList
    }
}

const removeList = (myList) => {
    return {
        type: REMOVE_FROM_LIST,
        myList: myList
    }
}

export const fetchMovies = (year) => dispatch => {
        dispatch(getMoviesPending());
        let path='http://www.omdbapi.com/?apikey=32395055&type=movie&s=bad';
        if(year && year!==''){
            path='http://www.omdbapi.com/?apikey=32395055&type=movie&s=bad&y='+year;
        }
        axios.get(path)
        .then(res => {
            if(!res.data.Response) {
                throw(res.data.Error);
            }
            dispatch(getMoviesSuccess(res.data.Search));
            return res.data.Search;
        })
        .catch(error => {
            dispatch(getMoviesError(error.message));
        })
    };

export const fetchMyList = (myList,watchFlag) =>  dispatch => {
       let addList=myList.map((item)=>({...item,watched:watchFlag}));
       dispatch(addToList(addList));
    };

export const removeFromList = (myList) => dispatch => {
    dispatch(removeList(myList));
}

