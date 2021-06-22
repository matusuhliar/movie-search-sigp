import queryString from "query-string";
import {API_KEY} from "../Constants";
import axios from "axios";

export function getMoviesAPI(search,page) {
    const url = `http://omdbapi.com/?${queryString.stringify({s:search, apikey:API_KEY, page:page})}`
    return axios.get(url);
}

export function getMovieAPI(id) {
    const url = `http://omdbapi.com/?${queryString.stringify({i:id,apikey:API_KEY})}`
    return axios.get(url);
}