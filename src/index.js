import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import Notify from 'notiflix';
import { fetchBreeds, fetchCat } from './cat-api';
import './style.css'

const selector = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const cat = document.querySelector('.cat-info')

selector.classList.add('is-hidden');
error.classList.add('is-hidden');
cat.classList.add('is-hidden');

list()

function list() {
    const catArr = [];
    fetchBreeds()
        .then(
            data => {
                //data.map(element => {
                //    catArr.push({ text: element.name, value: element.id })
            //});
        selector.innerHTML = catList(data)
                new SlimSelect({
                    select: '.breed-select',

                    settings: {
                placeholderText: 'Just chose a cat...',
            },

                });
                //selector.setData(catArr)
                loader.classList.add('is-hidden')
                selector.classList.remove('is-hidden')
                
                
            })
        .catch(newError);
}

function catList(data) {
    const markup = data.map(({ name, id }) => { return `<option value="${id}">${name}</option>` })
    markup.unshift(`<option data-placeholder="true"></option>`);
  return markup.join('');
}

selector.addEventListener('change', onSelect);

function onSelect(event) {
    loader.classList.replace('is-hidden', 'loader');
    selector.classList.add('is-hidden');
    cat.classList.add('is-hidden');

    const breedId = event.currentTarget.value;
    fetchCat(breedId)
    .then(data => {
        loader.classList.replace('loader', 'is-hidden');
        selector.classList.remove('is-hidden');
        const { url, breeds } = data[0];
        
        cat.innerHTML = `<img src="${url}" width='400' alt="${breeds[0].name}">
        <div><h1>'${breeds[0].name}'</h1><p>${breeds[0].description}</p>
        <p><b>Temperament: </b>${breeds[0].temperament}</p></div>`
        cat.classList.remove('is-hidden');
    })
    .catch(newError);
};

function newError(error) {
    selector.classList.remove('is-hidden');
    loader.classList.replace('loader', 'is-hidden');

    Notify.Notify.failure('Oops! Something went wrong! Try reloading the page or select another cat breed!', {
        position: 'center-center',
        timeout: 5000,
        width: '400px',
        fontSize: '24px'
    });
};
   






    




