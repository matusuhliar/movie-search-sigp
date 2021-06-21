import { configureStore } from '@reduxjs/toolkit'
import movies from "./features/movies/Movies";


const store =  configureStore({
    reducer: {
        movies
    },
})
export default store;