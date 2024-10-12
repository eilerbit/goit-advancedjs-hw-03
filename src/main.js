import { fetchImages } from './js/pixabay-api.js';
import { renderImages } from './js/render-functions.js';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('#search-form');
const galleryElement = document.querySelector('.gallery');
const loadingElement = document.querySelector('.loading');
const gallery = new SimpleLightbox('.gallery a');

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const query = event.target.elements[0].value.trim();

    if (!query) {
        iziToast.error({
            title: 'Error',
            message: 'Please enter a search term!'
        });
        return;
    }

    galleryElement.innerHTML = '';
    loadingElement.classList.remove('hidden');

    try {
        const images = await fetchImages(query);
        
        loadingElement.classList.add('hidden');

        if (images.length === 0) {
            iziToast.error({
                title: 'No Results',
                message: 'Sorry, there are no images matching your search query. Please, try again!'
            });
        } else {
            renderImages(images);
            gallery.refresh();
        }
    } catch (error) {
        iziToast.error({
            title: 'Error',
            message: 'Something went wrong, please try again later!'
        });
    } finally {
        loadingElement.classList.add('hidden');
    }
});
