let currentPage = 1;
let sortColumn = 'id';
let sortOrder = 'asc';
let pageSize = 50;

const createEllipsis = () => {
    const ellipsis = document.createElement('li');
    ellipsis.textContent = '...';
    ellipsis.classList.add('pagination-list');
    ellipsis.style.pointerEvents = 'none';
    return ellipsis;
}

const printPageNumber = (i) => {                                                                                                                      
    const list = document.createElement('li');
    list.textContent = i;
    list.classList.add('pagination-list');
    currentPage === i && list.classList.add('active');
    PaginationLists.appendChild(list);
}

const populatePagination = (data) => {
    const {totalCount} = data; 
    const totalPages = Math.ceil(totalCount / pageSize); 

     PaginationLists.innerHTML = '';

     //1. 총 페이지가 7이하인 경우, 전체를 그린다
    if(totalPages <= MAX_VISIBLE_PAGES){
        for(let i = 1; i <= totalPages; i++){
            printPageNumber(i);
        }
        return;
    } 

    //2. 현재 페이지가 4이하인 경우
    if (currentPage <= 4) {
        for (let i = 1; i <= 5; i++) {
            printPageNumber(i);
        }
        PaginationLists.appendChild(createEllipsis());
        printPageNumber(totalPages);
    } else if (currentPage >= totalPages - 3) { //3. 현재페이지가 끝페이지-3 이상인경우        
        printPageNumber(1);
        PaginationLists.appendChild(createEllipsis());
        for (let i = totalPages - 4; i <= totalPages; i++) {
            printPageNumber(i);
        }
    } else { // 4. 현재페이지가 중간에 위치한 경우
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

const changePage = (e) => {
    const {textContent} = e.target;  

    currentPage = Number(textContent);
    document.querySelector('.active').classList.remove('active');

    loadAndDisplayData();
}

window.addEventListener('load', () => {
    PaginationLists.addEventListener('click', (e) => {
        const {localName} = e.target;  
    
        if(localName !== 'li'){
            return;
        }

        displayLoading();
        debounce(() => changePage(e))
    })
    
    prevBtn.addEventListener('click', () => {
        currentPage = currentPage - 1;
        displayLoading();
        debounce(loadAndDisplayData);
    })
    
    nextBtn.addEventListener('click', () => {
        currentPage = currentPage + 1;
        displayLoading();
        debounce(loadAndDisplayData);
    })
})


