import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import getImage from './js/pixabay';
import showElement from './js/show';
import markupGallery from './js/gallery';
import scroll from './js/scroll';

const refs = {
  form: document.querySelector('#search-form'),
  input: document.querySelector('input'),
  gallery: document.querySelector('.gallery'),
  loadBtn: document.querySelector('.js-load-btn'),
};

refs.form.addEventListener('submit', search);
refs.loadBtn.addEventListener('click', lazyLoadMore);

showElement(refs.loadBtn, false);

const onImages = new SimpleLightbox('.js-gallery a', {
  captionDelay: 250,
  captionsData: 'alt',
});

let currentQuery = '';
let page = 1;

async function search(e) {
  e.preventDefault();
  showElement(refs.loadBtn, false);
  const query = refs.input.value.trim().toLowerCase();

  if (!query) {
    iziToast.show({
      title: 'Ops!',
      message: 'Enter something to search!',
      position: 'topRight',
    });
    return;
  }

  if (currentQuery === query) {
    iziToast.show({
      title: 'Sorry!',
      message: 'Rewrite your requests, write something different.!',
      position: 'topRight',
    });
    return;
  }

  currentQuery = query;

  clearGallery();

  try {
    const data = await getImage(currentQuery, page);

    const allCollection = data.data.totalHits;
    const collection = data.data.hits;

    if (allCollection === 0) {
      showElement(refs.loadBtn, false);
      iziToast.show({
        message:
          'Sorry, there are no images matching your search query. Please try again.',
        position: 'topRight',
      });
      return;
    }

    refs.gallery.insertAdjacentHTML('afterbegin', markupGallery(collection));

    iziToast.show({
      message: `Hooray! We found ${allCollection} images.`,
      position: 'topRight',
    });

    showElement(refs.loadBtn, true);
    onImages.refresh();
  } catch (err) {
    console.log(err);
    clearGallery();
  }
}

async function lazyLoadMore(e) {
  e.preventDefault();

  page += 1;

  try {
    const data = await getImage(currentQuery, page);
    const collection = data.data.hits;
    const allCollection = data.data.totalHits;

    if (!(page < Math.ceil(allCollection / 40))) {
      iziToast.show({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
      showElement(refs.loadBtn, false);
    }

    refs.gallery.insertAdjacentHTML('beforeend', markupGallery(collection));
    scroll();
    onImages.refresh();
  } catch (err) {
    console.log(err);
    clearGallery();
  }
}

function clearGallery() {
  refs.gallery.innerHTML = '';
  page = 1;
}
