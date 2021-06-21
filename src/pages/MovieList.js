import {
    Button,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Grid,
    makeStyles,
    Paper,
    TextField, Typography
} from "@material-ui/core";
import React, {useEffect, useRef, useState} from "react";
import {API_KEY} from "../Constants";
import queryString from 'query-string'
import {useHistory, useLocation} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {setMovies} from "../features/movies/Movies";


const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        display: "flex",
        flexDirection:"row",
        flexWrap:"wrap",
        justifyContent:"center"
    },
    card: {
        padding: theme.spacing(2),
        display: "flex",
        flexDirection:"row",
        flexWrap:"wrap",
        margin:"5px",
        width:"150px",
        alignItems:"flex-start"
    },
    cardMedia:{
        width:"100%"
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


    // load data on change
    useEffect(() => {
        if(qs.search!==lastSearch){
            setLastSearch(qs.search);
            fetch(`http://omdbapi.com/?${queryString.stringify({s:qs.search,apikey:API_KEY})}`).then(
                response => response.json()
            ).then(json=>{
                if(json.Response === "True"){
                    dispatch(setMovies(json.Search))
                }else{
                    dispatch(setMovies([]))
                }
            }).catch(e=>{
                dispatch(setMovies([]))
            })
        }
    });


    return (
        <div>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <TextField value className={classes.input} value={search} onChange={(event)=>setSearch(event.target.value)} color="primary" label="Search for Movies" variant="outlined" />
                        <Button variant="contained" color="primary" onClick={()=>startSearch(search)}>Search</Button>
                    </Paper>
                </Grid>
                {
                    movies.length?<Grid item xs={12}>
                            <Paper className={classes.paper}>
                                {movies.map(r=><Card className={classes.card}>
                                    <CardActionArea>
                                        <CardMedia
                                            className={classes.cardMedia}
                                            component="img"
                                            alt="Contemplative Reptile"
                                            image={r.Poster}
                                            title={r.Title}
                                        />
                                        <CardContent>
                                            <b>{r.Title}</b>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>)}
                            </Paper>
                        </Grid>:null
                }

            </Grid>
        </div>
    );
}

export default MovieList;