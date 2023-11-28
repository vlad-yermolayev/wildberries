const GET_GOODS = () => {
    const LINKS = document.querySelectorAll('.navigation-link');

    const GET_DATA = () => {
        fetch('/db/db.json')
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                localStorage.setItem('goods', JSON.stringify(data));
            })
    }

    LINKS.forEach((link) => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            GET_DATA();
        })
    });
};

GET_GOODS();