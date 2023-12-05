const GET_PRODUCTS = () => {
    const LINKS = document.querySelectorAll('.navigation-link');
    const VIEW_ALL = document.querySelector('.more');

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

    const GET_DATA = (value, category) => {
        fetch('/db/db.json')
            .then((response) => response.json())
            .then((data) => {
                const ARRAY = category ? data.filter((item) => item[category] === value) : data;
                localStorage.setItem('products', JSON.stringify(ARRAY));
                if (window.location.pathname !== '/goods.html') {
                    window.location.href = '/goods.html';
                }
                else {
                    RENDER_PRODUCTS(ARRAY);
                }
            })
    };

    LINKS.forEach((link) => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const LINK_VALUE = link.textContent;
            const CATEGORY = link.dataset.field;
            GET_DATA(LINK_VALUE, CATEGORY);
        })
    });

    if (VIEW_ALL) {
        VIEW_ALL.addEventListener('click', (event) => {
            event.preventDefault();
            GET_DATA();
        })
    };

    if (localStorage.getItem('products') && window.location.pathname === '/goods.html') {
        RENDER_PRODUCTS(JSON.parse(localStorage.getItem('products')));
    };
};

GET_PRODUCTS();