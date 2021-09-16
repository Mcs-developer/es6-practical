const REQUEST_HEADERS = {
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
};

const elementlist = (list) => {
    const ul = document.createElement('ul');
    list.forEach(element => {
        const li = document.createElement('li');
        const text = document.createTextNode(element['name']);
        li.appendChild(text);

        ul.appendChild(li);
    });

    return ul;
}

const appDataRequest = () => fetch('data.json', REQUEST_HEADERS);
const gendersRequest = ({ api_key, api_resource }) => fetch(`${api_resource}/3/genre/movie/list?api_key=${api_key}&language=en-US`, REQUEST_HEADERS);


async function getGenders() {
    try {
        const appData = await appDataRequest();
        const jsonResponse = await appData.json();

        const dataGenders = await gendersRequest(jsonResponse);
        const { genres } = await dataGenders.json();

        return genres;
    } catch (error) {
        console.error(error);
    }
}


async function buildGenderList() {
    try {
        const genders = await getGenders();

        const container = document.getElementById('container');
        container.appendChild(elementlist(genders));

    } catch (error) {
        console.error(error);
    }
}


buildGenderList();