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
const onsiteSortBtn = document.querySelector('#onsiteSortBtn');
const ratingPlus3Btn = document.querySelector('#ratingPlus3');
const dataContainer = document.querySelector('#dataContainer');

let originalData = {};
let filteredDataArray = [];

/* Event listeners */
// API button
apiBtn.addEventListener('click', loadAPI);

// Sort online
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

// Sort onsite
onsiteSortBtn.addEventListener('change', () => {
    if (onsiteSortBtn.checked) {
        filteredDataArray = filterOnsite(originalData.challenges);
        console.log('Filtered on-site:', filteredDataArray);
    } else {
        filteredDataArray = [...originalData.challenges];
        console.log('Removed on-site filter:', filteredDataArray);
    }
    displayData(filteredDataArray);
});

// Sort +3 rating
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
    return dataArray.filter(room => room.type === 'online');
}

function filterOnsite (dataArray) {
    return dataArray.filter(room => room.type === 'onsite');
}

function filter3Stars(dataArray) {
    return dataArray.filter(room => room.rating >= 3);
}

// Filter online & onsite
function onlineOnsiteFilter() {
    let filtered = [...originalData.challenges];

    if (onlineSortBtn.checked && !onsiteSortBtn.checked) {
        filtered = filterOnline(filtered);
    } else if (!onlineSortBtn.checked && onsiteSortBtn.checked) {
        filtered = filterOnsite(filtered);
    } else if (!onlineSortBtn.checked && !onsiteSortBtn.checked) {
        filtered = filtered = filterOnline(filtered), filterOnsite(filtered);

    } else if (onlineSortBtn.checked && onsiteSortBtn.checked) {
        filtered = originalData.challenges;
    }

    filteredDataArray = filtered;
    console.log('Filtered data:', filteredDataArray);
    displayData(filteredDataArray);
}

// Show data on page
function displayData(dataArray) {
    dataContainer.innerHTML = '';

    if (dataArray.length === 0) {
        dataContainer.innerHTML = '<p>No data.</p>';
        return;
    }

    dataArray.forEach(room => {
        const div = document.createElement('div');
        div.classList.add('data-item');

        const title = document.createElement('h3');
        title.textContent = room.title;
        div.appendChild(title);

        const type = document.createElement('p');
        type.textContent = `Typ: ${room.type}`;
        div.appendChild(type);

        const rating = document.createElement('p');
        rating.textContent = `Rating: ${room.rating}`;
        div.appendChild(rating);

        dataContainer.appendChild(div);
    });
}