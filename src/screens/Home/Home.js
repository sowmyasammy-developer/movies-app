import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import '../styles.css';

import * as moviesActions from '../../store/actions/movies';
import MovieTile from '../../components/MovieTile/MovieTile';

const Home = props => {

    const [myList, setMyList] = useState([]);
    const [year, setYear] = useState('');
    const error = useSelector(state => state.movies.error);
    const movies = useSelector(state => state.movies.movies);
    const list = useSelector(state => state.movies.myList);

    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(()=>{
        dispatch(moviesActions.fetchMovies(year));
    },[dispatch,year,list]);

    const handleChange = (e) => {
        setYear(e.target.value);
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
            <select value={year} onChange={handleChange}>
            <option value=""></option>
            {[...Array(21).keys()].map((i)=><option key={i} value={2000+i}>{2000+i}</option>)}
            </select>
            <button className='button' type='button' onClick={()=>{history.push('/myList')}}>Go To My List</button>
        </div>
        <div>
        { movies.length>0 ?
            <div className='issueContainer'>
                    {
                        movies.map((movie,index)=><MovieTile key={index} movie={movie} handleList={handleList}/>) 
                    }
            </div> :
            <div className='noIssueContainer'>
                <h1>{error}</h1>
            </div>
        }
        </div>  
        <div> 
        <button className='button' type='button' onClick={()=>{dispatch(moviesActions.fetchMyList(myList,false))}}>Add to My List</button>
        <button className='button' type='button' onClick={()=>{dispatch(moviesActions.fetchMyList(myList,true))}}>Add to My Watched List</button>
        </div>
        </div>
        </div>
    );
}; 

export default Home;