import axios from "axios";


const api = 'live_ZOIYouSRfmbmwgbGccVgZTixXy1YisuGVqbsFAmHMFSb2Bz8w4Wdfe742dJrSDSB'
const url = 'https://api.thecatapi.com/v1'


axios.defaults.headers.common["x-api-key"] = `${api}`;

export function fetchBreeds() {
    return fetch('https://api.thecatapi.com/v1/breeds')
              
    .then(resp => {
        if (!resp.ok) {
            throw new Error(response.status);
        }
        return resp.json()
    })
}

export function fetchCat(breadID) {
    return fetch(`${url}/images/search?api_key=${api}&breed_ids=${breadID}`)
    .then(resp => {
        if (!resp.ok) {
            throw new Error(response.status);
        }
        return resp.json()
    })

}