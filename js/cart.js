const CART = () => {
    const CART_BUTTON = document.querySelector('.button-cart');
    const MODAL = document.getElementById('modal-cart');
    const MODAL_CLOSE = MODAL.querySelector('.modal-close');
    const PRODUCTS_CONTAINER = document.querySelector('.long-goods-list');
    const CART_TABLE = MODAL.querySelector('.cart-table__goods');
    const MODAL_FORM = document.querySelector('.modal-form');
    const NAME_INPUT = MODAL_FORM.querySelector('[name="nameCustomer"]');
    const PHONE_INPUT = MODAL_FORM.querySelector('[name="phoneCustomer"]');
    const TOTAL = MODAL.querySelector('.card-table__total');
    let total = 0;
    const SEND_FORM = () => {
        const CART = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify({
                cart: CART,
                name: NAME_INPUT.value,
                phone: PHONE_INPUT.value
            })
        }).then(() => {
            MODAL.style.display = '';
            NAME_INPUT.value = '';
            PHONE_INPUT.value = '';
            total = 0;
            localStorage.setItem('cart', JSON.stringify([]));
        })
    };
    const ADD_CART_ITEM = (id) => {
        const CART = JSON.parse(localStorage.getItem('cart'));
        const NEW_CART = CART.map(item => {
            if (item.id === id) {
                item.count++;
            }
            return item;
        });
        localStorage.setItem('cart', JSON.stringify(NEW_CART));
        RENDER_CART_PRODUCTS(JSON.parse(localStorage.getItem('cart')));
    };
    const REMOVE_CART_ITEM = (id) => {
        const CART = JSON.parse(localStorage.getItem('cart'));
        const NEW_CART = CART.map(item => {
            if (item.id === id) {
                if (item.count > 0) {
                    item.count--;
                }
            }
            return item;
        });
        localStorage.setItem('cart', JSON.stringify(NEW_CART));
        RENDER_CART_PRODUCTS(JSON.parse(localStorage.getItem('cart')));
    };
    const DELETE_CART_ITEM = (id) => {
        const CART = JSON.parse(localStorage.getItem('cart'));
        const NEW_CART = CART.filter(product => {
            return product.id !== id;
        });
        localStorage.setItem('cart', JSON.stringify(NEW_CART));
        RENDER_CART_PRODUCTS(JSON.parse(localStorage.getItem('cart')));
    };

    const RENDER_CART_PRODUCTS = (products) => {
        CART_TABLE.innerHTML = '';
        TOTAL.innerHTML = '$' + total;
        products.forEach(product => {
            const TR_ELEMENT = document.createElement('tr');
            total += +product.price * +product.count;
            TR_ELEMENT.innerHTML = `
                <td>${product.name}</td>
                <td>$${product.price}</td>
                <td><button class="cart-btn-minus"">-</button></td>
                <td>${product.count}</td>
                <td><button class="cart-btn-plus"">+</button></td>
                <td>$${+product.price * +product.count}</td>
                <td><button class="cart-btn-delete"">x</button></td>
            `;

            CART_TABLE.append(TR_ELEMENT);
            TOTAL.innerHTML = '$' + total;
            TR_ELEMENT.addEventListener('click', (event) => {
                if (event.target.classList.contains('cart-btn-minus')) {
                    REMOVE_CART_ITEM(product.id);
                }
                else if (event.target.classList.contains('cart-btn-plus')) {
                    ADD_CART_ITEM(product.id);
                }
                else if (event.target.classList.contains('cart-btn-delete')) {
                    console.log('delete');
                    DELETE_CART_ITEM(product.id);
                }
            })
        });

        total = 0;
    };

    const ADD_TO_CART = (id) => {
        const PRODUCTS = JSON.parse(localStorage.getItem('products'));
        const CLICKED_PRODUCT = PRODUCTS.find(item => item.id === id);
        const CART = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];

        if (CART.some(item => item.id === CLICKED_PRODUCT.id)) {
            CART.map(item => {
                if (item.id === CLICKED_PRODUCT.id) {
                    item.count++;
                }
                return item;
            });
        }
        else {
            CLICKED_PRODUCT.count = 1;
            CART.push(CLICKED_PRODUCT);
        }

        localStorage.setItem('cart', JSON.stringify(CART));
    };

    CART_BUTTON.addEventListener('click', () => {
        const CART_ARRAY = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
        RENDER_CART_PRODUCTS(CART_ARRAY);
        MODAL.style.display = 'flex';
    });

    MODAL_CLOSE.addEventListener('click', () => {
        MODAL.style.display = '';
    });

    MODAL.addEventListener('click', (event) => {
        if (!event.target.closest('.modal') && event.target.classList.contains('overlay')) {
            MODAL.style.display = '';
        }
    });

    MODAL_FORM.addEventListener('submit', (event) => {
        event.preventDefault();
        SEND_FORM();
    });


    if (PRODUCTS_CONTAINER) {
        PRODUCTS_CONTAINER.addEventListener('click', (event) => {
            if (event.target.closest('.add-to-cart')) {
                const ADD_TO_CART_BUTTON = event.target.closest('.add-to-cart');
                const PRODUCT_ID = ADD_TO_CART_BUTTON.dataset.id;
                ADD_TO_CART(PRODUCT_ID);
            }
        })
    };
};


CART();