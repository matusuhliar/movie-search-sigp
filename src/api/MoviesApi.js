const API_KEY = '4aa748b0'

export function searchMovies(search){
    const ENCODED_SEARCH = encodeURIComponent(search);
    return fetch(`http://omdbapi.com/?${API_KEY}=4aa748b0&s=${ENCODED_SEARCH}`)
}