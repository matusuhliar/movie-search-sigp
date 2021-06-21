import React from 'react';
import {Box, Container, makeStyles} from "@material-ui/core";
import MovieList from "./pages/MovieList";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

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
    title:{
        padding: "0px 5px"
    }
}));

function App() {
    const classes = useStyles();
    return (
        <Container maxWidth="md" classes={classes.root}>
            <Router>
                <Switch>
                    <Route exact path="/" component={MovieList} />
                </Switch>
            </Router>
        </Container>
    );
}

export default App;
