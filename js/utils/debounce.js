let debounceTimer;

const debounce = (func) => {
    debounceTimer && clearTimeout(debounceTimer);

    debounceTimer = setTimeout(() => {
        func();
    }, 500);
}