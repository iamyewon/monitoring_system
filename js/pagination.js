///////////////////////////////// pagination /////////////////////////////////
// let currentPage = 1;
// let totalPages;
// let totalCount;
// let pagePerView = 50;

const itemsPerView = document.querySelector('.items-per-view');
const PaginationLists = document.querySelector('.pagination-lists');

let currentPage = 1; // 조회 api에 필요 
let sortColumn = 'id';
let sortOrder = 'asc';
let pageSize = 50;

const populatePagination = (data) => {
    const {totalCount} = data; 
    const totalPages = Math.ceil(totalCount / pageSize); 
    const maxVisiblePages = 7;
    // TODO : 상수파일에 정리  

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

    if(totalPages <= maxVisiblePages){
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


const firstBtn = document.querySelector('.first-btn');
const prevBtn = document.querySelector('.prev-btn');
const lastBtn = document.querySelector('.last-btn');
const nextBtn = document.querySelector('.next-btn');

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

const handlePage = async() => {
    const data = await fetchData();
    if (!data) return;
    populatePagination(data);
    populateTable(data);
    handlePageNavigation(data);
}

PaginationLists.addEventListener('click', (e) => {  
    const {textContent, localName} = e.target;  

    if(localName !== 'li'){
        return;
    }

    if(Number(textContent) === currentPage){
        return;
    }
    
    currentPage = Number(textContent);
    document.querySelector('.active').classList.remove('active');

    // debounceTimer && clearTimeout(debounceTimer);
    // debounce(handlePage);
    handlePage();
})


prevBtn.addEventListener('click', () => {
    currentPage = currentPage - 1;
    
    // debounceTimer && clearTimeout(debounceTimer);
    // debounce(handlePage);
    handlePage();
})

nextBtn.addEventListener('click', () => {
    currentPage = currentPage + 1;
    
    // debounceTimer && clearTimeout(debounceTimer);
    // debounce(handlePage);
    handlePage();
})
