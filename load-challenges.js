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
            clone.querySelector(".onsite-online").textContent = challenge.type;
            clone.querySelector(".rating")
            clone.querySelector(".ppl").textContent = `${challenge.minParticipants}-${challenge.maxParticipants} participants`;
            clone.querySelector(".describe").textContent = challenge.description;
            container.appendChild(clone);
        })};
    

    cardAPI();