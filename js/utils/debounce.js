let debounceTimer;

const debounce = (func) => {
    debounceTimer = setTimeout(() => {
        func();
    }, 1000);
}
