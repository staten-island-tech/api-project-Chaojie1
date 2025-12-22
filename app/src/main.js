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

// the actual game
const timeout3 = setInterval(function(){
  if (p2selection){
    clearInterval(timeout3)
    body.innerHTML = ""
    body.insertAdjacentHTML("beforeend",`<h1 class="absolute top-0 left-0">P1 : ${p1selection.Name}</h1>`)
    body.insertAdjacentHTML("beforeend",`<h1 class="absolute top-5 left-0">HP: ${p1selection.Stats.Health} SPD: ${p1selection.Stats.Speed} ATK: ${p1selection.Stats.Power} DEF: ${p1selection.Stats.Defense}</h1>`)
    body.insertAdjacentHTML("beforeend",`<h1 class="absolute top-0 right-0">P2 : ${p2selection.Name}</h1>`)
    body.insertAdjacentHTML("beforeend",`<h1 class="absolute top-5 right-0">HP: ${p2selection.Stats.Health} SPD: ${p2selection.Stats.Speed} ATK: ${p2selection.Stats.Power} DEF: ${p2selection.Stats.Defense}</h1>`)
  }
},100)