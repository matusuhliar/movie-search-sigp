import {
    Button,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Grid, GridList, GridListTile, GridListTileBar, IconButton,
    makeStyles,
    Paper,
    TextField, Typography
} from "@material-ui/core";
import React, {useEffect, useRef, useState} from "react";
import queryString from 'query-string'
import {useHistory, useLocation} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {getMovies} from "../modules/movies";
import {LOCAL_STORAGE_KEY} from "../Constants";


const useStyles = makeStyles((theme) => ({
    paperSearch: {
        padding: theme.spacing(2),
        display: "flex",
        flexDirection:"row",
        flexWrap:"wrap",
        justifyContent:"center"
    },
    paperList: {
        padding: theme.spacing(2),
        display: "flex",
        flexDirection:"row",
        flexWrap:"wrap",
        justifyContent:"center"
    },
    item:{
        cursor:"pointer"
    },
    input:{
        flex:1,
        marginRight:"5px"
    }
}));

function Favourite() {
    const history = useHistory();
    //create styles
    const classes = useStyles();
    let movies = localStorage.getItem(LOCAL_STORAGE_KEY)
    if(movies){
        movies = JSON.parse(movies);
        movies = Object.keys(movies).map(k=>movies[k])
    }
    const openDetail = (id) =>{
        history.push('/detail/'+id)
    }
    return (
        <div>
            <Grid container spacing={1}>
                {
                    movies.length?<Grid item xs={12}>
                        <Paper className={classes.paperList}>

                            <GridList cellHeight={180} className={classes.item}>
                                {movies.map(r=>
                                    <GridListTile key={r.imdbID} onClick={()=>openDetail(r.imdbID)}>
                                        <img src={r.Poster} alt={r.Title} />
                                        <GridListTileBar
                                            title={r.Title}
                                            subtitle={<span>year: {r.Year}</span>}
                                        />
                                    </GridListTile>
                                )}
                            </GridList>
                        </Paper>
                    </Grid>:null
                }

            </Grid>
        </div>
    );
}

export default Favourite;