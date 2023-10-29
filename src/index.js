import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import Notify from 'notiflix';
import { fetchBreeds, fetchCat } from './cat-api';
import './style.css'

const select = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const cat = document.querySelector('.cat-info')

loader.classList.add('is-hidden');
error.classList.add('is-hidden');
cat.classList.add('is-hidden');

select.classList.add('is-hidden')
document.querySelector('body').insertAdjacentHTML = '<span class="loader"></span>';


select.addEventListener('change', onSelect)

const catArr = [];

fetchBreeds()
    .then(data => {
        data.map(element => {
            catArr.push({ text: element.name, value: element.id })
            console.log(catArr)
            console.log(data)
        });
        const selector = new SlimSelect({ 
            select: '.breed-select',

        });
        
        
        selector.setData(catArr)
        //selector.insertAdjacentHTML('afterbegin', '<option value="" selected>None</option>');
       // selector.destroy()
        select.classList.remove('is-hidden')
        cat.classList.add('is-hidden')
    })
    

    .catch(newError)



function onSelect(evt) {
    cat.classList.add('is-hidden');
    loader.classList.remove('is-hidden')
    cat.innerHTML = '';
    const breadID = evt.currentTarget.value
    
    fetchCat(breadID)
        .then(
            data => {
                
                const { url, breeds } = data[0]
                  
    cat.innerHTML = `<img src="${url}" width='400' alt="${breeds[0].name}">
        <div><h1>'${breeds[0].name}'</h1><p>${breeds[0].description}</p>
        <p><b>Temperament: </b>${breeds[0].temperament}</p></div>`
    loader.classList.add('is-hidden')
    
            }
            
    )
        .finally(
             cat.classList.remove('is-hidden')  
    )
    .catch(newError)
}

    
function newError() {
    loader.classList.add('is-hidden')
    Notify.Notify.failure('Oops! Something went wrong! Try reloading the page!')
}
