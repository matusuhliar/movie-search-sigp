import {
    Button,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Grid, GridList, GridListTile, GridListTileBar, IconButton,
    makeStyles,
    Paper,
    TextField
} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import queryString from 'query-string'
import {useHistory, useLocation} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {getMovies} from "../modules/movies";


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

function MovieList() {

    //create styles
    const classes = useStyles();

    //load location
    const location = useLocation();
    const history = useHistory();
    const qs = queryString.parse(location.search);

    //set current search base on location
    const [search, setSearch] = useState(qs.search||"");
    const startSearch = (search) =>{
        history.push('/?'+queryString.stringify({search}))
    }


    const dispatch = useDispatch()
    //load results
    const movies = useSelector(state => {
        return state.movies.movies;
    })
    const [lastSearch, setLastSearch] = useState("");


    //set detail
    const openDetail = (id) =>{
        history.push('/detail/'+id)
    }

    // load data on change
    useEffect(() => {
        if(qs.search!==lastSearch){
            setLastSearch(qs.search);
            dispatch(getMovies(qs.search))
        }
    });


    return (
        <div>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <Paper className={classes.paperSearch}>
                        <TextField value className={classes.input} value={search} onChange={(event)=>setSearch(event.target.value)} color="primary" label="Search for Movies" variant="outlined" />
                        <Button variant="contained" color="primary" onClick={()=>startSearch(search)}>Search</Button>
                    </Paper>
                </Grid>
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

export default MovieList;