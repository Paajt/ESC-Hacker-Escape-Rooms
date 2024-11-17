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
        
       
    }catch (error){
        console.error("error", error);
        }
        
    };
    
          
    highestRanking()

    