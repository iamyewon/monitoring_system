
// trailing edge
let debounceTimer;

const debounce = (func) => {
    debounceTimer && clearTimeout(debounceTimer);

    debounceTimer = setTimeout(() => {
        func();
    }, 300);
}


// leading edge 
let leadingDebounceTimer;

const leadingDebounce = (func) => {
    if (!leadingDebounceTimer) {
        func();
    }
    
    clearTimeout(leadingDebounceTimer);
    leadingDebounceTimer = setTimeout(() => {
        leadingDebounceTimer = null;
    }, 300);
}


// Trailing과 Leading Edge를 모두 처리

    const debounceTest = (callback, wait, leading = false) => {
    let timer;

    return (event) => {
        const callNow = leading && !timer; 

        const later = () => {
            timer = null;
            if(!leading) callback(event);
        };
0
        clearTimeout(timer);
        timer = setTimeout(later, wait);

        if(callNow) callback(event);
    };
};
