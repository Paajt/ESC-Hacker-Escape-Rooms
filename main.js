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


async function highestRanking() {
    try{
        const response = await fetch("https://lernia-sjj-assignments.vercel.app/api/challenges");
        const data = await response.json();
        data.challenges.sort(function(a, b){return b.rating - a.rating});
        const topThree =data.challenges.slice(0, 3);
        console.log(topThree);
        const cards = document.querySelectorAll(".roomIndividual");
      topThree.forEach((challenge, index) => {
        if (cards[index]) {
          const card = cards[index];
          card.querySelector(".hackerImg").src = challenge.image;
          card.querySelector(".titleRoom").textContent = challenge.title;
          card.querySelector(".typeRoom").textContent = challenge.type;
          card.querySelector(".descriptionRoom").textContent = challenge.description;  
          card.querySelector(".participantsRoom").textContent = `${challenge.minParticipants}-${challenge.maxParticipants} participants`;
        }
      });
       
    }catch (error){
        console.error("error", error);
        }
        
    };
    
          
    highestRanking()

    