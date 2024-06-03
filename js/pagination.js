///////////////////////////////// pagination /////////////////////////////////
// let currentPage = 1;
// let totalPages;
// let totalCount;
// let pagePerView = 50;

const itemsPerView = document.querySelector('.items-per-view');
const perView = Number(itemsPerView.value); // 조회 api에 필요 

const PaginationLists = document.querySelector('.pagination-lists');

let currentPage = 1; // 조회 api에 필요 

const populatePagination = (data) => {
    const {totalCount} = data; 
    const totalPages = Math.ceil(totalCount / perView); 
    const maxVisiblePages = 7; 


    const firstPage = document.createElement('li');
    firstPage.textContent = 1;
    firstPage.classList.add('pagination-list');

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


    // 기존 페이지네이션 항목 제거
    while(PaginationLists.firstChild){
        PaginationLists.removeChild(PaginationLists.firstChild);
    }


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

PaginationLists.addEventListener('click', async(e) => {  
    const {textContent} = e.target;  
    if(e.target.localName !== 'li'){
        return;
    }
    
    currentPage = Number(textContent); // 잘 바뀌는데  ㅠ.ㅠ?
    document.querySelector('.active').classList.remove('active');
    // e.target.classList.add('active');
    
    const data = await fetchData();
    populatePagination(data);
})


document.addEventListener('DOMContentLoaded', () => {
    const list = document.querySelector('.pagination-list');
    if(list.textContent = '1'){
        list.classList.add('active');
    }
    
})

    // Add event listeners
    // document.querySelectorAll('.pagination li').forEach(item => {
    //     item.addEventListener('click', (e) => {
    //         const page = e.target.getAttribute('data-page');
    //         if (page) {
    //             currentPage = parseInt(page);
    //             renderPagination(currentPage, totalPages);
    //         } else if (e.target.classList.contains('prev') && currentPage > 1) {
    //             currentPage--;
    //             renderPagination(currentPage, totalPages);
    //         } else if (e.target.classList.contains('next') && currentPage < totalPages) {
    //             currentPage++;
    //             renderPagination(currentPage, totalPages);
    //         }
    //     });
    // });