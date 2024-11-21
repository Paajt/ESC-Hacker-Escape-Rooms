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
        const container = document.querySelector(".card-container");

        challenges.forEach(challenge => {
            const clone = template.content.cloneNode(true);
            clone.querySelector(".img").src = challenge.image;
            clone.querySelector(".title").textContent = challenge.title;
            createStars(challenge.rating, clone.querySelector(".stars-container"));
            clone.querySelector(".onsite-online").textContent = challenge.type;
            clone.querySelector(".ppl").textContent = `${challenge.minParticipants}-${challenge.maxParticipants} participants`;
            clone.querySelector(".describe").textContent = challenge.description;
            const cardButton = clone.querySelector("button");

            cardButton.addEventListener("click", () => {
                challengePeople = [];
                
                for (let i = challenge.minParticipants; i <= challenge.maxParticipants; i++) {
                    challengePeople.push(i);
                }
                openBookingWindow(challenge.title, challenge.id, [], challengePeople);
            });
            container.appendChild(clone);
        })};
    

    cardAPI();