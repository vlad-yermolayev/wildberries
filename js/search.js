const SEARCH = () => {
    const SEARCH_INPUT = document.querySelector('.search-block > input');
    const SEARCH_BUTTON = document.querySelector('.search-block > button');

    // SEARCH_INPUT.addEventListener('input', (event) => {
    //     console.log(event.target.value);
    // });

    SEARCH_BUTTON.addEventListener('click', () => {
        console.log(SEARCH_INPUT.value);
    });
};

SEARCH();