import "./style.css";
const URL =
  "https://v2.jokeapi.dev/joke/Programming,Miscellaneous,Pun,Spooky,Christmas?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=twopart";

async function getData(URL) {
  try {
    const response = await fetch(URL);
    if (response.status != 200) {
      throw new Error(response);
    } else {
      const data = await response.json();
      console.log("got")
      return data;
    }
  } catch (error) {
    console.log(error);
    console.log("no bueno");
  }
}
const body = document.querySelector("#app")
function calcStats(string){
  const uniqueletters = []
  for (let ii = 0; ii<string.length;ii++){
    if (!uniqueletters.find((letter)=>letter===string[ii])){
      uniqueletters.push(string[ii])
    }
  }
  const totalletters = string.length
  const spaces = string.split('').filter(char => char === " ").length
  const stats = { 
    Health: totalletters, 
    Speed: Math.ceil(spaces*10/((totalletters**2)/100))/1, 
    Power: Math.floor(uniqueletters.length/(1+totalletters/10)*10)/10, 
    Defense: Math.floor((totalletters-spaces)*10/(spaces+1))/10 
  };
  return stats
}
let p1selection
let p2selection
const selection = [];
for (let i = 0; i < 10; i++) {
  getData(URL).then((data) => selection.push(data));
}
document
  .querySelector("#app")
  .insertAdjacentHTML(
    "afterbegin",
    `<h1>hol up, the data is coming, chillax</h1>`
  );

// character selection
const timeout = setInterval(function () {
  if (selection.length === 10) {
    clearInterval(timeout);
    body.innerHTML = "";
    for (let i = 0; i < 5; i++) {
      const stats = calcStats(selection[i].setup)
      document
        .querySelector("#app")
        .insertAdjacentHTML(
          "afterbegin",
          `<div class="w-full h-50" id="${i}">
          <h1 id="joke">Joke: ${selection[i].setup}</h1>
          <h1 id="punch">Punchline: ${selection[i].delivery}</h1>
          <button>Select</button>
          </div>`
        );
        for (const stat in stats){
          document.getElementById(i).insertAdjacentHTML("beforeend",`<h1>${stat} : ${stats[stat]}</h1>`)
        }
        
    }
    document.querySelectorAll("button").forEach((selectbutton)=>selectbutton.addEventListener("click",function(){
      const name = selectbutton.closest("div").querySelector("#joke").textContent.slice(6,selectbutton.closest("div").querySelector("#joke").textContent.length)
      const powermove = selectbutton.closest("div").querySelector("#punch").textContent.slice(11,selectbutton.closest("div").querySelector("#punch").textContent.length)
      const stats = calcStats(name)
      p1selection = {Name: name, Powermove: powermove, Stats: stats}
    }));
  }
}, 100);
const timeout2 = setInterval(function () {
  if (p1selection) {
    clearInterval(timeout2);
    body.innerHTML = "";
    for (let i = 5; i < 10; i++) {
      const stats = calcStats(selection[i].setup)
      document
        .querySelector("#app")
        .insertAdjacentHTML(
          "afterbegin",
          `<div class="w-full h-50" id="${i}">
          <h1 id="joke">Joke: ${selection[i].setup}</h1>
          <h1 id="punch">Punchline: ${selection[i].delivery}</h1>
          <button>Select</button>
          </div>`
        );
        for (const stat in stats){
          document.getElementById(i).insertAdjacentHTML("beforeend",`<h1>${stat} : ${stats[stat]}</h1>`)
        }
        
    }
    document.querySelectorAll("button").forEach((selectbutton)=>selectbutton.addEventListener("click",function(){
      const name = selectbutton.closest("div").querySelector("#joke").textContent.slice(6,selectbutton.closest("div").querySelector("#joke").textContent.length)
      const powermove = selectbutton.closest("div").querySelector("#punch").textContent.slice(11,selectbutton.closest("div").querySelector("#punch").textContent.length)
      const stats = calcStats(name)
      p2selection = {Name: name, Powermove: powermove, Stats: stats}
    }));
  }
}, 100);
function clamp(min,max,num){
  return Math.max(min, Math.min(num, max));
}
// the actual game
const timeout3 = setInterval(function(){
  if (p2selection){
    clearInterval(timeout3)
    body.innerHTML = ""
    body.insertAdjacentHTML("beforeend",`<h1 id="p1" class="absolute top-0 left-0">P1 : ${p1selection.Name}</h1>`)
    body.insertAdjacentHTML("beforeend",`<h1 id="p2" class="absolute top-0 right-0">P2 : ${p2selection.Name}</h1>`)
    let p1pos = { x: 0, y: 0 };
    const p1 = document.getElementById("p1");

    function clamp(min, max, value) {
    return Math.min(Math.max(value, min), max);
    }

    document.addEventListener("keydown", (e) => {
    const rect = p1.getBoundingClientRect();
    const maxX = window.innerWidth  - rect.width;
    const maxY = window.innerHeight - rect.height;
      console.log(e.code)
    if (e.code === "KeyD") p1pos.x += 10;
    if (e.code === "KeyA") p1pos.x -= 10;
    if (e.code === "KeyS") p1pos.y += 10;
    if (e.code === "KeyW") p1pos.y -= 10;

    p1pos.x = clamp(0, maxX, p1pos.x);
    p1pos.y = clamp(0, maxY, p1pos.y);

    p1.style.transform = `translate(${p1pos.x}px, ${p1pos.y}px)`;
    });

  }
},100)