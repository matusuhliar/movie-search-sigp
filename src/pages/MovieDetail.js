import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {getMovie} from "../modules/movie";
import {makeStyles, Paper} from "@material-ui/core";
import {StarBorder} from "@material-ui/icons";
import {EMPTY_IMAGE, LOCAL_STORAGE_KEY} from "../Constants";

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
    const dispatch = useDispatch();
    const [lastId, setLastId] = useState("");
    const movie = useSelector(state =>state.movie.movie)
    useEffect(() => {

        if(lastId!==props.match.params.id){
            setLastId(props.match.params.id)
            dispatch(getMovie(props.match.params.id))
        }

    },[lastId, props.match.params.id, dispatch]);


    const inLocalStorage = (id)=>{
        let items = localStorage.getItem(LOCAL_STORAGE_KEY)
        if(items){
            items = JSON.parse(items);
            return id in items;
        }
        return false;
    }
    const [inStorage, setInStorage] = useState(inLocalStorage(props.match.params.id));

    const addToFavourites = (obj) => {
        let items = localStorage.getItem(LOCAL_STORAGE_KEY)
        if(!items){
            items = {};
        }else{
            items = JSON.parse(items);
        }
        if(items[obj.imdbID]){
            delete items[obj.imdbID]
        }else{
            items[obj.imdbID] = obj;
        }
        localStorage.setItem(LOCAL_STORAGE_KEY,JSON.stringify(items))
        setInStorage(inLocalStorage(obj.imdbID));
    }



    if(movie){
        return (
            <Paper className={classes.paper}>
                <div className="detail">
                    {movie.Poster!=="N/A"?<img src={movie.Poster} alt={movie.Title} />:<img src={EMPTY_IMAGE} alt={movie.Title}/>}
                    <div className="properties">
                        <h2>{movie.Title} <StarBorder color={inStorage?"primary":"secondary"} onClick={()=>addToFavourites({imdbID:movie.imdbID, Title:movie.Title, Year: movie.Year, Poster:movie.Poster})} /></h2>
                        <div className={"description"}>{movie['Plot']}</div>
                        <div className={"items"}>
                            <div className={"left"}>
                                <div className={"item"}><b>Actors:</b>{movie['Actors']}</div>
                                <div className={"item"}><b>Awards:</b>{movie['Awards']}</div>
                                <div className={"item"}><b>BoxOffice:</b>{movie['BoxOffice']}</div>
                                <div className={"item"}><b>Country:</b>{movie['Country']}</div>
                                <div className={"item"}><b>DVD:</b>{movie['DVD']}</div>
                                <div className={"item"}><b>Director:</b>{movie['Director']}</div>
                                <div className={"item"}><b>Genre:</b>{movie['Genre']}</div>
                                <div className={"item"}><b>Language:</b>{movie['Language']}</div>
                            </div>
                            <div className={"right"}>
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
                </div>
            </Paper>
        )
    }

    return null;
}

export default MovieDetail;