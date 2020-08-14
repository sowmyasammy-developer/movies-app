import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../styles.css';

import * as moviesActions from '../../store/actions/movies';
import MovieTile from '../../components/MovieTile/MovieTile';

const MyList = props => {
     const listMovies = useSelector(state => state.movies.myList);
     const [list, setList] = useState(listMovies.filter((item)=>{return item.watched}));
     const [watchScreen, setWatchScreen] = useState(false);
     const [myList, setMyList] = useState([]);

     const dispatch = useDispatch();
    useEffect(()=>{
        if(watchScreen){
            setList(listMovies.filter((item)=>{return item.watched}));
        }
        else {
            setList(listMovies.filter((item)=>{return !item.watched}));
        }
        setMyList([]);
    },[watchScreen,listMovies])

    const handleToggle = () => {
        setWatchScreen(!watchScreen);
    }

    const handleList = (checked,movie) => {
        if(checked){
            setMyList([...myList,movie]);
        }
        else{
            let newList = myList.filter((item)=>{return item.imdbID!==movie.imdbID});
            setMyList(newList);
        }
    }

    return (
        <div className='main'>
        <div className='container'>
        <div>
        <button className='button' type='button' onClick={handleToggle}>{watchScreen?'Go To My List':'Go To My Watched List'}</button>
        </div>
        <div>
        { list.length>0 ?
            <div className='issueContainer'>
                    {
                        list.map((movie,index)=><MovieTile key={index} movie={movie} handleList={handleList}/>) 
                    }
            </div> :
            <div className='noIssueContainer'>
                <h1>No Movies in this List!!</h1>
            </div>
        }
        </div>  
        <div> 
        <button 
        className='button'
        type='button'
        onClick={()=>{
            if(watchScreen){
                dispatch(moviesActions.fetchMyList(myList,false))
                }
            else{
                dispatch(moviesActions.removeFromList(myList))
            }
        }}>
        {watchScreen?'Remove from My Watched List':'Remove from My List'}
        </button>
        {!watchScreen && <button className='button' type='button' onClick={()=>{dispatch(moviesActions.fetchMyList(myList,true))}}>Add to My Watched List</button>}
        </div>
        </div>
        </div>
    );
};

export default MyList;