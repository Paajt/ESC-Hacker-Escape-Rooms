// Dynamic star-rating builder
function createStars(rating, container) {

    let filledStars = 0, halfStar = 0;

    if (rating % 2 == 0.5 || rating % 2 == 1.5) {

        filledStars = Math.floor(rating);
        halfStar = 1;
    }

    else {

        filledStars = rating;
    }


    for (i = 0; i < 5; i++) {

        if (filledStars >= i + 1) {
            const star = document.createElement('img');
            star.setAttribute('src', 'img/StarFull.png');
            star.setAttribute('alt', 'Full star');
            container.appendChild(star);
        }
        else if (halfStar == 1) {
            const star = document.createElement('div');
            star.setAttribute('id', 'halfStar');
            const starEmpty = document.createElement('img');
            starEmpty.setAttribute('src', 'img/StarEmpty.png');
            starEmpty.setAttribute('class', 'star');
            starEmpty.setAttribute('id', 'empty');
            starEmpty.setAttribute('alt', 'Empty star');
            star.appendChild(starEmpty);
            const starFilled = document.createElement('img');
            starFilled.setAttribute('class', 'star halfFilled');
            starFilled.setAttribute('src', 'img/StarFull.png');
            starFilled.setAttribute('alt', 'Half-filled star');
            star.appendChild(starFilled);
            container.appendChild(star);
            halfStar = 0;
        }
        else {
            const star = document.createElement('img');
            star.setAttribute('src', 'img/StarEmpty.png');
            container.appendChild(star);
        }
    }

}