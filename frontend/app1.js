
let container = document.querySelector(".container");
container.addEventListener('click',rotateCard);
function rotateCard(e){
    if(e.target.className === 'card front'){
        e.target.className = 'card front rotate-front';
        e.target.nextElementSibling.className = 'card back rotate-back';
    } else if(e.target.className === 'card back rotate-back'){
        e.target.className = 'card back';
        e.target.previousElementSibling.className = 'card front';
    }
}

function setColors(a1,a2){
    const map = new Map();
    map.set('Top','rgba(247, 0, 22, 0.9)');
    map.set('Jungle','rgba(72, 202, 82, 0.9)');
    map.set('Mid','rgba(50, 103, 248, 0.9)');
    map.set('Bot','rgba(252, 227, 7, 0.9)');
    map.set('Support','rgba(255, 180, 236, 0.9)');
    return [map.get(a1),map.get(a2)];
}

const temp = document.querySelector('#template');
function createCard(u){
    const clone = document.importNode(temp.content, true);
    const front = clone.querySelector('.front');
    const back = clone.querySelector('.back');

    const name = clone.querySelector('.name');
    const mainPos = clone.querySelector('.mainPos');
    const secPos = clone.querySelector('.secPos');

    const champ1 = clone.querySelector('.champ1');
    const champ2 = clone.querySelector('.champ2');
    const champ3 = clone.querySelector('.champ3');

    name.textContent = u.name;
    mainPos.textContent = u.mainPos;
    secPos.textContent = u.secPos;

    const imgMainPos = clone.querySelector('.img_mainPos');
    const tier = u.tier.substr(0,1)+u.tier.substr(1).toLowerCase();
    console.log(`Position_${tier}-${u.mainPos}`);
    imgMainPos.src = `./img/icons/Position_${tier}-${u.mainPos}.png`;

    const imgSecPos = clone.querySelector('.img_secPos');
    imgSecPos.src = `./img/icons/Position_${tier}-${u.secPos}.png`;

    champ1.textContent = u.champ1;
    champ2.textContent = u.champ2;
    champ3.textContent = u.champ3;

    const img1 = clone.querySelector('.img1');
    const img2 = clone.querySelector('.img2');
    const img3 = clone.querySelector('.img3');

    img1.src = `./img/lol/${u.champ1}.png`;
    img2.src = `./img/lol/${u.champ2}.png`;
    img3.src = `./img/lol/${u.champ3}.png`;

    // img1.src = `http://ddragon.leagueoflegends.com/cdn/6.24.1/img/champion/${u.champ1}.png`;
    // img2.src = `http://ddragon.leagueoflegends.com/cdn/6.24.1/img/champion/${u.champ2}.png`;
    // img3.src = `http://ddragon.leagueoflegends.com/cdn/6.24.1/img/champion/${u.champ3}.png`;

    let c1, c2;
    [c1,c2]=setColors(u.mainPos,u.secPos);

    front.style.backgroundImage = `linear-gradient(to right bottom, ${c1}, ${c2})`;
    back.style.backgroundImage = `linear-gradient(to left bottom, ${c1}, ${c2})`;
    container.appendChild(clone);
}

const arrUsers = [
    { 
        name: "Arcayus",
        id: "1",
        mainPos:"Top",
        secPos:"Mid",
    },
    { 
        name: "Heldu",
        id: "2",
        mainPos:"Mid",
        secPos:"Bot",
    },
    { 
        name: "Astolin",
        id: "3",
        mainPos:"Support",
        secPos:"Top",
    },
    { 
        name: "Asraz",
        id: "4",
        mainPos:"Jungle",
        secPos:"Bot",
    },
    { 
        name: "Viaan95",
        id: "5",
        mainPos:"Bot",
        secPos:"Support",
    }
];

for(u of arrUsers){
    fetchData(u);
}

//---------------

function fetchData(user){
//const base_url = 'https://protected-scrubland-51244.herokuapp.com';
const base_url = 'http://localhost:3000';

    fetch(base_url+'/getData',{ 
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({name: user.name})})
    .then(res => res.json())
    .then(json => {
        console.log(json);
        obj = {...user};
        obj.tier = json.tier;
        obj.rank = json.rank
        obj.champ1 = json.champs[0];
        obj.champ2 = json.champs[1];
        obj.champ3 = json.champs[2];
        createCard(obj);
    })
}

