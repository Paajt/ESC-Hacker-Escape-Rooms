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

// Variables
const apiBtn = document.querySelector('#apiFetch');
const onlineSortBtn = document.querySelector('#onlineSortBtn');
const ratingPlus3Btn = document.querySelector('#ratingPlus3');
const dataContainer = document.querySelector('#dataContainer');

let originalData = {};
let filteredDataArray = [];

// Event listeners

apiBtn.addEventListener('click', loadAPI);

onlineSortBtn.addEventListener('change', () => {
    if (onlineSortBtn.checked) {
        filteredDataArray = filterOnline(originalData.challenges);
        console.log('Filtered online:', filteredDataArray);
    } else {
        filteredDataArray = [...originalData.challenges];
        console.log('Removed online filter:', filteredDataArray);
    }
    displayData(filteredDataArray);
});

ratingPlus3Btn.addEventListener('click', () => {
    if (filteredDataArray.length === 0) {
        console.log('Nothing to filter');
    } else {
        const filtered3Stars = filter3Stars(filteredDataArray);
        console.log('Filtered +3 stars:', filtered3Stars);
        displayData(filtered3Stars);
    }
});

// Load API
async function loadAPI() {
    const res = await fetch('https://lernia-sjj-assignments.vercel.app/api/challenges');
    const data = await res.json();

    originalData = data;
    filteredDataArray = [...data.challenges];
    console.log('Received data:', originalData);

    displayData(filteredDataArray);
}

// Filter functions
function filterOnline (dataArray) {
    return dataArray.filter(item => item.type === 'online');
}

function filter3Stars(dataArray) {
    return dataArray.filter(item => item.rating >= 3);
}

// Show data on page
function displayData(dataArray) {
    dataContainer.innerHTML = '';

    if (dataArray.length === 0) {
        dataContainer.innerHTML = '<p>No data.</p>';
        return;
    }

    dataArray.forEach(item => {
        const div = document.createElement('div');
        div.classList.add('data-item');

        const title = document.createElement('h3');
        title.textContent = item.title;
        div.appendChild(title);

        const type = document.createElement('p');
        type.textContent = `Typ: ${item.type}`;
        div.appendChild(type);

        const rating = document.createElement('p');
        rating.textContent = `Rating: ${item.rating}`;
        div.appendChild(rating);

        dataContainer.appendChild(div);
    });
}