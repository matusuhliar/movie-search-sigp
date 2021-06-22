import {useLocation} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {getMovies} from "../modules/movies";
import {getMovie} from "../modules/movie";
import {Box, Grid, makeStyles, Paper, Typography} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: "20px",
        display: "flex",
        flexDirection:"row"
    },
    detail: {
        padding: theme.spacing(0,1),
        display: "flex",
        flexDirection:"row",
        flexWrap:"wrap",
        justifyContent:"flex-start",
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
    },
    poster:{
        width:"150px"
    },
    item:{
        width:"100%"
    }
}));

function MovieDetail(props) {
    const classes = useStyles();
    const location = useLocation();
    const dispatch = useDispatch();
    const [lastId, setLastId] = useState("");
    const movie = useSelector(state =>state.movie.movie)
    useEffect(() => {

        if(lastId!==props.match.params.id){
            setLastId(props.match.params.id)
            dispatch(getMovie(props.match.params.id))
        }

    });

    if(movie){
        return (
            <Paper className={classes.paper}>
                <div className="detail">
                    <img className={classes.poster} src={movie.Poster} />
                    <div className="properties">
                        <h2>{movie.Title}</h2>
                        <div className={"description"}>{movie['Plot']}</div>
                        <div className={"items"}>
                            <div className={"item"}><b>Actors:</b>{movie['Actors']}</div>
                            <div className={"item"}><b>Awards:</b>{movie['Awards']}</div>
                            <div className={"item"}><b>BoxOffice:</b>{movie['BoxOffice']}</div>
                            <div className={"item"}><b>Country:</b>{movie['Country']}</div>
                            <div className={"item"}><b>DVD:</b>{movie['DVD']}</div>
                            <div className={"item"}><b>Director:</b>{movie['Director']}</div>
                            <div className={"item"}><b>Genre:</b>{movie['Genre']}</div>
                            <div className={"item"}><b>Language:</b>{movie['Language']}</div>
                            <div className={"item"}><b>Metascore:</b>{movie['Metascore']}</div>
                            <div className={"item"}><b>Production:</b>{movie['Production']}</div>
                            <div className={"item"}><b>Rated:</b>{movie['Rated']}</div>
                            <div className={"item"}><b>Released:</b>{movie['Released']}</div>
                            <div className={"item"}><b>Runtime:</b>{movie['Runtime']}</div>
                            <div className={"item"}><b>Type:</b>{movie['Type']}</div>
                            <div className={"item"}><b>Website:</b>{movie['Website']}</div>
                            <div className={"item"}><b>Writer:</b>{movie['Writer']}</div>
                            <div className={"item"}><b>Year:</b>{movie['Year']}</div>
                        </div>
                    </div>
                </div>
            </Paper>
        )

        /*
        Actors: "Karen Black, Bruce Dern, Barbara Harris"
Awards: "2 wins & 6 nominations"
BoxOffice: "N/A"
Country: "United States"
DVD: "19 Apr 2016"
Director: "Alfred Hitchcock"
Genre: "Comedy, Crime, Drama"
Language: "English"
Metascore: "79"
Plot: "A phony psychic/con artist and her taxi driver/private investigator boyfriend encounter a pair of serial kidnappers while trailing a missing heir in California."
Poster: "https://m.media-amazon.com/images/M/MV5BZWE5NDI0OTktNWZkZi00OTQ5LTg2ZTctNzljNDFmZmYyYWEzXkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_SX300.jpg"
Production: "Universal Pictures"
Rated: "PG"
Ratings: [{Source: "Internet Movie Database", Value: "6.8/10"}, {Source: "Rotten Tomatoes", Value: "92%"},…]
Released: "09 Apr 1976"
Response: "True"
Runtime: "120 min"
Title: "Family Plot"
Type: "movie"
Website: "N/A"
Writer: "Ernest Lehman, Victor Canning"
Year: "1976"
imdbID: "tt0074512"
imdbRating: "6.8"
imdbVotes: "21,236"
        * */

    }

    return null;
}

export default MovieDetail;