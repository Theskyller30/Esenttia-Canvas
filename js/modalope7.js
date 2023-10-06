const openModalope7 = document.querySelector('.hero__ctaope7');
const modalope7 = document.querySelector('.modalope7');
const closeModalope7 = document.querySelector('.modalope7__close');

openModalope7.addEventListener('click', (e) => {
    e.preventDefault();
    modalope7.classList.add('modalope7--show');
});

closeModalope7.addEventListener('click', (e) => {
    e.preventDefault();
    modalope7.classList.remove('modalope7--show');
});