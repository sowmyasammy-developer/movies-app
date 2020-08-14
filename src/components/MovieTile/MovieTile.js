import React from 'react';
import './MovieTile.css';

const IssueTile = props => {
    const movie = props.movie;

    const handleChange=(e)=>{
        props.handleList(e.target.checked,movie);
    }

    return (
        <div className='issueTile'>
        <div>
            <input type='checkbox' onChange={handleChange} />
        </div>
        <div className='contentStyle'>
            <div>
                <h3 className='titleStyle'>{movie.Title}</h3>
            </div>
            <div className='details'>
                 <div className='detailStyle'>
                     <p className='captionBold'>Movie Year : </p>
                     <p className='caption'> {movie.Year}</p>
                 </div>
                 <div className='detailStyle'>
                     <img src={movie.Poster} alt={movie.Title} className='imgStyle'/>
                 </div>
            </div>
            </div>
        </div>
    );
};

export default IssueTile;