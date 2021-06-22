import { createAction, handleActions } from 'redux-actions';
import { call, put, takeEvery } from 'redux-saga/effects';
import {getMoviesAPI} from "../api/API";
import {useDispatch} from "react-redux";

const GET_MOVIES = 'GET_MOVIES';
const GET_MOVIES_SUCCESS = 'GET_MOVIES_SUCCESS';
const GET_MOVIES_FAILURE = 'GET_MOVIES_FAILURE';
const CLEAN_MOVIES = 'CLEAN_MOVIES';

export const getMovies = createAction(GET_MOVIES, (search,page) =>{return {search,page}});

function* getMoviesSaga(action) {
    yield put({ type: CLEAN_MOVIES })
    try {
        const response = yield call(getMoviesAPI, action.payload.search,action.payload.page);
        yield put({ type: GET_MOVIES_SUCCESS, payload: response });
    } catch (e) {
        yield put({ type: GET_MOVIES_FAILURE, payload: e });
    }
}

const initialState = {
    movies: [],
    total: 0
};

export function* moviesSaga() {
    yield takeEvery('GET_MOVIES', getMoviesSaga);
}

export default handleActions(
    {
        [GET_MOVIES_SUCCESS]: (state, action) => {
            if(action.payload.data.Response === "True"){
                return {
                    movies: action.payload.data.Search,
                    total: parseInt(action.payload.data.totalResults)
                };
            }else{
                return {
                    movies: [],
                    total: 0
                };
            }
        },
        [CLEAN_MOVIES]: (state, action) => {
            return {
                movies: [],
                total: 0
            }
        }
    },
    initialState
);
