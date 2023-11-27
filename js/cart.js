const CART = () => {
    const CART_BUTTON = document.querySelector('.button-cart');
    const MODAL = document.getElementById('modal-cart');
    const MODAL_CLOSE = MODAL.querySelector('.modal-close');
    CART_BUTTON.addEventListener('click', () => {
        MODAL.style.display = 'flex';
    });

    MODAL_CLOSE.addEventListener('click', () => {
        MODAL.style.display = '';
    })
};


CART();