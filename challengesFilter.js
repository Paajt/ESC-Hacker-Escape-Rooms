const onlineSortBtn = document.querySelector('#onlineSortBtn');
const onsiteSortBtn = document.querySelector('#onsiteSortBtn');

// Sort online
onlineSortBtn.addEventListener('change', applyFilter);
// Sort onsite
onsiteSortBtn.addEventListener('change', applyFilter);

// Filter online
function filterOnline(dataArray) {
    return dataArray.filter(room => room.type === 'online');
}

// Filter onsite
function filterOnsite(dataArray) {
    return dataArray.filter(room => room.type === 'onsite');
}

// Star rating (from 1-5 to 1-5) Filter
function setupStarRating(starSelector, isMinRating) {
    document.querySelectorAll(starSelector).forEach(star => {
        star.addEventListener('click', () => starClick(star, isMinRating));
        star.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                starClick(star, isMinRating);
            }
        });
    });
}

setupStarRating('.fromRating .star', true);
setupStarRating('.toRating .star', false);

let minRating = 0;
let maxRating = 5;

function starClick(star, isMinRating) {
    const ratingValue = parseInt(star.dataset.value);
    const isActive = star.getAttribute('aria-pressed') === 'true';

    if (isActive) {
        star.setAttribute('aria-pressed', 'false');
        if (isMinRating) {
            minRating = 0;
            resetStars('.fromRating .star');
        } else {
            maxRating = 5;
            resetStars('.toRating .star');
        }
    } else {

        if (isMinRating) {
            minRating = ratingValue;
            resetStars('.fromRating .star');
            if (minRating > maxRating) {
                maxRating = minRating;
                resetStars('.toRating .star');
            }
        } else {
            maxRating = ratingValue;
            resetStars('.toRating .star');
            if (maxRating < minRating) {
                minRating = maxRating;
                resetStars('.fromRating .star');
            }
        }
        highlightStars(ratingValue, isMinRating ? '.fromRating .star' : '.toRating .star');
    }

    applyFilter();
    checkStarStyles();
}

function highlightStars(ratingValue, selector) {
    document.querySelectorAll(selector).forEach(star => {
        if (parseInt(star.dataset.value) <= ratingValue) {
            star.setAttribute('aria-pressed', 'true');
            star.classList.add('selected');
        }
    });
}

function resetStars(selector) {
    document.querySelectorAll(selector).forEach(star => {
        star.setAttribute('aria-pressed', 'false');
        star.classList.remove('selected');
    })
}

function checkStarStyles() {
    if (document.querySelectorAll('.fromRating .star.selected').length === 0) {
        minRating = 0;
    }

    if (document.querySelectorAll('.toRating .star.selected').length === 0) {
        maxRating = 5;
    }
}

// Filter in search input
const userInput = document.querySelector("#userInput");
userInput.addEventListener('input', () => {
    applyFilter();
});

// Label/tag filtering
let selectedLabels = [];

const labelButtons = document.querySelectorAll('.tag');

labelButtons.forEach(button => {
    button.addEventListener('click', () => {
        const label = button.dataset.tag;

        if (selectedLabels.includes(label)) {
            selectedLabels = selectedLabels.filter(item => item !== label);
            button.classList.remove('active');
        } else {
            selectedLabels.push(label);
            button.classList.add('active');
        }
        applyFilter();
    });
});

function filterByLabels(dataArray) {
    if (selectedLabels.length === 0) {
        return dataArray;
    }

    const filtered = dataArray.filter(challenge =>
        selectedLabels.every(label => challenge.labels.includes(label))
    );

    return filtered;
}

// Apply filters to challenges
function applyFilter() {
    let filtered = [...originalData.challenges];

    // Filter online/onsite
    const isOnlineChecked = onlineSortBtn.checked;
    const isOnsiteChecked = onsiteSortBtn.checked;

    if (isOnlineChecked && !isOnsiteChecked) {
        filtered = filterOnline(filtered);
    } else if (!isOnlineChecked && isOnsiteChecked) {
        filtered = filterOnsite(filtered);
    } else if (!isOnlineChecked && !isOnsiteChecked) {
        filtered = [...originalData.challenges];
    }

    // Star Ratings 1-5 
    if (minRating > 0 || maxRating < 5) {
        filtered = filtered.filter(challenge =>
            challenge.rating >= minRating && challenge.rating <= maxRating
        );
    }

    // Filter on label
    if (selectedLabels.length > 0) {
        filtered = filterByLabels(filtered);
    }

    // Filter with search input
    const searchValue = document.querySelector('#userInput').value.trim().toLowerCase();

    if (searchValue) {
        filtered = filtered.filter(challenge =>
            challenge.title.toLowerCase().includes(searchValue) ||
            challenge.description.toLowerCase().includes(searchValue)
        );
    }

    filteredDataArray = filtered;

    // Clear card container
    const container = document.querySelector('.card-container');
    container.innerHTML = '';

    if (filteredDataArray.length === 0) {
        container.style.gridTemplateColumns = 'auto';
        container.innerHTML = '<h2>No matching challenges.</h2>';
        return;
    } else {
        container.style.gridTemplateColumns = '';
    }

    // Render filtered cards
    createCards(filteredDataArray);
}