import {
    Button,
    Grid, GridList, GridListTile, GridListTileBar,
    makeStyles,
    Paper,
    TextField
} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import queryString from 'query-string'
import {useHistory, useLocation} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {getMovies} from "../modules/movies";
import Pagination from '@material-ui/lab/Pagination';
import {EMPTY_IMAGE} from "../Constants";


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
    const startSearch = (search,page) =>{
        history.push('/?'+queryString.stringify({search,page}))
    }
    const page = qs.page?parseInt(qs.page):1


    const dispatch = useDispatch()
    //load results
    const movies = useSelector(state =>state.movies.movies)
    const total = useSelector(state => state.movies.total )

    //set detail
    const openDetail = (id) =>{
        history.push('/detail/'+id)
    }

    // load data on change
    useEffect(() => {
        dispatch(getMovies(qs.search,qs.page))
    },[qs.search, qs.page, dispatch]);

    return (
        <div>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <Paper className={classes.paperSearch}>
                        <TextField className={classes.input} value={search} onChange={(event)=>setSearch(event.target.value)} color="primary" label="Search for Movies" variant="outlined" />
                        <Button variant="contained" color="primary" onClick={()=>startSearch(search,1)}>Search</Button>
                    </Paper>
                </Grid>
                {
                    movies.length?<Grid item xs={12}>
                            <Paper className={classes.paperList}>

                                <GridList cellHeight={180} className={classes.item}>
                                    {movies.map(r=>
                                        <GridListTile key={r.imdbID} onClick={()=>openDetail(r.imdbID)}>
                                            {r.Poster!=="N/A"?<img src={r.Poster} alt={r.Title} />:<img src={EMPTY_IMAGE} alt={r.Title}/>}
                                            <GridListTileBar
                                                title={r.Title}
                                                subtitle={<span>year: {r.Year}</span>}
                                            />
                                        </GridListTile>
                                   )}
                                </GridList>
                                <Pagination count={Math.ceil(total/10)} page={page} size="small" onChange={(event,page)=>startSearch(search,page)}/>

                            </Paper>
                        </Grid>:null
                }

            </Grid>
        </div>
    );
}

export default MovieList;