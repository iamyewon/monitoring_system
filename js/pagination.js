///////////////////////////////// pagination /////////////////////////////////
// let currentPage = 1;
// let totalPage;
// let totalCount;
// let pagePerView = 50;

const itemsPerView = document.querySelector('.items-per-view');
const PaginationLists = document.querySelector('.pagination-lists');
let currentPage = 1;

const populatePagination = (data) => {
    const {totalCount} = data;
    const perView = Number(itemsPerView.value); 
    const totalPage = Math.ceil(totalCount / perView); 

    const firstPage = document.createElement('li');
    firstPage.textContent = 1;
    PaginationLists.appendChild(firstPage);
    firstPage.classList.add('active');

    for(i=2; i<totalPage; i++){
        const list = document.createElement('li');
        list.textContent = i;
        list.classList.add('pagination-list');
        PaginationLists.appendChild(list);
    }

    const lastPage = document.createElement('li');
    lastPage.textContent = totalPage;
    PaginationLists.appendChild(lastPage);
    
}

PaginationLists.addEventListener('click', (e) => {    
    if(e.target.localName !== 'li'){
        return;
    }
    
    document.querySelector('.active').classList.remove('active');
    e.target.classList.add('active');
})
