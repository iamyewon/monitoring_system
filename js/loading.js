const loadingBackground = document.querySelector('.loading-background');

/**
 * 로딩 화면 보이도록 하는 클래스를 추가하는 함수 
 * @author 웹팀 김예원 
 */
const displayLoading = () => {
    loadingBackground.classList.remove('hidden');
    loadingBackground.classList.add('show');
}

/**
 * 로딩 화면 보이도록 하는 클래스를 제거하는 함수 
 * @author 웹팀 김예원 
 */
const hideLoading = () => {
    loadingBackground.classList.remove('show');
    loadingBackground.classList.add('hidden');
}