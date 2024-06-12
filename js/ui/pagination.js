let currentPage = 1;
let sortColumn = 'id';
let sortOrder = 'asc';
let pageSize = 50;

const populatePagination = (data) => {
    const {totalCount} = data; 
    const totalPages = Math.ceil(totalCount / pageSize); 

    const createEllipsis = () => {
        const ellipsis = document.createElement('li');
        ellipsis.textContent = '...';
        ellipsis.classList.add('pagination-list');
        ellipsis.style.pointerEvents = 'none';
        return ellipsis;
    };

    const printPageNumber = (i) => {                                                                                                                      
        const list = document.createElement('li');
        list.textContent = i;
        list.classList.add('pagination-list');
        currentPage === i && list.classList.add('active');
        PaginationLists.appendChild(list);
    }

    PaginationLists.innerHTML = '';

    if(totalPages <= MAX_VISIBLE_PAGES){
        for(let i = 1; i <= totalPages; i++){
            printPageNumber(i);
        }
        return;
    }  

    if (currentPage <= 4) {
        for (let i = 1; i <= 5; i++) {
            printPageNumber(i);
        }
        
        PaginationLists.appendChild(createEllipsis());
        printPageNumber(totalPages);

    } else if (currentPage >= totalPages - 3) {         
       printPageNumber(1);
        PaginationLists.appendChild(createEllipsis());
        
        for (let i = totalPages - 4; i <= totalPages; i++) {
            printPageNumber(i);
        }
        
    } else {
        printPageNumber(1);
        PaginationLists.appendChild(createEllipsis());

        for (let i = currentPage-1; i <= currentPage+1; i++) {
            printPageNumber(i);
        }

        PaginationLists.appendChild(createEllipsis());
        printPageNumber(totalPages);
    }
}

const ablePrevBtn = () => {
    firstBtn.classList.add('hidden');
    prevBtn.classList.remove('hidden');
}

const disablePrevBtn = () => {
    firstBtn.classList.remove('hidden');
    prevBtn.classList.add('hidden');
}

const ableNextBtn = () => {
    nextBtn.classList.remove('hidden');
    lastBtn.classList.add('hidden');
}

const disableNextBtn = () => {
    nextBtn.classList.add('hidden');
    lastBtn.classList.remove('hidden');
}

const handlePageNavigation = (data) => {
    const {totalCount} = data; 
    const totalPages = Math.ceil(totalCount / pageSize); 

    currentPage === 1 ? disablePrevBtn() : ablePrevBtn();
    currentPage === totalPages ? disableNextBtn() : ableNextBtn();
}

// const handlePage = async() => {
//     const data = await fetchData();
//     if (!data) return;
//     populatePagination(data);
//     populateTable(data);
//     handlePageNavigation(data);
// }

const throttle = (func, limit) => {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// handlePage 함수를 쓰로틀링 처리
const handlePage = throttle(async () => {
    const data = await fetchData();
    if (!data) return;
    populatePagination(data);
    populateTable(data);
    handlePageNavigation(data);
}, 1000); // 1000ms 쓰로틀 시간 설정 (원하는 시간으로 변경 가능)

const changePage = (e) => {
    const {textContent, localName} = e.target;  
    
    if(localName !== 'li'){
        return;
    }

    currentPage = Number(textContent);
    document.querySelector('.active').classList.remove('active');

    handlePage(); 
}

window.addEventListener('load', () => {
    PaginationLists.addEventListener('click', (e) => {
        changePage(e);
    })
    // PaginationLists.addEventListener('click', (e) => leadingDebounce(() => changePage(e)))
    // PaginationLists.addEventListener('click', debounceTest(changePage, 300, true))
    
    prevBtn.addEventListener('click', () => {
        currentPage = currentPage - 1;

        handlePage();
    })
    
    nextBtn.addEventListener('click', () => {
        currentPage = currentPage + 1;
        handlePage();
    })
})


