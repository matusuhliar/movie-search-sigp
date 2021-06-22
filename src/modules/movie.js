import { createAction, handleActions } from 'redux-actions';
import { call, put, takeEvery } from 'redux-saga/effects';
import {getMovieAPI} from "../api/API";

const GET_MOVIE = 'GET_MOVIE';
const CLEAN_MOVIE = 'CLEAN_MOVIE';
const GET_MOVIE_SUCCESS = 'GET_MOVIE_SUCCESS';
const GET_MOVIE_FAILURE = 'GET_MOVIE_FAILURE';

export const getMovie = createAction(GET_MOVIE, search => search);

function* getMovieSaga(action) {
    yield put({ type: CLEAN_MOVIE })
    try {
        const response = yield call(getMovieAPI, action.payload);
        yield put({ type: GET_MOVIE_SUCCESS, payload: response });
    } catch (e) {
        yield put({ type: GET_MOVIE_FAILURE, payload: e });
    }
}

const initialState = {
    movie: null
};

export function* movieSaga() {
    yield takeEvery('GET_MOVIE', getMovieSaga);
}

export default handleActions(
    {
        [GET_MOVIE_SUCCESS]: (state, action) => {
            if(action.payload.data.Response === "True"){
                return {
                    movie: action.payload.data
                };
            }else{
                return {
                    movie: null
                };
            }
        },
        [CLEAN_MOVIE]: (state, action) => {
            return {
                movie: null
            };
        }

    },
    initialState
);
