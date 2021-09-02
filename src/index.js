const REQUEST_HEADERS = {
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
};

const getAppData = () => {
    return fetch('data.json', REQUEST_HEADERS)
    .then((response) => response.json())
    .catch(() => console.error('please set a data.json file with the app data'))
}

const getGenders = () => {
    getAppData()
    .then(({api_key, api_resource}) => fetch(`${api_resource}/3/genre/movie/list?api_key=${api_key}&language=en-US`, REQUEST_HEADERS))
    .then((response) => response.json())
    .then(data => console.log(data))
}

getGenders();