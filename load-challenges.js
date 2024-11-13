const data = fetchChallenges();

async function fetchChallenges() {

    const response = await fetch('https://lernia-sjj-assignments.vercel.app/api/challenges');
    const challengesData = await response.json();
    return challengesData;

}



