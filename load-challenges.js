async function cardAPI() {
    try {
        const response = await fetch("https://lernia-sjj-assignments.vercel.app/api/challenges");
        const data = await response.json();

        originalData = data;
        filteredDataArray = [...data.challenges];
        setTimeout(() => {
            createCards(filteredDataArray);
            }, 500);
    } catch (error) {
        console.error("error", error);
    }
};

function createCards(challenges) {
    const template = document.querySelector(".card-template");
    const container = document.querySelector(".card-container");

    challenges.forEach(challenge => {
        const clone = template.content.cloneNode(true);
        clone.querySelector(".hackerImg").src = challenge.image;
        clone.querySelector(".titleRoom").textContent = challenge.title;
        createStars(challenge.rating, clone.querySelector(".imgContainer"));
        clone.querySelector(".participantsRoom").textContent = `${challenge.minParticipants}-${challenge.maxParticipants} participants`;
        clone.querySelector(".descriptionRoom").textContent = challenge.description;
        const cardButton = clone.querySelector("a");
        if (challenge.type.includes("onsite")) {
            clone.querySelector(".typeRoom").textContent = `(${challenge.type})`;
            clone.querySelector(".iconRoom").src = "./img/home.png";
            clone.querySelector(".bookBtn").textContent = "Book this room";
        } else {
            clone.querySelector(".iconRoom").src = "./img/laptop.png";
            clone.querySelector(".bookBtn").textContent = "Take challenge online";
            clone.querySelector(".typeRoom").textContent = "";
        }

        cardButton.addEventListener("click", () => {
            challengePeople = [];

            for (let i = challenge.minParticipants; i <= challenge.maxParticipants; i++) {
                challengePeople.push(i);
            }
            openBookingWindow(challenge.title, challenge.id, [], challengePeople);
        });
        container.appendChild(clone);
    })
};


cardAPI();