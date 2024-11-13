const data = fetchChallenges();



async function fetchChallenges() {

    const response = await fetch('https://lernia-sjj-assignments.vercel.app/api/challenges');
    const challengesData = await response.json();
    return challengesData;
    
}

async function fetchTimes() {

    const response = await fetch('https://lernia-sjj-assignments.vercel.app/api/booking/available-times?date=2022-12-12&challenge=3');
    const timesData = await response.json();
    console.log(timesData.slots);

}
fetchChallenges();

//for-loop to build cards?
// const jokeButton = document.querySelector(".jokeBtn"); 

// jokeButton.addEventListener("click", async () => { 
//     try { const response = await fetch("https://official-joke-api.appspot.com/jokes/random"); 
//         const joke = await response.json(); 
//         document.querySelector(".h2setup").textContent = `${joke.setup}`; 
//         document.querySelector(".h2punchline").textContent = `${joke.punchline}`; 
//     } catch (error) { console.error("Error fetching joke", error); 
//         document.querySelector(".h2setup").textContent = "Sorry, we couldn't give you a joke just now, try again later"; } });