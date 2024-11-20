async function cardAPI() {
    try{
        const response = await fetch("https://lernia-sjj-assignments.vercel.app/api/challenges");
        const data = await response.json();
        console.log(data.challenges);
        createCards(data.challenges);
    }catch (error){
        console.error("error", error);
        }
    };

    function createCards (challenges) {
        const template = document.querySelector(".card-template");
        const container = document.querySelector(".roomContainer");

        challenges.forEach(challenge => {
            const clone = template.content.cloneNode(true);
            clone.querySelector(".hackerImg").src = challenge.image;
            clone.querySelector(".title").textContent = challenge.title + ' (' + challenge.type + ')';
            createStars(challenge.rating, clone.querySelector(".imgContainer"));
            clone.querySelector(".ppl").textContent = `${challenge.minParticipants}-${challenge.maxParticipants} participants`;
            clone.querySelector(".describe").textContent = challenge.description;
            container.appendChild(clone);
        })};
    

    cardAPI();

        // Star-rating builder
    function createStars(rating, container) {

        let filledStars = 0, halfStar = 0;
    
        if (rating % 2 == 0.5 || rating % 2 == 1.5){
    
            filledStars = Math.floor(rating);
            halfStar = 1;
        }
    
        else {
    
            filledStars = rating;
        }
    
    
        for (i = 0; i < 5; i++){
    
            if (filledStars >= i + 1){
                const star = document.createElement('img');
                star.setAttribute('src', 'img/StarFull.png')
                container.appendChild(star);
            }
            else if (halfStar == 1){
                const star = document.createElement('div');
                star.setAttribute('id','halfStar');
                const starEmpty = document.createElement('img');
                starEmpty.setAttribute('src', 'img/StarEmpty.png');
                starEmpty.setAttribute('class', 'star');
                starEmpty.setAttribute('id', 'empty');
                star.appendChild(starEmpty);
                const starFilled = document.createElement('img');
                starFilled.setAttribute('class', 'star halfFilled');
                starFilled.setAttribute('src', 'img/StarFull.png');
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