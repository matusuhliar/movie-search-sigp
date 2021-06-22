import { combineReducers } from 'redux';
import movies, { moviesSaga } from './movies';
import movie, { movieSaga } from './movie';
import { all } from 'redux-saga/effects';

export function* rootSaga() {
    yield all([moviesSaga(),movieSaga()]);
}

export default combineReducers({
    movies,movie
});