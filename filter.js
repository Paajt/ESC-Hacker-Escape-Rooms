document.querySelectorAll('.ratingFilter .star').forEach(star => {
    star.addEventListener('click', function () {
        const value = this.getAttribute('data-value');

        const stars = this.parentElement.querySelectorAll('.star');

        const isAlreadySelected = this.classList.contains('selected') && 
            !Array.from(stars).some(s => s.classList.contains('selected') && s.getAttribute('data-value') > value);

        if (isAlreadySelected) {
            stars.forEach(s => s.classList.remove('selected'));
        } else {
            stars.forEach(s => s.classList.remove('selected'));
            stars.forEach(s => {
                if (s.getAttribute('data-value') <= value) {
                    s.classList.add('selected');
                }
            });
        }
    });
});

document.querySelectorAll('.tagFilter .tag').forEach(tag => {
    tag.addEventListener('click', function () {
        if (this.classList.contains('selected')) {
            this.classList.remove('selected');
        } else {
            this.classList.add('selected');
        }
    });
});
