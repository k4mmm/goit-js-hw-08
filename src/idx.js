import gallery from "./gallery-items.js";

const galleryRef = document.querySelector('.js-gallery');
const lightboxRef = document.querySelector('.js-lightbox');
const lightboxImage = document.querySelector('.lightbox__image');

function insertMurkup(gallery) {
    const arr = gallery.map(({ preview, original, description }) => {
        return `<li class="gallery__item">
  <a
    class="gallery__link"
    href=""
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`;
    }).join('');
    galleryRef.innerHTML = arr;
};

insertMurkup(gallery);

galleryRef.addEventListener('click', (e) => {

    e.preventDefault();

    if (e.target.classList.value === 'gallery__image') {
        lightboxRef.classList.add('is-open');
        lightboxImage.src = e.target.dataset.source;
        lightboxImage.alt = e.target.alt;
    }
});

lightboxRef.addEventListener('click', (e) => {
    
    e.preventDefault();
    
    if (e.target.dataset.action === 'close-lightbox' || e.target.className === 'lightbox__overlay') {
        lightboxRef.classList.remove('is-open');
        lightboxImage.src = "";
        lightboxImage.alt = "";
    };
});

window.addEventListener('keydown', (e) => {
    let indexRef = gallery.findIndex(
        (galleryItem) => galleryItem.original === lightboxImage.src);
        
    if (e.key === "ArrowLeft") {
        indexRef === 0 ? indexRef = gallery.length - 1 : indexRef -= 1;
        lightboxImage.src = gallery[indexRef].original;
    }
    if (e.key === "ArrowRight") {
        indexRef === gallery.length - 1 ? indexRef = 0 : indexRef += 1;
        lightboxImage.src = gallery[indexRef].original;
    }
    if (e.key === "Escape") {
        lightboxRef.classList.remove('is-open');
        lightboxImage.src = "";
        lightboxImage.alt = ""
    };
})