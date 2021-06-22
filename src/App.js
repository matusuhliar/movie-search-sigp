import React from 'react';
import {AppBar, Box, Container, Divider, Grid, Link, makeStyles, Paper, Toolbar, Typography} from "@material-ui/core";
import MovieList from "./pages/MovieList";
import {Route, Switch} from 'react-router-dom'
import {useHistory} from "react-router";
import MovieDetail from "./pages/MovieDetail";
import Favourite from "./pages/Favourite";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        background: '#f4f4f4'
    },
    header:{
        background:"black",
        color:"white",
        fontFamily:"Roboto",
        height:"50px",
        display: "flex",
        alignItems:"center",
        borderRadius:"5px",
        marginBottom:"10px",
        padding:"10px 20px"
    },
    toolbar: {
        flexWrap: 'wrap',
    },
    appBar: {
        borderBottom: `1px solid ${theme.palette.divider}`,
        margin: theme.spacing(1, 0),
    },
    toolbarTitle: {
        flexGrow: 1,
    },
    link: {
        margin: theme.spacing(1, 1.5),
    }
}));

function App() {

    const history = useHistory();

    const openFavourites = () =>{
        history.push('/favourite/')
    }
    const openSearch = () =>{
        history.push('/')
    }
    const classes = useStyles();
    return (
        <Container maxWidth="md" classes={classes.root}>
            <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
                <Toolbar className={classes.toolbar}>
                    <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
                        Movie Database
                    </Typography>
                    <nav>
                        <Link variant="button" color="textPrimary" href="#" onClick={openSearch} className={classes.link}>
                            Search
                        </Link>
                        <Link variant="button" color="textPrimary" href="#" onClick={openFavourites} className={classes.link}>
                            Favorites
                        </Link>
                    </nav>
                </Toolbar>
            </AppBar>
            <Switch>
                <Route exact path="/" component={MovieList} />
                <Route exact path="/detail/:id" component={MovieDetail} />
                <Route exact path="/favourite" component={Favourite} />

            </Switch>
        </Container>
    );
}

export default App;
