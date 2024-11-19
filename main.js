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
const dataContainer = document.querySelector('#dataContainer');

let originalData = {};
let filteredDataArray = [];

/* Event listeners */
// API button
apiBtn.addEventListener('click', loadAPI);

// Sort online
onlineSortBtn.addEventListener('change', applyFilter);
// Sort onsite
onsiteSortBtn.addEventListener('change', applyFilter);

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

// Apply filters to challenges
function applyFilter() {
    let filtered = [...originalData.challenges];

    // Filter online/on-site
    const isOnlineChecked = onlineSortBtn.checked;
    const isOnsiteChecked = onsiteSortBtn.checked;

    if (isOnlineChecked && !isOnsiteChecked) {
        filtered = filterOnline(filtered);
        console.log('After online filter:', filtered);
    } else if (!isOnlineChecked && isOnsiteChecked) {
        filtered = filterOnsite(filtered);
        console.log('After onsite filter:', filtered);
    } else if (!isOnlineChecked && !isOnsiteChecked) {
        filtered = [...originalData.challenges];
        console.log('No filters for Online/Onsite');
    }

    // Filter radio buttons min & max rating
    const minRatingInput = document.querySelector('input[name="minimumRating"]:checked');
    const maxRatingInput = document.querySelector('input[name="maximumRating"]:checked');

    if (minRatingInput && maxRatingInput) {
        const minRating = parseInt(minRatingInput.value);
        const maxRating = parseInt(maxRatingInput.value);
        filtered = filtered.filter(item => item.rating >= minRating && item.rating <= maxRating);
        console.log('After rating filter:', filtered);
    } else {
        console.log('No rating filter applied');
    }

    // Filter on label
    if (selectedLabel) {
        filtered = filtered.filter(item => item.labels.includes(selectedLabel));
        console.log(`After label filter (${selectedLabel}):`, filtered);
    }

    filteredDataArray = filtered;
    console.log('Challenges after filtering:', filteredDataArray);
    displayData(filteredDataArray);
}

// Show content on page
function displayData(dataArray) {
    dataContainer.innerHTML = '';

    if (dataArray.length === 0) {
        dataContainer.innerHTML = '<p>No matching challenges.</p>';
        return;
    }

    dataArray.forEach(room => {
        const div = document.createElement('div');
        div.classList.add('data-item');

        const title = document.createElement('h3');
        title.textContent = `Title: ${room.title}`;
        div.appendChild(title);

        const description = document.createElement('p');
        description.textContent = `Description: ${room.description}`;
        div.appendChild(description);

        const type = document.createElement('p');
        type.textContent = `Type: ${room.type}`;
        div.appendChild(type);

        const rating = document.createElement('p');
        rating.textContent = `Rating: ${room.rating}`;
        div.appendChild(rating);

        const labels = document.createElement('p');
        labels.textContent = `Labels: ${room.labels.join(', ')}`;
        div.appendChild(labels);

        dataContainer.appendChild(div);
    });
}

// Radio buttons filtering

const ratingRadioBtns = document.querySelectorAll('input[name="minimumRating"], input[name="maximumRating"]');

ratingRadioBtns.forEach(radio => {
    radio.addEventListener('change', applyFilter);
});


// Label buttons filtering

const labelButtons = document.querySelectorAll('.label-btn');
let selectedLabel = null;

labelButtons.forEach(button => {
    button.addEventListener('click', () => {
        selectedLabel = button.dataset.label;
        console.log(`Selected label: ${selectedLabel}`);
        applyFilter();
    });
});

function filterByLabel(selectedLabel) {
    const filteredByLabel = originalData.challenges.filter(challenge =>
        challenge.labels.includes(selectedLabel)
    );

    console.log(`Filtered by label (${selectedLabel}):`, filterByLabel);
    displayData(filteredByLabel);
}