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

    const firstPage = document.createElement('li');
    firstPage.textContent = 1;
    firstPage.classList.add('pagination-list');
    currentPage === 1 && firstPage.classList.add('active');

    const createEllipsis = () => {
        const ellipsis = document.createElement('li');
        ellipsis.textContent = '...';
        ellipsis.classList.add('pagination-list');
        return ellipsis;
    }; 

    const printPageNumber = (i) => {                                                                                                                      
        const list = document.createElement('li');
        list.textContent = i;
        list.classList.add('pagination-list');
        currentPage === i && list.classList.add('active');
        PaginationLists.appendChild(list);
    }

    const lastPage = document.createElement('li');
    lastPage.textContent = totalPages;
    lastPage.classList.add('pagination-list');


    // 기존 페이지네이션 제거
    PaginationLists.innerHTML = '';


    // 1. totalPage가 maxVisiblePage(7)보다 작을 때 
    if(totalPages <= maxVisiblePages){
        for(let i = 1; i <= totalPages; i++){
            printPageNumber(i);
        }

    // 2. totalPage가 maxVisiblePage(7)보다 클 때
    }else{
        // 현재 페이지가 4 이하 일때 -> 1, 2, 3, 4, 5, ..., totalPage 
        if (currentPage <= 4) {
            for (let i = 1; i <= 5; i++) {
                printPageNumber(i);
            }
            
            PaginationLists.appendChild(createEllipsis());
            PaginationLists.appendChild(lastPage);

        } else if (currentPage >= totalPages - 3) {         
            // 현재 페이지가 토탈페이지보다 3 작은수 이상일 때 
            // => 1, ..., totalPage-4, totalPage-3, totalPage-2, totalPage-1, totalPage

            PaginationLists.appendChild(firstPage);
            PaginationLists.appendChild(createEllipsis());
            
            for (let i = totalPages - 4; i <= totalPages; i++) {
                printPageNumber(i);
            }
            
        } else {
            // 현재 페이지가 1+4 이상, totalPage-4 이하 일 때 
            PaginationLists.appendChild(firstPage);
            PaginationLists.appendChild(createEllipsis());

            for (let i = currentPage-1; i <= currentPage+1; i++) {
                printPageNumber(i);
            }

            PaginationLists.appendChild(createEllipsis());
            PaginationLists.appendChild(lastPage);
        }

    }    
}


const firstBtn = document.querySelector('.first-btn');
const prevBtn = document.querySelector('.prev-btn');
const lastBtn = document.querySelector('.last-btn');
const nextBtn = document.querySelector('.next-btn');


const handlePageNavigation = (data) => {
    const {totalCount} = data; 
    const totalPages = Math.ceil(totalCount / pageSize); 

    if(currentPage > 1){
        firstBtn.classList.add('hidden');
        prevBtn.classList.remove('hidden');
    }else{
        firstBtn.classList.remove('hidden');
        prevBtn.classList.add('hidden');
    }

    if(currentPage === totalPages){
        nextBtn.classList.add('hidden');
        lastBtn.classList.remove('hidden');
    }else{
        lastBtn.classList.add('hidden');
        nextBtn.classList.remove('hidden');
    }
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

    handlePage();

})


prevBtn.addEventListener('click', () => {
    currentPage = currentPage - 1;
    handlePage();
})

nextBtn.addEventListener('click', () => {
    currentPage = currentPage + 1;
    handlePage();
})
