///////////////////////////////// pagination /////////////////////////////////
// let currentPage = 1;
// let totalPages;
// let totalCount;
// let pagePerView = 50;

const itemsPerView = document.querySelector('.items-per-view');
const PaginationLists = document.querySelector('.pagination-lists');
let currentPage = 1;
const maxVisiblePages = 7;

const populatePagination = (data) => {
    const {totalCount} = data;
    const perView = Number(itemsPerView.value); 
    const totalPages = Math.ceil(totalCount / perView); 


    // 기존 페이지네이션 항목 제거
    while (PaginationLists.firstChild) {
        PaginationLists.removeChild(PaginationLists.firstChild);
    }

    if (totalPages <= maxVisiblePages) {
        for (let i = 1; i < totalPages; i++) {
            const list = document.createElement('li');
            list.textContent = i;
            list.classList.add('pagination-list');
            PaginationLists.appendChild(list);
        }
    } else {
        if (currentPage <= 4) {
            for (let i = 2; i <= 5; i++) {
                const list = document.createElement('li');
                list.textContent = i;
                list.classList.add('pagination-list');
                PaginationLists.appendChild(list);
            }
            const ellipsis = document.createElement('li');
            ellipsis.textContent = '...'
            ellipsis.classList.add('pagination-list');
            PaginationLists.appendChild(ellipsis);

        } else if (currentPage >= totalPages - 3) {
            const ellipsis = document.createElement('li');
            ellipsis.textContent = '...'
            ellipsis.classList.add('pagination-list');
            PaginationLists.appendChild(ellipsis);
            
            for (let i = totalPages - 4; i < totalPages; i++) {
                const list = document.createElement('li');
                list.textContent = i;
                list.classList.add('pagination-list');
                PaginationLists.appendChild(list);
            }
        } else {
            const ellipsis = document.createElement('li');
            ellipsis.textContent = '...'
            ellipsis.classList.add('pagination-list');
            PaginationLists.appendChild(ellipsis);

            for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                const list = document.createElement('li');
                list.textContent = i;
                list.classList.add('pagination-list');
                PaginationLists.appendChild(list);
            }
            PaginationLists.appendChild(ellipsis);
        }
    }


    const lastPage = document.createElement('li');
    lastPage.textContent = totalPages;
    PaginationLists.appendChild(lastPage);
    
}

PaginationLists.addEventListener('click', (e) => {  
    const {textContent} = e.target;  
    if(e.target.localName !== 'li'){
        return;
    }
    

    currentPage = Number(textContent);
    console.log(currentPage);
    e.target.classList.add('active');
    document.querySelector('.active').classList.remove('active');
    

    const parans = {
        sortColumn: 'id',
        sortOrder: 'asc',
        pageSize: 50,
        currentPage: currentPage,
    }

    const data = fetchData();
    populatePagination(data);
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