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
function isOverlapping(e1, e2) {
  const r1 = e1.getBoundingClientRect();
  const r2 = e2.getBoundingClientRect();
  return !(
    r1.right < r2.left ||
    r1.left > r2.right ||
    r1.bottom < r2.top ||
    r1.top > r2.bottom
  );
}

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
    Speed: Math.ceil((spaces*10/((totalletters**2)/100))*10)/10, 
    Power: Math.floor(uniqueletters.length*(1+totalletters/200))/5, 
    Lifesteal: Math.floor((Math.floor((totalletters-spaces)*10/(spaces+1))/10)/(1+totalletters/100)*10)/10 
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
          `<div class="collapse collapse-arrow bg-base-100 border border-base-300" id=${i}>
            <input type="radio" name="my-accordion-2" checked="checked" />
            <div class="collapse-title font-semibold" id="joke">Joke: ${selection[i].setup}</div>
            <div class="collapse-content text-sm">Health : ${stats.Health} | Speed : ${stats.Speed} | Power : ${stats.Power} | Lifesteal : ${stats.Lifesteal*10}%</div>
          </div>`
        );
        document.getElementById(i).insertAdjacentHTML("beforeend",`<button class="btn btn-neutral">Select</button>`)
    }
    document.querySelectorAll("button").forEach((selectbutton)=>selectbutton.addEventListener("click",function(){
      const name = selectbutton.closest("div").querySelector("#joke").textContent.slice(6,selectbutton.closest("div").querySelector("#joke").textContent.length)
      const powermove = selection.find((x)=>x.setup === name).delivery
      console.log(powermove)
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
          `<div class="collapse collapse-arrow bg-base-100 border border-base-300" id=${i}>
            <input type="radio" name="my-accordion-2" checked="checked" />
            <div class="collapse-title font-semibold" id="joke">Joke: ${selection[i].setup}</div>
            <div class="collapse-content text-sm">Health : ${stats.Health} | Speed : ${stats.Speed} | Power : ${stats.Power} | Lifesteal : ${stats.Lifesteal*10}%</div>
          </div>`
        );
        document.getElementById(i).insertAdjacentHTML("beforeend",`<button class="btn btn-neutral">Select</button>`)
    }
    document.querySelectorAll("button").forEach((selectbutton)=>selectbutton.addEventListener("click",function(){
      const name = selectbutton.closest("div").querySelector("#joke").textContent.slice(6,selectbutton.closest("div").querySelector("#joke").textContent.length)
      const powermove = selection.find((x)=>x.setup === name).delivery
      const stats = calcStats(name)
      body.innerHTML = ""
      body.insertAdjacentHTML("afterbegin","<h1>P1, WASD - Move, E - Attack</h1>")
      body.insertAdjacentHTML("beforeend","<h1>P2, Arrow Keys - Move, / - Attack</h1>")
      body.insertAdjacentHTML("beforeend",'<button class="btn btn-neutral">FIGHT!!!!!</button>')
      body.querySelector("button").addEventListener("click",function(){
        p2selection = {Name: name, Powermove: powermove, Stats: stats}
      })

    }));
  }
}, 100);
function clamp(min,max,num){
  return Math.max(min, Math.min(num, max));
}
let has = 0
function ha(){
  setTimeout(function(){
    body.insertAdjacentHTML("beforeend",`<h1>HA</h1>`)
    has += 1
    if (has > 40){
      location.reload()
      return
    }
    ha()
  },10)
}
// the actual game
let gameend = false
let p1atkcd = false
let p2atkcd = false
const timeout3 = setInterval(function(){
  if (p2selection){
    clearInterval(timeout3)
    body.classList.add("overflow-hidden")
    body.innerHTML = ""
    let p1Health = p1selection.Stats.Health
    let p2Health = p2selection.Stats.Health
    body.insertAdjacentHTML("beforeend",`<h1 id="p1" class="absolute top-0 left-0 w-60">P1 : ${p1selection.Name} HP: ${p1Health}</h1>`)
    body.insertAdjacentHTML("beforeend",`<h1 id="p2" class="absolute top-0 left-0 w-60">P2 : ${p2selection.Name} HP: ${p2Health}</h1>`)
    const p1 = document.getElementById("p1");
    const p2 = document.getElementById("p2");
    let p1pos = { x: 0, y: 0 };
    let p2pos = { x: 100000, y: 0 };
    const p1rect = p1.getBoundingClientRect();
    const p2rect = p2.getBoundingClientRect();
    const p1max = {x:window.innerWidth  - p1rect.width,y:window.innerHeight - p1rect.height};
    const p2max = {x:window.innerWidth  - p2rect.width,y:window.innerHeight - p2rect.height};
    p2pos.x = clamp(0, p2max.x, p2pos.x);
    p2.style.transform = `translate(${p2pos.x}px, ${p2pos.y}px)`;

    function clamp(min, max, value) {
    return Math.min(Math.max(value, min), max);
    }
    const movementmulti = 5
    document.addEventListener("keydown", (e) => {
      if (gameend === true)return;
    if (e.code === "KeyD") p1pos.x += p1selection.Stats.Speed*movementmulti;
    if (e.code === "KeyA") p1pos.x -= p1selection.Stats.Speed*movementmulti;
    if (e.code === "KeyS") p1pos.y += p1selection.Stats.Speed*movementmulti;
    if (e.code === "KeyW") p1pos.y -= p1selection.Stats.Speed*movementmulti;
    if (e.code === "ArrowRight") p2pos.x += p2selection.Stats.Speed*movementmulti;
    if (e.code === "ArrowLeft") p2pos.x -= p2selection.Stats.Speed*movementmulti;
    if (e.code === "ArrowDown") p2pos.y += p2selection.Stats.Speed*movementmulti;
    if (e.code === "ArrowUp") p2pos.y -= p2selection.Stats.Speed*movementmulti;
    p1pos.x = clamp(0, p1max.x, p1pos.x);
    p1pos.y = clamp(0, p1max.y, p1pos.y);
    p2pos.x = clamp(0, p2max.x, p2pos.x);
    p2pos.y = clamp(0, p2max.y, p2pos.y);
    p1.style.transform = `translate(${p1pos.x}px, ${p1pos.y}px)`;
    p2.style.transform = `translate(${p2pos.x}px, ${p2pos.y}px)`;
        const overlapping = isOverlapping(p1, p2);

      if (overlapping && e.code === "KeyE" && p1atkcd === false) {
        p1atkcd = true
        setTimeout(function(){p1atkcd = false},2500/p1selection.Stats.Speed)
        p2Health -= p1selection.Stats.Power;
        p1Health += p1selection.Stats.Power*p1selection.Stats.Lifesteal/10
        p1.textContent = `P1 : ${p1selection.Name} HP: ${Math.ceil(p1Health)}`
        p2.textContent = `P2 : ${p2selection.Name} HP: ${Math.ceil(p2Health)}`
      }
      if (overlapping && e.code === "Slash" && p2atkcd === false) {
        p2atkcd = true
        setTimeout(function(){p2atkcd = false},2500/p2selection.Stats.Speed)
        p1Health -= p2selection.Stats.Power;
        p2Health += p2selection.Stats.Power*p2selection.Stats.Lifesteal/10
        p1.textContent = `P1 : ${p1selection.Name} HP: ${Math.ceil(p1Health)}`
        p2.textContent = `P2 : ${p2selection.Name} HP: ${Math.ceil(p2Health)}`
      }
      if (p1Health <= 0){
        gameend=true
        body.innerHTML = ""
        body.insertAdjacentHTML("afterbegin","<h1>p2 wins les go</h1>")
        setTimeout(function(){
          body.insertAdjacentHTML("beforeend",`<h1>${p2selection.Name}</h1>`)
          setTimeout(function(){
            body.insertAdjacentHTML("beforeend",`<h1>${p2selection.Powermove}</h1>`)
            setTimeout(function(){
              ha()
            },1000)
          },2500)
        },1000)
      };
      if (p2Health <= 0){
        gameend=true
        body.innerHTML = ""
        body.insertAdjacentHTML("afterbegin","<h1>p1 wins les go</h1>")
        setTimeout(function(){
          body.insertAdjacentHTML("beforeend",`<h1>${p1selection.Name}</h1>`)
          setTimeout(function(){
            body.insertAdjacentHTML("beforeend",`<h1>${p1selection.Powermove}</h1>`)
            setTimeout(function(){
              ha()
            },1000)
          },2500)
        },1000)
      };
    });

  }
},100)