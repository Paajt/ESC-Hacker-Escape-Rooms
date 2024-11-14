const openBtn = document.querySelector('#openBtn');
const closeBtn = document.querySelector('#closeBtn');
const blurBG = document.querySelector('.blurBG');
const body = document.body;

function openMobileMenu() {
    openBtn.setAttribute('aria-expanded', 'true');
    blurBG.classList.add('active');
    body.classList.add('noScroll');
}

function closeMobileMenu() {
    openBtn.setAttribute('aria-expanded', 'false');
    blurBG.classList.remove('active');
    body.classList.remove('noScroll');
}

openBtn.addEventListener('click', openMobileMenu);
closeBtn.addEventListener('click', closeMobileMenu);

/* API STUFF */

// Load api //
async function loadAPI() {
    const res = await fetch('https://lernia-sjj-assignments.vercel.app/api/challenges');
    const data = await res.json();

    originalDataArray = Array.isArray(data.challenges) ? data.challenges : [];
    dataArray = [...originalDataArray]
    console.log('Hämtad data:', dataArray);

}

//Variables
const apiBtn = document.querySelector('#apiFetch');
const onlineSortBtn = document.querySelector('#onlineSortBtn');
const ratingPlus3Btn = document.querySelector('#ratingPlus3');

let dataArray = [];
let originalDataArray = [];

//Event listeners with IF-statements
apiBtn.addEventListener('click', loadAPI);

onlineSortBtn.addEventListener('change', () => {
    if (onlineSortBtn.checked) {
        dataArray = filterOnline(originalDataArray);
    } else {
        dataArray = [...originalDataArray];
    }
    console.log('Filtered online:', dataArray);
});

ratingPlus3Btn.addEventListener('click', () => {
    if (dataArray.length === 0) {
        console.log('Empty array');
    } else {
    const filtered3Stars = filter3Stars(dataArray);
    console.log('Filtered +3 stars:', filtered3Stars);
    }
});



    //Functions
    function filterOnline(dataArray) {
        return dataArray.filter(item => item.type === 'online');
    }

    function filter3Stars(dataArray) {
        return dataArray.filter(item => item.rating >= 3);
    }