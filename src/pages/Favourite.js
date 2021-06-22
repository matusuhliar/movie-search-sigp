import {
    Grid, GridList, GridListTile, GridListTileBar, IconButton,
    makeStyles,
    Paper
} from "@material-ui/core";
import React, {useState} from "react";
import {useHistory} from "react-router";
import {EMPTY_IMAGE, LOCAL_STORAGE_KEY} from "../Constants";
import {Delete} from "@material-ui/icons";


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

    const [count, setCount] = useState(0);
    const removeFromFavorites = (event,id) => {
        event.stopPropagation();
        let items = localStorage.getItem(LOCAL_STORAGE_KEY)
        if(!items){
            items = {};
        }else{
            items = JSON.parse(items);
        }
        delete items[id]
        localStorage.setItem(LOCAL_STORAGE_KEY,JSON.stringify(items))
        setCount(count+1)
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
                                        {r.Poster!=="N/A"?<img src={r.Poster} alt={r.Title} />:<img src={EMPTY_IMAGE} alt={r.Title}/>}
                                        <GridListTileBar
                                            title={r.Title}
                                            subtitle={<span>year: {r.Year}</span>}
                                            actionIcon={
                                                <IconButton aria-label={`info about ${r.Title}`} className={classes.icon}>
                                                    <Delete onClick={(event)=>removeFromFavorites(event,r.imdbID)} color="secondary" />
                                                </IconButton>
                                            }
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