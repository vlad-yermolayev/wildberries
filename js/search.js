const SEARCH = () => {
    const SEARCH_INPUT = document.querySelector('.search-block > input');
    const SEARCH_BUTTON = document.getElementById('button-addon2');

    const RENDER_PRODUCTS = (products) => {
        const PRODUCTS_CONTAINER = document.querySelector('.long-goods-list');
        PRODUCTS_CONTAINER.innerHTML = '';

        products.forEach((product) => {
            const PRODUCT_ELEMENT = document.createElement('div');

            PRODUCT_ELEMENT.classList.add('col-lg-3');
            PRODUCT_ELEMENT.classList.add('col-sm-6');
            PRODUCT_ELEMENT.innerHTML = `
                <div class="goods-card">
                    <span class="label ${product.label ? null : 'd-none'}">${product.label}</span>
                    <img src="db/${product.img}" alt="${product.name}" class="goods-image">
                    <h3 class="goods-title">${product.name}</h3>
                    <p class="goods-description">${product.description}</p>
                    <button class="button goods-card-btn add-to-cart" data-id="${product.id}">
                        <span class="button-price">$${product.price}</span>
                    </button>
                </div>
            `;
            PRODUCTS_CONTAINER.append(PRODUCT_ELEMENT);
        })
    };

    const GET_DATA = (value) => {
        fetch('/db/db.json')
            .then((response) => response.json())
            .then((data) => {
                const ARRAY = data.filter(product => {
                    return product.name.toLowerCase().includes(value.toLowerCase());
                });
                localStorage.setItem('products', JSON.stringify(ARRAY));
                if (window.location.pathname !== '/goods.html') {
                    window.location.href = '/goods.html';
                }
                else {
                    RENDER_PRODUCTS(ARRAY);
                }
            })
    };

    try {
        SEARCH_BUTTON.addEventListener('click', () => {
            GET_DATA(SEARCH_INPUT.value);
        });
    } catch (e) {
        console.error(e.message);
    }
};

SEARCH();